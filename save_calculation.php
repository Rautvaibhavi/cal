<?php
header('Content-Type: application/json');
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
    exit;
}

$down_payment = (float) ($data['down_payment'] ?? 0);
$interest_rate = (float) ($data['interest_rate'] ?? 0);
$tenure_years = (int) ($data['tenure_years'] ?? 0);
$monthly_rent = (float) ($data['monthly_rent'] ?? 0);
$future_value = (float) ($data['future_value'] ?? 0);
$total_rent = (float) ($data['total_rent'] ?? 0);
$total_return = (float) ($data['total_return'] ?? 0);
$roi_percent = (float) ($data['roi_percent'] ?? 0);

try {
    $pdo = get_db();
    $pdo->exec('CREATE TABLE IF NOT EXISTS industrial_calculations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        down_payment DECIMAL(15,2) NOT NULL,
        interest_rate DECIMAL(6,3) NOT NULL,
        tenure_years INT NOT NULL,
        monthly_rent DECIMAL(15,2) NOT NULL,
        future_value DECIMAL(15,2) NOT NULL,
        total_rent DECIMAL(15,2) NOT NULL,
        total_return DECIMAL(15,2) NOT NULL,
        roi_percent DECIMAL(8,3) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )');

    $stmt = $pdo->prepare('INSERT INTO industrial_calculations
        (down_payment, interest_rate, tenure_years, monthly_rent, future_value, total_rent, total_return, roi_percent)
        VALUES (:down_payment, :interest_rate, :tenure_years, :monthly_rent, :future_value, :total_rent, :total_return, :roi_percent)');

    $stmt->execute([
        ':down_payment' => $down_payment,
        ':interest_rate' => $interest_rate,
        ':tenure_years' => $tenure_years,
        ':monthly_rent' => $monthly_rent,
        ':future_value' => $future_value,
        ':total_rent' => $total_rent,
        ':total_return' => $total_return,
        ':roi_percent' => $roi_percent,
    ]);

    echo json_encode(['ok' => true]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Database save failed']);
}
