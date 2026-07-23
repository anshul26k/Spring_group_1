# Code Transformations — group_1

## 1. javax.persistence → jakarta.persistence

- **Category:** Namespace migration
- **Recipe:** `org.openrewrite.java.migrate.jakarta.JavaxToJakarta`
- **Confidence:** 99%

**Reason:** Spring Boot 3 requires Jakarta EE 9+ APIs following the transition from the javax to jakarta namespace.

**Before:**

```java
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "users")
public class User {
    @Id
    private Long id;
}
```

**After:**

```java
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "users")
public class User {
    @Id
    private Long id;
}
```

## 2. WebSecurityConfigurerAdapter → SecurityFilterChain

- **Category:** API replacement
- **Recipe:** `org.openrewrite.java.spring.boot3.WebSecurityConfigurerAdapterToSecurityFilterChain`
- **Confidence:** 95%

**Reason:** WebSecurityConfigurerAdapter was deprecated in Spring Security 5.7 and removed in 6.0 (Spring Boot 3).

**Before:**

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().anyRequest().authenticated();
    }
}
```

**After:**

```java
@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.authorizeHttpRequests(auth -> auth.anyRequest().authenticated()).build();
    }
}
```

## 3. SimpleDateFormat → DateTimeFormatter

- **Category:** Language feature
- **Recipe:** `org.openrewrite.java.migrate.time.SimpleDateFormatToDateTimeFormatter`
- **Confidence:** 85%

**Reason:** DateTimeFormatter is thread-safe and part of the modern java.time API, replacing the legacy and unsafe SimpleDateFormat.

**Before:**

```java
import java.text.SimpleDateFormat;
import java.util.Date;
public class DateUtils {
    public String format(Date date) {
        return new SimpleDateFormat("yyyy-MM-dd").format(date);
    }
}
```

**After:**

```java
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;
public class DateUtils {
    private static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    public String format(java.util.Date date) {
        return date.toInstant().atZone(ZoneId.systemDefault()).format(FMT);
    }
}
```

## 4. Switch Statement → Switch Expression

- **Category:** Language feature
- **Recipe:** `org.openrewrite.staticanalysis.SwitchExpressions`
- **Confidence:** 92%

**Reason:** Switch expressions are more concise, less error-prone (no fall-through), and provide better type safety.

**Before:**

```java
public String getRole(UserRole role) {
    switch (role) {
        case ADMIN: return "Administrator";
        case MODERATOR: return "Moderator";
        default: return "Guest";
    }
}
```

**After:**

```java
public String getRole(UserRole role) {
    return switch (role) {
        case ADMIN -> "Administrator";
        case MODERATOR -> "Moderator";
        default -> "Guest";
    };
}
```

## 5. POJO DTO → Java Record

- **Category:** Language feature
- **Recipe:** `org.openrewrite.java.migrate.util.JavaBeanToRecord`
- **Confidence:** 90%

**Reason:** Records provide a compact syntax for data-carrying classes, automatically generating accessors, equals, and hashCode.

**Before:**

```java
public class UserDto {
    private final String username;
    private final String email;
    public UserDto(String username, String email) {
        this.username = username;
        this.email = email;
    }
    public String getUsername() { return username; }
    public String getEmail() { return email; }
}
```

**After:**

```java
public record UserDto(String username, String email) {}
```

## 6. Fixed Thread Pool → Virtual Threads

- **Category:** API replacement
- **Recipe:** `org.openrewrite.java.migrate.net.JavaNetVirtualThreads`
- **Confidence:** 88%

**Reason:** Virtual threads (Project Loom) significantly reduce the overhead of concurrent tasks in Java 21 applications.

**Before:**

```java
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
@Configuration
public class AsyncConfig {
    @Bean
    public ExecutorService taskExecutor() {
        return Executors.newFixedThreadPool(100);
    }
}
```

**After:**

```java
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;
@Configuration
public class AsyncConfig {
    @Bean
    public ExecutorService taskExecutor() {
        return Executors.newVirtualThreadPerTaskExecutor();
    }
}
```
