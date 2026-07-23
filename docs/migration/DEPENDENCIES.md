# Dependency Upgrade Plan — group_1

| Dependency | Current | Recommended | Reason | Risk |
|---|---|---|---|---|
| `org.springframework.boot:spring-boot-starter-data-jpa` | managed | **3.5.4** | Hibernate 6.6 + jakarta.persistence | high |
| `org.springframework.boot:spring-boot-starter-security` | managed | **3.5.4** | Security 6, no WebSecurityConfigurerAdapter | high |
| `org.springframework.boot:spring-boot-starter-web` | managed | **3.5.4** | Servlet 6 (jakarta.servlet.*) | high |
| `org.springframework.boot:spring-boot-starter-test` | managed | **3.5.4** | JUnit 5 by default | medium |
| `org.springframework.security:spring-security-test` | managed | **latest** | Verify compatibility with Java 21 / Spring Boot 3 | low |