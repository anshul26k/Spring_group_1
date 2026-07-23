package com.example.arithmetic.service;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class ArithmeticService {
    public BigDecimal calculate(double a, double b, String op) {
        BigDecimal val1 = BigDecimal.valueOf(a);
        BigDecimal val2 = BigDecimal.valueOf(b);
        return switch (op.toLowerCase()) {
            case "add" -> val1.add(val2);
            case "subtract" -> val1.subtract(val2);
            case "multiply" -> val1.multiply(val2);
            case "divide" -> {
                if (b == 0) throw new ArithmeticException("Division by zero");
                yield val1.divide(val2, 4, RoundingMode.HALF_UP);
            }
            default -> throw new IllegalArgumentException("Unknown operation: " + op);
        };
    }
}