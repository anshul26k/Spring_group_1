package com.devpilot.controller;

import com.devpilot.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/utils")
@CrossOrigin(origins = "*")
public class ConverterController {
    @GetMapping("/camel-case")
    public Map<String, String> convert(@RequestParam String input) {
        String result = StringUtils.toCamelCase(input);
        return Map.of("input", input, "output", result != null ? result : "");
    }
}