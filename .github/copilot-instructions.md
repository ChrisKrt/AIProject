
# Guidelines for Workspace Agent

## Priority Levels
- **P1 (Critical)**: Must follow - Core principles that ensure code quality, security, and maintainability
- **P2 (Important)**: Should follow - Best practices that significantly improve code quality
- **P3 (Recommended)**: Good practice - Additional guidelines that enhance code organization

## Guidelines
- **[P1]** use Guard Clauses for public methods to handle invalid input early
- **[P1]** use descriptive error messages in exceptions
- **[P1]** use clean architecture principles to separate concerns
- **[P1]** use dependency injection to decouple components
- **[P1]** the dependency flow should always point inwards (from outer layers to inner layers)
- **[P1]** write unit tests for public methods
- **[P1]** use SOLID principles to design classes
- **[P1]** always use https / tls for communication when developing a web application
- **[P1]** follow the Architectural Decision Records (ADRs) for architectural decisions in the project, which are stored in the `backlog/decisions` directory
- **[P1]** use interfaces to define contracts for classes which are publicly exposed (e.g. application services, repositories)
- **[P1]** follow the 12-factor app principles

- **[P2]** every public method or class should have a comment
- **[P2]** every usage of a third party library is wrapped in a try-catch block
- **[P2]** use descriptive variable and function names
- **[P2]** do not use primitive obsession, always use objects to encapsulate related data
- **[P2]** do not pass primitive types as parameters, always use objects to encapsulate related data
- **[P2]** avoid using magic numbers, use constants instead
- **[P2]** use async/await for asynchronous operations
- **[P2]** avoid using global variables, encapsulate code in modules or classes
- **[P2]** for private methods use debug.assert (c#) or console.assert (javascript) for preconditions to ensure that the method is called with valid parameters
- **[P2]** for private methods use debug.assert (c#) or console.assert (javascript) for postconditions to ensure that the method is left with valid parameters
- **[P2]** name classes, files, methods, and variables in English
- **[P2]** name classes, files, methods, and variables with descriptive names that reflect their purpose (domain related)
- **[P2]** use domain driven design principles to model the domain
- **[P2]** domain related logic should be encapsulated in domain entities
- **[P2]** Configuration happens via environment variables
- **[P2]** cross cutting concerns are handled in a separate module/project named aspects
- **[P2]** cross cutting concerns include logging, caching, authentication, authorization, and error handling, notifications
- **[P2]** Notifications / Alerts / Messages to the user are handled by a frontend project
- **[P2]** Keep methods/functions flat, they should not have a high cyclomatic complexity
- **[P3]** usage of third party libraries happens in a separate file
- **[P3]** try to restrict the usage of a third party library to a single file
- **[P3]** use early returns to reduce nesting
- **[P3]** private methods should be static and pure methods
- **[P3]** domain logic does mostly not need interfaces, despite for the strategy pattern
- **[P3]** use Test Driven Development (TDD) to develop new features
- **[P3]** use Gherkin for acceptance criteria tests
- **[P3]** if the feature is UI related, use Behavior Driven Development (BDD) to define the behavior of the UI
- **[P3]** use Gherkin syntax to define the behavior of the UI, with scenarios written in a Given-When-Then format
- **[P3]** write gherkin steps in a step file (gather all available steps in a single file)
- **[P3]** write gherkin thens in a then file (gather all available thens in a single file)
- **[P3]** write gherkin givens in a given file (gather all available givens in a single file)
- **[P3]** write gherkin test scenarios in a scenario file (use the step, then, and given files to define the behavior of the UI)
- **[P3]** consider the defined constraints as stated in the ticket description
- **[P3]** Use the commitizen command line tool to create commit messages (e.g. `cz commit`)



# Workspace Agent instructions
Please also see the instructions if necessary in `.github/instructions/*.md`:
- [Backlog.md Guidelines](instructions/backlog.md.instructions.md)
- [C# Guidelines](instructions/csharp.instructions.md)
- [Design System Guidelines](instructions/design-system.instructions.md)
- [Development Standards](instructions/development-standards.instructions.md)
- [Documentation Guidelines](instructions/documentation-guidelines.instructions.md)