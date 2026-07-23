package com.example.arithmetic.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class ArithmeticResponse {
    private double operand1;
    private double operand2;
    private String operation;
    private BigDecimal result;
}