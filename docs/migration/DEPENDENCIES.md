# Dependency Upgrade Plan — acme-legacy-banking

| Dependency | Current | Recommended | Reason | Risk |
|---|---|---|---|---|
| `org.springframework.boot:spring-boot-starter-web` | managed | **3.5.4** | Servlet 6 (jakarta.servlet.*) | high |
| `org.springframework.boot:spring-boot-starter-data-jpa` | managed | **3.5.4** | Hibernate 6.6 + jakarta.persistence | high |
| `org.springframework.boot:spring-boot-starter-security` | managed | **3.5.4** | Security 6, no WebSecurityConfigurerAdapter | high |
| `org.springframework.boot:spring-boot-starter-validation` | 2.1.214 | **latest** | Verify compatibility with Java 21 / Spring Boot 3 | low |
| `org.hibernate:hibernate-core` | 5.6.15.Final | **6.6.5.Final** | jakarta.persistence namespace | high |
| `com.fasterxml.jackson.core:jackson-databind` | 2.13.5 | **2.18.2** | CVE fixes & records support | medium |
| `io.jsonwebtoken:jjwt-api` | 0.11.5 | **0.12.6** | JDK 21, virtual thread safe | medium |
| `org.projectlombok:lombok` | 1.18.24 | **1.18.36** | JDK 21 compatibility | low |
| `junit:junit` | 4.13.2 | **REMOVE (migrate to JUnit 5)** | JUnit 4 is end-of-life | medium |
| `org.mockito:mockito-core` | 4.11.0 | **5.14.2** | Java 21 bytecode support | medium |