# Code Transformations — acme-legacy-banking

## 1. javax.persistence → jakarta.persistence

- **Category:** Namespace migration
- **Recipe:** `org.openrewrite.java.migrate.jakarta.JavaxToJakarta`
- **Confidence:** 99%

**Reason:** Spring Boot 3 requires Jakarta EE 9/10 namespaces, necessitating the move from javax.* to jakarta.* for persistence and validation.

**Before:**

```java
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "accounts")
public class Account {
    @Id
    private Long id;
    private String owner;
}
```

**After:**

```java
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "accounts")
public class Account {
    @Id
    private Long id;
    private String owner;
}
```

## 2. WebSecurityConfigurerAdapter → SecurityFilterChain

- **Category:** API replacement
- **Recipe:** `org.openrewrite.java.spring.boot3.WebSecurityConfigurerAdapterToSecurityFilterChain`
- **Confidence:** 95%

**Reason:** WebSecurityConfigurerAdapter was deprecated in Spring Security 5.7 and removed in 6.0/Spring Boot 3 in favor of component-based security configuration.

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
- **Confidence:** 88%

**Reason:** SimpleDateFormat is not thread-safe and is part of the legacy Date API. DateTimeFormatter is immutable, thread-safe, and part of the modern JSR-310 java.time package.

**Before:**

```java
import java.text.SimpleDateFormat;
import java.util.Date;

public String formatTransaction(Date date) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    return sdf.format(date);
}
```

**After:**

```java
import java.time.format.DateTimeFormatter;
import java.time.ZoneId;

public String formatTransaction(java.util.Date date) {
    DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")
        .withZone(ZoneId.systemDefault());
    return dtf.format(date.toInstant());
}
```

## 4. Legacy Switch → Switch Expression

- **Category:** Language feature
- **Recipe:** `org.openrewrite.java.migrate.util.SwitchExpressions`
- **Confidence:** 92%

**Reason:** Switch expressions (introduced in Java 14) are more concise, less error-prone by eliminating break statements, and can be used as expressions.

**Before:**

```java
public String getAccountTypeLabel(int type) {
    switch (type) {
        case 1: return "SAVINGS";
        case 2: return "CHECKING";
        default: throw new IllegalArgumentException("Unknown: " + type);
    }
}
```

**After:**

```java
public String getAccountTypeLabel(int type) {
    return switch (type) {
        case 1 -> "SAVINGS";
        case 2 -> "CHECKING";
        default -> throw new IllegalArgumentException("Unknown: " + type);
    };
}
```

## 5. DTO Class → Java Record

- **Category:** Language feature
- **Recipe:** `org.openrewrite.java.migrate.Java14Records`
- **Confidence:** 85%

**Reason:** Records provide a compact syntax for declaring data-carrying classes, automatically generating accessors, equals, hashCode, and toString methods.

**Before:**

```java
public final class AccountDto {
    private final String iban;
    private final double balance;
    public AccountDto(String iban, double balance) {
        this.iban = iban; this.balance = balance;
    }
    public String getIban() { return iban; }
    public double getBalance() { return balance; }
}
```

**After:**

```java
public record AccountDto(String iban, double balance) {}
```

## 6. Fixed Thread Pool → Virtual Thread Executor

- **Category:** Modernization
- **Recipe:** `org.openrewrite.java.migrate.concurrent.UseVirtualThreads`
- **Confidence:** 80%

**Reason:** Project Loom virtual threads (Java 21) significantly reduce memory overhead and improve throughput for I/O-bound tasks in high-concurrency banking environments.

**Before:**

```java
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;

public class TransactionService {
    private final ExecutorService executor = Executors.newFixedThreadPool(100);
}
```

**After:**

```java
import java.util.concurrent.Executors;
import java.util.concurrent.ExecutorService;

public class TransactionService {
    private final ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor();
}
```
