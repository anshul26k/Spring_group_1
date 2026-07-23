# Migration Plan — group_1

_Generated 2026-07-23 11:38 UTC by DevPilot AI._

| # | Step | Duration | Automation |
|---|------|---------:|-----------:|
|  1 | Upgrade Java → 21 | 1.0h | 90% |
|  2 | Upgrade Spring Boot → 3.x | 0.5h | 80% |
|  3 | Replace javax → jakarta | 0.2h | 100% |
|  4 | Upgrade dependencies (Hibernate 6, Security 6, Jackson, JUnit 5, etc.) | 0.5h | 80% |
|  5 | Refactor deprecated APIs (Date/Calendar/SimpleDateFormat/Vector/Hashtable, Thread.stop) | 0.2h | 95% |
|  6 | Generate / update tests (JUnit 5 + Mockito 5) | 0.5h | 70% |
|  7 | Validate build | 0.3h | 100% |
|  8 | Security validation | 0.3h | 100% |
|  9 | Performance validation (virtual threads where appropriate) | 0.2h | 90% |
| 10 | Generate Pull Request | 0.3h | 50% |

## Step 1 · Upgrade Java → 21

**Duration:** 1.0h  ·  **Automation:** 90%

Update pom.xml to set maven.compiler.release to 21 and configure the local environment to use OpenJDK 21. Given only 2 Java files, this is a low-risk config update.

**Validation:** ``mvn -T 1C verify` passes on JDK 21 and `java -version` returns 21.`

## Step 2 · Upgrade Spring Boot → 3.x

**Duration:** 0.5h  ·  **Automation:** 80%

Update the spring-boot-starter-parent to version 3.5.x in the pom.xml. Verify the small 18-line codebase against the updated BOM for potential property changes.

**Validation:** `Build success with `mvn clean compile` using Spring Boot 3.5.x libraries.`

## Step 3 · Replace javax → jakarta

**Duration:** 0.2h  ·  **Automation:** 100%

Perform a global scan of the 2 Java files for javax.* imports; although analysis shows 0, ensure 100% compliance using OpenRewrite rewrite-migrate-java recipe.

**Validation:** `Zero occurrences of `javax.persistence`, `javax.servlet`, or `javax.validation` in the source code.`

## Step 4 · Upgrade dependencies (Hibernate 6, Security 6, Jackson, JUnit 5, etc.)

**Duration:** 0.5h  ·  **Automation:** 80%

Address the 4 outdated dependencies identified in the analysis by updating versions in pom.xml to align with Spring Boot 3.5 managed versions.

**Validation:** ``mvn dependency:analyze` shows no version conflicts or major vulnerabilities.`

## Step 5 · Refactor deprecated APIs (Date/Calendar/SimpleDateFormat/Vector/Hashtable, Thread.stop)

**Duration:** 0.2h  ·  **Automation:** 95%

Scan the 18 LOC for legacy utility classes; while 0 deprecated APIs were reported, confirm absence of Thread-unsafe collections or legacy Date APIs.

**Validation:** `Code compiles with zero deprecation warnings using `-Xlint:deprecation`.`

## Step 6 · Generate / update tests (JUnit 5 + Mockito 5)

**Duration:** 0.5h  ·  **Automation:** 70%

Ensure JUnit version is bumped to 5.11.x as requested. Update test annotations and migrate any legacy assertions to AssertJ or Jupiter.

**Validation:** ``mvn test` execution results in 100% pass rate for existing test cases.`

## Step 7 · Validate build

**Duration:** 0.3h  ·  **Automation:** 100%

Execute a full Maven lifecycle build including package and verify to ensure artifact generation is stable under the new stack.

**Validation:** `Successful generation of a runnable JAR file via `mvn clean package`.`

## Step 8 · Security validation

**Duration:** 0.3h  ·  **Automation:** 100%

Run a specialized security audit using `mvn ossindex:audit` to verify the 4 upgraded dependencies have no known CVEs.

**Validation:** `Security report returns zero high or critical vulnerabilities for the group_1 project.`

## Step 9 · Performance validation (virtual threads where appropriate)

**Duration:** 0.2h  ·  **Automation:** 90%

Enable Project Loom virtual threads by adding `spring.threads.virtual.enabled=true` to application.properties to leverage Java 21 features.

**Validation:** `Application starts and logs indicate virtual thread usage for task execution.`

## Step 10 · Generate Pull Request

**Duration:** 0.3h  ·  **Automation:** 50%

Consolidate changes for the 7 files into a single PR, documenting the move from Java 17 to 21 and the update of 4 dependencies.

**Validation:** `PR successfully created and passed all CI/CD pipeline checks.`
