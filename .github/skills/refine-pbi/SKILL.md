---
name: refine-pbi
description: Refine a product backlog item from Idea to Refinement status
---
# Skill: Refine Product Backlog Item

## Purpose
Refine a PBI in Idea status by moving it to Refinement, ensuring Definition of Done exists, creating mockups for user stories, and ATDD feature files.

## When to Use
- User asks to refine a ticket/PBI
- Moving item from Idea to Refinement
- Need to prepare PBI for development

## PBI Types
- **User Story**: User requirement (format: "As a [role], I want [feature] so that [benefit]")
- **Task**: Technical work item
- **Bug**: Defect to be fixed

## Refinement Steps

### 1. View Current Task
```bash
backlog task <taskId> --plain
```

### 2. Move to Refinement Status
```bash
backlog task edit <taskId> -s "Refinement"
```

### 3. Ensure Definition of Done
Verify DoD items exist (defaults from config.yml):
```bash
backlog task <taskId> --plain
```

If missing, add DoD items:
```bash
backlog task edit <taskId> --dod "Unit Tests written" --dod "Code reviewed"
```

### 4. Create Mockup (User Stories Only)
For user stories, create a UI mockup:
- **See:** `create-mockup` skill
- Captures screenshot of target page
- Saves to `backlog/assets/<task-prefix>-<taskId>.jpg`
- Provides visual reference for implementation

### 5. Create ATDD Feature File
Create Gherkin feature file for acceptance criteria:
- **See:** `create-atdd` skill
- Converts acceptance criteria to BDD scenarios
- Saves to `backlog/assets/<task-prefix>-<taskId>.feature`
- Enables test-driven development

## Validation Checklist
- [ ] Task viewed and understood
- [ ] Status changed to "Refinement"
- [ ] Definition of Done items present
- [ ] Mockup created (User Stories only)
- [ ] .feature file created with ATDD scenarios
- [ ] All artifacts linked to task via --ref

## Notes
- Use `backlog task edit` CLI only (never edit task markdown files directly)
- User stories require mockups, all types require feature files
- Mockups provide visual context for developers
- Feature files enable automated acceptance testing
- Keep it simple, the markdown should fit on a DIN A4 page when printed

