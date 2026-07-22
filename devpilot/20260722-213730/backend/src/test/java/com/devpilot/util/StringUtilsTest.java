package com.devpilot.util;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class StringUtilsTest {
    @Test
    void testToCamelCase() {
        assertEquals("helloWorld", StringUtils.toCamelCase("hello_world"));
        assertEquals("userId", StringUtils.toCamelCase("USER_ID"));
        assertEquals("multipleUnderscores", StringUtils.toCamelCase("multiple___underscores"));
        assertEquals("trailing", StringUtils.toCamelCase("trailing_"));
        assertNull(StringUtils.toCamelCase(null));
        assertEquals("", StringUtils.toCamelCase(""));
    }
}