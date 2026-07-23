# Risk Assessment — acme-legacy-banking

- **Overall:** 57 / 100  ·  Level: **Medium**
- **Breaking change:** 52
- **Dependency:** 88
- **Security:** 16
- **Performance:** 40
- **Rollback complexity:** 0

## Deprecated APIs detected

- `java.util.Date` — 5 occurrence(s). Prefer java.time.Instant / LocalDateTime
- `javax.persistence.*` — 5 occurrence(s). Migrate to jakarta.persistence.*
- `javax.validation.*` — 4 occurrence(s). Migrate to jakarta.validation.*
- `WebSecurityConfigurerAdapter` — 2 occurrence(s). Use SecurityFilterChain bean
- `java.util.Calendar` — 2 occurrence(s). Prefer java.time.ZonedDateTime
- `java.text.SimpleDateFormat` — 2 occurrence(s). Use DateTimeFormatter (thread-safe)
- `java.util.Hashtable` — 2 occurrence(s). Use ConcurrentHashMap
- `java.util.Vector` — 1 occurrence(s). Use ArrayList or CopyOnWriteArrayList
- `Thread.stop()` — 1 occurrence(s). Use interrupt() + volatile flag
- `Thread.stop() (AST)` — 1 occurrence(s). Use interrupt() + volatile flag
- `javax.servlet.*` — 1 occurrence(s). Migrate to jakarta.servlet.*