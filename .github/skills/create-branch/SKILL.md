---
name: create-branch
description: Guide how to create a new branch to work on an issue
---
# Skill: Create Branch

## Purpose
This skill provides instructions on how to create branches correctly according to the OneBookshelf project's branching conventions. The project uses **trunk-based development** with specific naming patterns for different types of work.

## When to Use This Skill
Use this skill when:
- A user asks to create a new branch
- A user needs guidance on branch naming conventions
- Starting work on a feature, bug fix, or chore
- The user mentions creating a branch for a specific ticket/issue

## Branch Naming Conventions

OneBookshelf uses grouped branch naming with three distinct patterns:

### 1. Feature Branches
**Pattern:** `feature/#<user-story-number>-<user-story-description>`

**When to use:**
- Implementing new user stories

**Examples:**
- `feature/#005-bookshelf-search`
- `feature/#012-pdf-metadata-extraction`
- `feature/#023-cloud-storage-integration`

### 2. Bugfix Branches
**Pattern:** `fix/#<fix-number>-<fix-description>`

**When to use:**
- Fixing bugs or defects

**Examples:**
- `fix/#002-pdf-import-error`
- `fix/#008-memory-leak-bookshelf-list`
- `fix/#015-accessibility-keyboard-navigation`

### 3. Chore Branches
**Pattern:** `chore/#<task-number>-<task-description>`

**When to use:**
- Maintenance tasks
- Dependency updates
- Documentation improvements
- Build configuration changes
- Non-feature, non-bugfix work

**Examples:**
- `chore/#010-update-dependencies`
- `chore/#018-improve-build-performance`
- `chore/#025-update-adr-documentation`

## Requirements for Branch Names
- Must reference a product backlog item (see backlog/tasks)
- Description should be kebab-case (lowercase with hyphens)
- Description should be concise but descriptive
- Use lowercase only


### Create the Branch from Main
Always branch from the main branch:

```bash
git checkout main
git pull origin main
git checkout -b <branch-name>
```

After creating the branch locally, push it to the remote:

```bash
git push -u origin <branch-name>
```

## Validation Checklist

Before finalizing a branch name, verify:
- [ ] A ticket exists for this work
- [ ] The correct prefix is used (`feature/`, `fix/`, or `chore/`)
- [ ] The ticket number is included with `#`
- [ ] The description is in kebab-case (lowercase with hyphens)
- [ ] The description is concise and descriptive
- [ ] The branch is created from an up-to-date main branch
