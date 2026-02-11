---
name: edit-product-requirements-documentation
description: Edit and maintain product requirements documentation based on req42 template via Backlog.md
---

# Skill: Edit Product Requirements Documentation

## Purpose
Maintain req42-based product requirements documentation through Backlog.md. Used to define product vision, goals, scope, backlog, quality requirements, and constraints.

## When to Use
- Defining product vision and business goals
- Documenting stakeholder needs
- Establishing product scope
- Managing product backlog (Epics, Features, Stories)
- Defining quality requirements and constraints
- Building shared vocabulary

## Req42 Structure

req42 has 10 sections:

| Section | Purpose |
|---------|---------|
| **Business Goals** | Vision and strategic objectives (PAM: Purpose, Advantage, Metric) |
| **Stakeholders** | Role-based analysis with influence |
| **Scope** | Product boundary and interfaces |
| **Product Backlog** | Epics → Features → Stories (user story format) |
| **Supporting Models** | Diagrams, flowcharts, prototypes |
| **Quality Requirements** | Non-functional requirements, performance targets |
| **Constraints** | Organizational and technical mandates |
| **Domain Terminology** | Glossary for shared vocabulary |
| **Assets** | Budget, timeline, team, infrastructure |
| **Teams** | Team structure and responsibilities |

## Workflow

### 1. View Documentation
```bash
backlog document view doc-004 --plain
```

Document stored at: `backlog/docs/doc-004 - Product-Requirements-Document.md`

### 2. Edit Req42 Sections

**Business Goals** (PAM notation):
- Purpose, Advantage, Metric for 3–5 strategic goals

**Stakeholders:**
- Role, person, topic, influence level for each stakeholder

**Scope:**
- Business scope (problems, segments, value)
- Technical scope (boundaries, interfaces, integrations)

**Product Backlog:**
- Hierarchical structure: Epic → Feature → Story
- User story format: "As a [role], I want [feature] so that [benefit]"
- Link stories to backlog tasks in `backlog/tasks/` and `backlog/completed/tasks/`

**Supporting Models:**
- Flowcharts, diagrams, wireframes, mockups
- Link to diagrams in `backlog/assets/`

**Quality Requirements:**
- Performance, availability, security, scalability, reliability, usability, maintainability, compliance
- Make requirements measurable with targets

**Constraints:**
- Organizational constraints (budget, timeline, team size, approvals)
- Technical constraints (stack, databases, integrations, platforms)

**Domain Terminology (Glossary):**
- Alphabetically ordered domain and technical terms

**Assets:**
- Budget, timeline, team members, external resources

**Teams:**
- Team structure and responsibility assignments (if scaled)

### 3. References

- **Link backlog items:** User stories in `backlog/tasks/` and `backlog/completed/tasks/`
- **Link diagrams:** Mockups and supporting models in `backlog/assets/`
- **Quality requirements:** Should be traceable to acceptance criteria in individual tasks

### 4. Validation Checklist

- [ ] All 10 req42 sections populated
- [ ] Business goals use PAM notation (Purpose, Advantage, Metric)
- [ ] Stakeholders identified with roles and influence
- [ ] Scope clearly defined (in/out, interfaces)
- [ ] Backlog structured Epic → Feature → Story
- [ ] User stories linked to tasks in `backlog/tasks/` and `backlog/completed/tasks/`
- [ ] Quality requirements measurable with targets
- [ ] Constraints documented (org and technical)
- [ ] Domain terminology glossary complete
- [ ] Supporting diagrams linked
- [ ] Stakeholder review completed
- [ ] No placeholder text remaining

## Output
- **Location:** `backlog/docs/doc-004 - Product-Requirements-Document.md`
- **Format:** Markdown (req42 template)
- **References:** Link to `backlog/tasks/`, `backlog/completed/tasks/`, `backlog/assets/`
