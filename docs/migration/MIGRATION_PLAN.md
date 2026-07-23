# Migration Plan — group_1

_Generated 2026-07-23 11:33 UTC by DevPilot AI._

| # | Step | Duration | Automation |
|---|------|---------:|-----------:|
|  1 | Upgrade Java → 21 | 0.5h | 90% |
|  2 | Upgrade Spring Boot → 3.x | 0.5h | 90% |
|  3 | Replace javax → jakarta | 0.2h | 100% |
|  4 | Upgrade dependencies (Hibernate 6, Security 6, Jackson, JUnit 5, etc.) | 0.5h | 80% |
|  5 | Refactor deprecated APIs (Date/Calendar/SimpleDateFormat/Vector/Hashtable, Thread.stop) | 0.2h | 100% |
|  6 | Generate / update tests (JUnit 5 + Mockito 5) | 0.5h | 80% |
|  7 | Validate build | 0.5h | 100% |
|  8 | Security validation | 0.5h | 90% |
|  9 | Performance validation (virtual threads where appropriate) | 0.3h | 90% |
| 10 | Generate Pull Request | 0.3h | 100% |

## Step 1 · Upgrade Java → 21

**Duration:** 0.5h  ·  **Automation:** 90%

Update the `maven.compiler.release` and `<java.version>` properties in the pom.xml to 21. Run `mvn -T 1C clean compile` using JDK 21 to ensure compatibility with the existing 2 Java files.

**Validation:** ``mvn clean compile` successful with `java -version` returning 21.`

## Step 2 · Upgrade Spring Boot → 3.x

**Duration:** 0.5h  ·  **Automation:** 90%

Update the `spring-boot-starter-parent` version to 3.5.x in the Maven POM. This aligns the 18 LOC project with the latest Spring framework baselines and 3.5-specific features.

**Validation:** `Spring Boot context starts successfully and `mvn dependency:tree` reflects version 3.5.x.`

## Step 3 · Replace javax → jakarta

**Duration:** 0.2h  ·  **Automation:** 100%

Perform a global search and replace of `javax.*` imports to `jakarta.*` for JEE dependencies. Given the project has 0 javax imports reported, this is a validation step using OpenRewrite `jakarta-ee-9` recipe.

**Validation:** `Search for `import javax.` returns zero results in the 2 Java source files.`

## Step 4 · Upgrade dependencies (Hibernate 6, Security 6, Jackson, JUnit 5, etc.)

**Duration:** 0.5h  ·  **Automation:** 80%

Update the 4 outdated dependencies identified in the metrics to their latest stable versions compatible with SB 3.5. Focus on upgrading Hibernate to 6.x and ensuring Jackson alignment.

**Validation:** ``mvn dependency:analyze` shows no version conflicts or missing artifacts.`

## Step 5 · Refactor deprecated APIs (Date/Calendar/SimpleDateFormat/Vector/Hashtable, Thread.stop)

**Duration:** 0.2h  ·  **Automation:** 100%

Scan the 2 Java files for legacy utility classes like `java.util.Date` and replace with `java.time.Instant`. Although 0 deprecated APIs were detected, this ensures strict compliance with Java 21 standards.

**Validation:** `Compilation completes with zero deprecation warnings via `-Xlint:deprecation`.`

## Step 6 · Generate / update tests (JUnit 5 + Mockito 5)

**Duration:** 0.5h  ·  **Automation:** 80%

Migrate the 'unknown' JUnit version to JUnit 5.11.x. Update any `@Test` imports from `org.junit` to `org.junit.jupiter.api` and ensure Mockito 5.x compatibility.

**Validation:** ``mvn test` executes all test cases successfully with JUnit Jupiter runner.`

## Step 7 · Validate build

**Duration:** 0.5h  ·  **Automation:** 100%

Execute a full Maven clean install to ensure the 7 files correctly package into a JAR. Verify that the configuration files (1) are correctly processed by the 3.5 build plugins.

**Validation:** ``mvn clean install` produces a valid deployment artifact without errors.`

## Step 8 · Security validation

**Duration:** 0.5h  ·  **Automation:** 90%

Run a specialized security scan using `mvn ossindex:audit` or `snyk test` to check the updated dependency tree for vulnerabilities. Address any high-risk findings introduced during the upgrade.

**Validation:** `Security report shows 0 critical or high-level vulnerabilities in the updated stack.`

## Step 9 · Performance validation (virtual threads where appropriate)

**Duration:** 0.3h  ·  **Automation:** 90%

Enable Project Loom virtual threads by adding `spring.threads.virtual.enabled=true` to the application properties. Verify thread management for the low-complexity project structure.

**Validation:** `Application logs confirm execution on Virtual Threads during runtime.`

## Step 10 · Generate Pull Request

**Duration:** 0.3h  ·  **Automation:** 100%

Package all changes into a standardized Git commit and generate a Pull Request to the main branch. Include the automated migration report showing the tech debt score reduction from 20.

**Validation:** `Pull Request created in the repository with all 10 steps documented and passing CI/CD.`
