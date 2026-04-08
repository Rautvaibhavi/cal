CREATE DATABASE IF NOT EXISTS real_estate;
USE real_estate;

CREATE TABLE IF NOT EXISTS real_estate_calculations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    property_price DECIMAL(15,2) NOT NULL,
    down_payment DECIMAL(15,2) NOT NULL,
    interest_rate DECIMAL(6,3) NOT NULL,
    tenure_years INT NOT NULL,
    growth_rate DECIMAL(6,3) NOT NULL,
    loan_amount DECIMAL(15,2) NOT NULL,
    monthly_emi DECIMAL(15,2) NOT NULL,
    total_payment DECIMAL(15,2) NOT NULL,
    future_value DECIMAL(15,2) NOT NULL,
    total_profit DECIMAL(15,2) NOT NULL,
    roi_percent DECIMAL(8,3) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS industrial_calculations (
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
);

