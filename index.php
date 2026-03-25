<?php
require_once __DIR__ . '/db.php';

$errors = [];
$results = null;
$db_error = null;

$values = [
    'property_price' => '5000000',
    'down_payment' => '1000000',
    'interest_rate' => '7.5',
    'tenure_years' => '20',
    'growth_rate' => '8',
];

function read_number(string $key): ?float {
    $raw = filter_input(INPUT_POST, $key, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    if ($raw === null || $raw === '') {
        return null;
    }
    return (float) $raw;
}

function fmt_inr(float $value): string {
    return 'INR ' . number_format($value, 0, '.', ',');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $property_price = read_number('property_price');
    $down_payment = read_number('down_payment');
    $interest_rate = read_number('interest_rate');
    $tenure_years = read_number('tenure_years');
    $growth_rate = read_number('growth_rate');

    if ($property_price === null || $property_price <= 0) {
        $errors[] = 'Enter a valid property price.';
    }
    if ($down_payment === null || $down_payment < 0) {
        $errors[] = 'Enter a valid down payment.';
    }
    if ($interest_rate === null || $interest_rate <= 0) {
        $errors[] = 'Enter a valid interest rate.';
    }
    if ($tenure_years === null || $tenure_years <= 0) {
        $errors[] = 'Enter a valid loan tenure.';
    }
    if ($growth_rate === null || $growth_rate < 0) {
        $errors[] = 'Enter a valid appreciation rate.';
    }

    if ($property_price !== null && $down_payment !== null && $down_payment > $property_price) {
        $errors[] = 'Down payment cannot be higher than property price.';
    }

    $values = [
        'property_price' => (string) $property_price,
        'down_payment' => (string) $down_payment,
        'interest_rate' => (string) $interest_rate,
        'tenure_years' => (string) $tenure_years,
        'growth_rate' => (string) $growth_rate,
    ];

    if (!$errors) {
        $loan_amount = $property_price - $down_payment;
        $monthly_rate = $interest_rate / 1200;
        $total_months = (int) round($tenure_years * 12);

        if ($monthly_rate == 0.0) {
            $emi = $loan_amount / max(1, $total_months);
        } else {
            $factor = pow(1 + $monthly_rate, $total_months);
            $emi = $loan_amount * ($monthly_rate * $factor) / ($factor - 1);
        }

        $total_payment = $emi * $total_months;
        $future_value = $property_price * pow(1 + ($growth_rate / 100), $tenure_years);
        $total_invested = $down_payment + $total_payment;
        $total_profit = $future_value - $total_invested;
        $roi = $total_invested > 0 ? ($total_profit / $total_invested) * 100 : 0;

        $results = [
            'loan_amount' => $loan_amount,
            'emi' => $emi,
            'future_value' => $future_value,
            'total_profit' => $total_profit,
            'roi' => $roi,
        ];

        try {
            $pdo = get_db();
            $stmt = $pdo->prepare('INSERT INTO real_estate_calculations
                (property_price, down_payment, interest_rate, tenure_years, growth_rate, loan_amount, monthly_emi, total_payment, future_value, total_profit, roi_percent)
                VALUES (:property_price, :down_payment, :interest_rate, :tenure_years, :growth_rate, :loan_amount, :monthly_emi, :total_payment, :future_value, :total_profit, :roi_percent)');

            $stmt->execute([
                ':property_price' => $property_price,
                ':down_payment' => $down_payment,
                ':interest_rate' => $interest_rate,
                ':tenure_years' => $tenure_years,
                ':growth_rate' => $growth_rate,
                ':loan_amount' => $loan_amount,
                ':monthly_emi' => $emi,
                ':total_payment' => $total_payment,
                ':future_value' => $future_value,
                ':total_profit' => $total_profit,
                ':roi_percent' => $roi,
            ]);
        } catch (Throwable $e) {
            $db_error = 'Saved calculation failed. Please check DB config.';
        }
    }
}

$has_results = $results !== null;
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Real Estate Calculator</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body class="<?php echo $has_results ? 'has-results' : ''; ?>">
  <div class="container">
    <div class="hero">
      <div>
        <div class="brand">Real Estate Planner</div>
        <h1 class="title">Investment Details</h1>
        <p class="subtitle">Fill details and tap the button. Results show instantly without extra scrolling.</p>

        <div class="card">
          <?php if ($errors): ?>
            <div class="note">
              <?php foreach ($errors as $error): ?>
                <div><?php echo htmlspecialchars($error); ?></div>
              <?php endforeach; ?>
            </div>
          <?php endif; ?>
          <?php if ($db_error): ?>
            <div class="note"><?php echo htmlspecialchars($db_error); ?></div>
          <?php endif; ?>

          <form method="post" data-calc-form>
            <div class="form-grid">
              <div class="field">
                <label>Property Price</label>
                <div class="input-wrap">
                  <input type="text" name="property_price" value="<?php echo htmlspecialchars($values['property_price']); ?>" data-number required>
                  <span class="input-suffix">INR</span>
                </div>
              </div>

              <div class="field">
                <label>Down Payment</label>
                <div class="input-wrap">
                  <input type="text" name="down_payment" value="<?php echo htmlspecialchars($values['down_payment']); ?>" data-number required>
                  <span class="input-suffix">INR</span>
                </div>
              </div>

              <div class="field">
                <label>Interest Rate (%)</label>
                <div class="input-wrap">
                  <input type="text" name="interest_rate" value="<?php echo htmlspecialchars($values['interest_rate']); ?>" data-number required>
                  <span class="input-suffix">%</span>
                </div>
              </div>

              <div class="field">
                <label>Loan Tenure (Years)</label>
                <div class="input-wrap">
                  <input type="text" name="tenure_years" value="<?php echo htmlspecialchars($values['tenure_years']); ?>" data-number required>
                  <span class="input-suffix">Years</span>
                </div>
              </div>

              <div class="field">
                <label>Expected Appreciation (%)</label>
                <div class="input-wrap">
                  <input type="text" name="growth_rate" value="<?php echo htmlspecialchars($values['growth_rate']); ?>" data-number required>
                  <span class="input-suffix">%</span>
                </div>
              </div>
            </div>

            <div class="actions">
              <button class="primary" type="submit">Show Your Value</button>
            </div>
          </form>
        </div>
      </div>

      <div class="results-inline">
        <div class="card results-panel">
          <h2 class="title" style="font-size: 22px;">Results</h2>
          <?php if (!$has_results): ?>
            <p class="subtitle">Fill the form to see your EMI, ROI, future value, and total profit.</p>
          <?php else: ?>
            <div class="results-grid">
              <div class="result-card">
                <div class="label">Monthly EMI</div>
                <div class="value"><?php echo fmt_inr($results['emi']); ?></div>
              </div>
              <div class="result-card">
                <div class="label">ROI</div>
                <div class="value"><?php echo number_format($results['roi'], 1); ?>%</div>
              </div>
              <div class="result-card">
                <div class="label">Future Value</div>
                <div class="value"><?php echo fmt_inr($results['future_value']); ?></div>
              </div>
              <div class="result-card">
                <div class="label">Total Profit</div>
                <div class="value ok"><?php echo fmt_inr($results['total_profit']); ?></div>
              </div>
            </div>
          <?php endif; ?>
        </div>
      </div>
    </div>

    <div class="results-drawer">
      <h2 class="title" style="font-size: 18px;">Results</h2>
      <?php if ($has_results): ?>
        <div class="results-grid">
          <div class="result-card">
            <div class="label">Monthly EMI</div>
            <div class="value"><?php echo fmt_inr($results['emi']); ?></div>
          </div>
          <div class="result-card">
            <div class="label">ROI</div>
            <div class="value"><?php echo number_format($results['roi'], 1); ?>%</div>
          </div>
          <div class="result-card">
            <div class="label">Future Value</div>
            <div class="value"><?php echo fmt_inr($results['future_value']); ?></div>
          </div>
          <div class="result-card">
            <div class="label">Total Profit</div>
            <div class="value ok"><?php echo fmt_inr($results['total_profit']); ?></div>
          </div>
        </div>
      <?php else: ?>
        <p class="subtitle">Results will appear here.</p>
      <?php endif; ?>
    </div>

    <div class="footer">Data is stored in MySQL for each calculation.</div>
  </div>

  <script src="assets/app.js"></script>
</body>
</html>
