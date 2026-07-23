CREATE TABLE calculation_logs (
    id BIGSERIAL PRIMARY KEY,
    operand_a DECIMAL NOT NULL,
    operand_b DECIMAL NOT NULL,
    operation VARCHAR(20) NOT NULL,
    result DECIMAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);