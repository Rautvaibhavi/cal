<?php
$lang = $_GET['lang'] ?? 'en';
$type = $_GET['type'] ?? 'industrial';
?>
<!DOCTYPE html>
<html lang="<?php echo htmlspecialchars($lang); ?>">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Report</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&family=Noto+Sans+Gujarati:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/style.css">
</head>
<body class="report-page" data-lang="<?php echo htmlspecialchars($lang); ?>" data-type="<?php echo htmlspecialchars($type); ?>">
  <div class="page">
    <header class="topbar">
      <div class="brand">
        <span class="brand-dot"></span>
        <span data-i18n="report_brand">Smart Property Flow</span>
      </div>
      <a class="badge" href="index.php" data-i18n="report_back">Back</a>
    </header>

    <main class="container">
      <section class="report-hero">
        <div>
          <h1 data-i18n="report_title">Investment Report</h1>
          <p data-i18n="report_subtitle">Generated from your latest inputs.</p>
        </div>
        <div class="report-chip" data-report-type>Industrial</div>
      </section>

      <section class="report-grid">
        <div class="card report-card" data-report-summary></div>
        <div class="card report-card">
          <div class="section-title" data-i18n="report_chart_title">Performance Graph</div>
          <div class="chart">
            <div class="chart-bars" data-report-bars></div>
            <div class="chart-legend" data-report-legend></div>
          </div>
        </div>
      </section>
    </main>
  </div>

  <script src="assets/report.js"></script>
</body>
</html>
