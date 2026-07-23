# Code Transformations — group_1

## 1. javax.validation → jakarta.validation

- **Category:** Namespace migration
- **Recipe:** `org.openrewrite.java.migrate.jakarta.JavaxValidationToJakartaValidation`
- **Confidence:** 99%

**Reason:** Spring Boot 3.0+ requires the Jakarta EE 9+ namespace for all validation and persistence annotations.

**Before:**

```java
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class UserRequest {
    @NotBlank
    @Size(min = 2, max = 50)
    private String username;
}
```

**After:**

```java
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserRequest {
    @NotBlank
    @Size(min = 2, max = 50)
    private String username;
}
```

## 2. WebSecurityConfigurerAdapter → SecurityFilterChain

- **Category:** API replacement
- **Recipe:** `org.openrewrite.java.spring.security6.WebSecurityConfigurerAdapterToSecurityFilterChain`
- **Confidence:** 95%

**Reason:** WebSecurityConfigurerAdapter was removed in Spring Security 6/Spring Boot 3 in favor of component-based security configuration.

**Before:**

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().anyRequest().authenticated().and().httpBasic();
    }
}
```

**After:**

```java
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
            .httpBasic(Customizer.withDefaults()).build();
    }
}
```

## 3. SimpleDateFormat → DateTimeFormatter

- **Category:** API replacement
- **Recipe:** `org.openrewrite.java.migrate.time.SimpleDateFormatToDateTimeFormatter`
- **Confidence:** 85%

**Reason:** DateTimeFormatter is thread-safe and part of the modern java.time API, replacing the legacy and error-prone SimpleDateFormat.

**Before:**

```java
import java.text.SimpleDateFormat;
import java.util.Date;

public String formatDate(Date date) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    return sdf.format(date);
}
```

**After:**

```java
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;

public String formatDate(Date date) {
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd").withZone(ZoneId.systemDefault());
    return dtf.format(date.toInstant());
}
```

## 4. Traditional Switch → Switch Expression

- **Category:** Language feature
- **Recipe:** `org.openrewrite.java.migrate.net.SwitchExpressions`
- **Confidence:** 95%

**Reason:** Switch expressions reduce boilerplate, prevent fall-through bugs, and provide better type safety with pattern matching.

**Before:**

```java
public String getPriorityLabel(int level) {
    switch (level) {
        case 1: return "LOW";
        case 2: return "MEDIUM";
        case 3: return "HIGH";
        default: return "UNKNOWN";
    }
}
```

**After:**

```java
public String getPriorityLabel(int level) {
    return switch (level) {
        case 1 -> "LOW";
        case 2 -> "MEDIUM";
        case 3 -> "HIGH";
        default -> "UNKNOWN";
    };
}
```

## 5. POJO DTO → Java Record

- **Category:** Language feature
- **Recipe:** `org.openrewrite.java.migrate.lang.RecordType`
- **Confidence:** 90%

**Reason:** Records provide a concise syntax for data-carrier classes, automatically generating accessors, equals, and hashCode.

**Before:**

```java
public class UserDto {
    private final String id;
    private final String email;
    public UserDto(String id, String email) {
        this.id = id; this.email = email;
    }
    public String getId() { return id; }
    public String getEmail() { return email; }
}
```

**After:**

```java
public record UserDto(String id, String email) {}
```

## 6. Fixed ThreadPool → Virtual Threads

- **Category:** Language feature
- **Recipe:** `org.openrewrite.java.migrate.concurrent.ThreadToVirtualThread`
- **Confidence:** 80%

**Reason:** Virtual threads (Java 21) significantly reduce memory overhead for I/O bound applications compared to platform thread pools.

**Before:**

```java
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;

public class TaskRunner {
    private final ExecutorService executor = Executors.newFixedThreadPool(100);
    public void run(Runnable r) { executor.submit(r); }
}
```

**After:**

```java
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;

public class TaskRunner {
    private final ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();
    public void run(Runnable r) { executor.submit(r); }
}
```
