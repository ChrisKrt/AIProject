---
name: create-atdd
description: Create ATDD/BDD feature file with acceptance criteria
---
# Skill: Create ATDD

Do this onyl for user stories. For bugs extend an existing feature file with a new scenario to cover the bug fix.
## Steps

1. Review ACs: `backlog task <taskId> --plain`
2. Create `backlog/assets/<task-prefix>-<taskId>.feature` using Given-When-Then pattern:
   ```gherkin
   Feature: <Task Title>
     <Task Description>

     Scenario: <AC #1>
       Given <precondition>
       When <action>
       Then <expected result>
   ```
3. Link to task: `backlog task edit <taskId> --ref backlog/assets/<task-prefix>-<taskId>.feature`
