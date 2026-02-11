---
name: create-mockup
description: Create a UI mockup for a user story using Playwright screenshot
---
# Skill: Create Mockup for User Story

## Purpose
Create a visual mockup for a user story by taking a screenshot of the relevant application page and saving it as a JPEG in the backlog assets folder.

## When to Use
- User story requires UI changes
- Visual representation needed for refinement
- Designer or developer needs reference for implementation

## Prerequisites
- Application must be running and accessible
- Know the URL of the page where the user story will be implemented
- Playwright MCP server must be available

## Steps

### 1. Identify Target Page
Determine which page/screen the user story affects:
```bash
backlog task <taskId> --plain
```

### 2. Navigate to Page with Playwright
Use Playwright MCP to open the target page:
```javascript
// Navigate to the relevant page
await page.goto('<application-url>');
```

### 3. Capture Screenshot
Take a screenshot and save to backlog assets:
```javascript
// Save screenshot as JPEG in backlog/assets/
await page.screenshot({
  path: 'backlog/assets/<task-prefix>-<taskId>.jpg',
  type: 'jpeg',
  fullPage: true
});
```

**Example:** For task PBI-001, save as `backlog/assets/PBI-001.jpg`

### 4. Link Mockup to Task
Add the mockup as a reference to the task:
```bash
backlog task edit <taskId> --ref backlog/assets/<task-prefix>-<taskId>.jpg
```

## Output Format
- **Location:** `backlog/assets/<task-prefix>-<taskId>.jpg`
- **Format:** JPEG
- **Type:** Full page screenshot

## Validation Checklist
- [ ] Target page identified
- [ ] Screenshot captured successfully
- [ ] File saved to backlog/assets/ with correct naming
- [ ] Mockup linked to task via --ref flag
- [ ] Image is visible and relevant to user story

## Notes
- Only create mockups for **User Stories** (UI-related requirements)
- Use full page screenshots to capture complete context
- Mockup provides baseline for design discussions
- Update mockup if user story requirements change
