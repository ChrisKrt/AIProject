---
name: write-adr
description: Create concise Architecture Decision Records (ADRs) using Backlog.md that fit on one DIN A4 page
---

# Skill: Write Architecture Decision Record

## Purpose
-------
This skill explains how to create concise Architecture Decision Records (ADRs) using the Backlog.md system (MCP server). Every ADR must fit on one DIN A4 page when printed.

When to use
-----------
- For important, non-trivial architectural choices that affect design, operations, or long-term maintenance.

One-page constraint (DIN A4)
----------------------------
- Aim for a single printed A4 page in a standard document viewer with default 1" (2.54 cm) margins and 11–12 pt sans-serif font.
- Recommended maximum: ~500 words (about 3000 characters). Prefer brevity: use short paragraphs and bullet lists.
- Avoid large code samples or big diagrams. Link to external docs/references instead.

ADR structure (strict, in-order)
--------------------------------
Keep headings short. Use the exact order below to maximize readability and fit on one page.

1. Title — ADR-XXX - short, specific (one line)
2. Status — Proposed | Accepted | Rejected | Deprecated
3. Date — YYYY-MM-DD
4. Context — 1–3 short paragraphs or a few bullets explaining the problem and constraints
5. Decision — The selected approach in one concise paragraph (1–3 sentences)
6. Consequences — Bulleted list of the immediate and long-term consequences (keep short)
7. Alternatives Considered — 1–4 bullets, each a short label plus 1-line rationale
8. Authors — names and roles
9. References — 1-line links or backlog references (do not paste long content)

Compact ADR template (fill in and keep concise)
------------------------------------------------
Title: ADR-XXX - <short-descriptive-title>

Status: <Accepted|Proposed|Rejected|Deprecated>

Date: <YYYY-MM-DD>

Context:
- <one-line summary of context or constraint>
- <optional supporting bullet, if needed>

Decision:
- <one clear sentence describing the decision; add one short follow-up sentence if necessary>

Consequences:
- <bullet 1 — concise>
- <bullet 2 — concise>

Alternatives Considered:
- <Alt A>: <1-line reason accepted/not chosen>
- <Alt B>: <1-line reason>

Authors:
- <Name> — <role>

References:
- <short link or backlog id>

Backlog.md MCP usage (agent instructions)
---------------------------------------
- Always create ADRs via the Backlog.md CLI or MCP server; do not edit backlog decision files directly.
- Preferred location: backlog/decisions/ (or the project’s configured decisions/docs area).

If using the MCP server API (programmatic / agent): call the document-create endpoint with the ADR content as the document body. Example payload concept (pseudo-JSON):

{
  "title": "<short-descriptive-title>",
  "content": "---\nTitle: <title>\nStatus: <status>\nDate: <date>\n\nContext:\n- ...\n\nDecision:\n- ...\n\nConsequences:\n- ...\n\nAlternatives Considered:\n- ...\n\nAuthors:\n- ...\n\nReferences:\n- ...\n"
}

Notes and tips for staying one-page
----------------------------------
- Use short sentences and bullets; avoid deep nesting.
- Prefer links to large diagrams; include a single small, inline ASCII or compact diagram only if essential.
- If a point cannot be expressed in one line, move it to a linked reference and summarize here.
- If an ADR grows beyond one page, split it: keep a short decision ADR and create supporting design documents for details.

Workflow checklist for the agent
-------------------------------
1. Draft ADR using the template, keeping content <= ~500 words.
2. Run the Backlog.md CLI or MCP server call to create a new decision document (use document creation API/command).
3. Add a short implementation/notes link in the ADR References to detailed docs (if needed).
4. Share the ADR link or backlog id with stakeholders for review; update Status when agreed.

Examples
--------
- Example title: "ADR-001 - Use AWS S3 for long-term logs retention"
- Status: Proposed
- Date: 2026-02-07
- Context: Services produce high-volume logs; retention required for 7 years for compliance.
- Decision: Store compressed logs in AWS S3 Standard-IA and lifecycle to Glacier after 90 days.
- Consequences: Lower storage cost, retrieval latency for old logs, need IAM policy for cross-account access.
- Alternatives Considered: On-prem NAS (expensive), Managed logging SaaS (costly)

End.
