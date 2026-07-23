package com.example.arithmetic.controller;
import com.example.arithmetic.dto.ArithmeticResponse;
import com.example.arithmetic.service.ArithmeticService;
import org.springframework.web.bind.annotation.*;
import java.math.BigDecimal;

@RestController
@RequestMapping("/api/v1/arithmetic")
public class ArithmeticController {
    private final ArithmeticService service;
    public ArithmeticController(ArithmeticService service) { this.service = service; }

    @GetMapping
    public ArithmeticResponse compute(
            @RequestParam double a, 
            @RequestParam double b, 
            @RequestParam String op) {
        BigDecimal result = service.calculate(a, b, op);
        return new ArithmeticResponse(a, b, op, result);
    }
}