---
name: edit-glossary
description: Edit and maintain glossary entries via Backlog.md
---

# Skill: Edit Glossary

When refining a ProduCt Backlog item, you may need to add or update glossary entries to clarify domain-specific terms. This skill guides you through editing the glossary section of the architecture documentation using Backlog.md.

## Steps
1. View current glossary:
   ```bash
   backlog document view doc-005 --plain
   ```
2. Identify the term to edit or add a new term in the glossary section.
3. Edit the glossary entry in the document:
    ```markdown
    ## <First Letter of Term>
  
    ### <Term Name>
    <Definition of the term>
    ```
4. Save changes to the document.
5. The updated glossary will now be available for reference in all documentation and communication.

## Output Format
- **Location:** `backlog/docs/doc-005 - Glossary-Ubiquitous-Language.md`
- **Format:** Markdown
- **Content:** Updated glossary entries with consistent formatting and definitions.

## Validation Checklist
- [ ] Glossary entry added or updated with clear definition
- [ ] Entry follows the alphabetical structure of the glossary
- [ ] Changes saved to the correct document in Backlog.md
