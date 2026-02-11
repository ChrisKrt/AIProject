---
applyTo: "**/*.{cs,csproj,sln,slnx}"
---

# C#
- frontend code should be in its own project (a web api is also a frontend)
- the application code should be in its own project
- the domain code should be put in a "Core" module inside the application project
- the infrastructure code should be put inside its own project
- the aspects code should be put inside its own project
- aspects are cross cutting concerns like logging, caching, authentication, authorization, error handling, notifications
- So, we have at least four projects: frontend, application, infrastructure, and aspects
- the api of the application services should be put in a "api" module inside the application project
- the spi (Service Provider Interface) the application services want to access should be put in a "spi" module inside the application project
- the frontend code only accesses the api module of the application project
- the infrastructure code implements the spi module of the application project
- the application services implement the api module of the application project
- the frontend code only knows the api module of the application project
- the application project does not know the frontend project
- the application project does not know the infrastructure project
- the infrastructure project only knows the spi module of the application project (solved via friendly assemblies)
- we use dependency injection (the built in DI container of .NET is sufficient)
- each module add its own services to the DI container
- the composition root is in the frontend project
- use LINQ whenever possible
- pass an ILogger to the constructor of a class that needs logging
- classes are per default sealed, unless they are designed for inheritance
- the business code does not throw exceptions for business rule violations, instead it returns Result objects
- the buisness code catches exceptions from lower layers and wraps them in Result objects
- use async/await for IO bound operations
- use records for DTOs and immutable data structures (entities)
- use classes for services
- use structs for small, immutable data structures that have value semantics
- every function has an input and an output (no void functions)
- business decisions are made in the application/core layer
- the infrastructure layer acts based on the decisions made in the application/core layer
- use configuration files (appsettings.json) for configuration
- use options pattern for configuration (IOptions<T>) (define the options in dependency injection)
- use enums for feature flags


