# Migration Plan — acme-legacy-banking

_Generated 2026-07-23 12:02 UTC by DevPilot AI._

| # | Step | Duration | Automation |
|---|------|---------:|-----------:|
|  1 | Upgrade Java 11 → 21 | 4.0h | 90% |
|  2 | Upgrade Spring Boot → 3.5 | 6.0h | 80% |
|  3 | Replace javax → jakarta | 6.0h | 95% |
|  4 | Upgrade dependencies | 8.0h | 60% |
|  5 | Refactor deprecated APIs | 12.0h | 40% |
|  6 | Generate / update tests | 6.0h | 85% |
|  7 | Validate build | 4.0h | 100% |
|  8 | Security validation | 8.0h | 50% |
|  9 | Performance validation | 6.0h | 70% |
| 10 | Generate Pull Request | 4.0h | 90% |

## Step 1 · Upgrade Java 11 → 21

**Duration:** 4.0h  ·  **Automation:** 90%

Update pom.xml <java.version> to 21 and configure maven-compiler-plugin for release 21. Ensure build environment uses JDK 21 and update CI/CD pipelines.

**Validation:** ``mvn compile` succeeds with `java -version` returning 21.`

## Step 2 · Upgrade Spring Boot → 3.5

**Duration:** 6.0h  ·  **Automation:** 80%

Update spring-boot-starter-parent to version 3.5.0-M1 or latest. Migrate properties in application.properties/yml using the Spring Boot Migrator tool.

**Validation:** `Spring Boot banner shows version 3.5.x on startup.`

## Step 3 · Replace javax → jakarta

**Duration:** 6.0h  ·  **Automation:** 95%

Execute OpenRewrite recipe `org.openrewrite.java.migrate.jakarta.JavaxMigrationToJakarta` to migrate all 10 javax imports. Manually verify persistence and validation namespaces in 6 Java files.

**Validation:** `Zero occurrences of `javax.persistence` or `javax.servlet` in codebase.`

## Step 4 · Upgrade dependencies

**Duration:** 8.0h  ·  **Automation:** 60%

Force upgrade of the 8 outdated dependencies including Hibernate 6.x and Jackson 2.17+. Resolve dependency convergence conflicts in Maven.

**Validation:** ``mvn dependency:analyze` shows no version conflicts.`

## Step 5 · Refactor deprecated APIs

**Duration:** 12.0h  ·  **Automation:** 40%

Address 26 deprecated API hits specifically targeting Date/Calendar to java.time and removing legacy Thread usage. Refactor the 3 affected files for modern API patterns.

**Validation:** `Clean build with `-Xlint:deprecation` showing 0 warnings.`

## Step 6 · Generate / update tests

**Duration:** 6.0h  ·  **Automation:** 85%

Migrate JUnit 4.13.2 to JUnit 5.11.x using OpenRewrite. Update @Test annotations and replace Mockito JUnit 4 runner with MockitoExtension.

**Validation:** ``mvn test` execution showing JUnit Jupiter engine usage.`

## Step 7 · Validate build

**Duration:** 4.0h  ·  **Automation:** 100%

Run full lifecycle validation including checkstyle and PMD. Ensure byte-code compatibility and resource filtering work under JDK 21.

**Validation:** ``mvn -T 1C clean verify` passes in under 5 minutes.`

## Step 8 · Security validation

**Duration:** 8.0h  ·  **Automation:** 50%

Migrate Spring Security configuration to the new Lambda-based DSL (Security 6 requirements). Update CSRF and Method Security configurations.

**Validation:** `Security integration tests pass and /actuator/health is accessible.`

## Step 9 · Performance validation

**Duration:** 6.0h  ·  **Automation:** 70%

Enable Project Loom virtual threads via `spring.threads.virtual.enabled=true`. Perform basic load testing to ensure zero regression on 151 LOC banking logic.

**Validation:** `Virtual threads visible in thread dump during load test.`

## Step 10 · Generate Pull Request

**Duration:** 4.0h  ·  **Automation:** 90%

Consolidate changes into a single atomic PR. Generate automated changelog and attach successful build artifacts from CI.

**Validation:** `PR passes all automated quality gates and tech debt score improves.`
