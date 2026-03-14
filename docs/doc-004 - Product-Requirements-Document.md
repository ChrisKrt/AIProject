---
id: doc-004
title: Product Requirements Document
type: other
created_date: '2026-02-07 18:15'
updated_date: '2026-02-07 18:22'
---
# 

**About req42**

req42, the framework for collecting, documenting and communicating
requirements.

Created and maintained by Dr. Peter Hruschka, Markus Meuten and
contributors.

Template Revision: 2.0 EN (based on asciidoc), March 2023

© We acknowledge that this document uses material from the req42
framework, <https://req42.de>

:::::: sidebar
::: title
:::

:::: note
::: title
:::

This version of the framework contains help texts and explanations. It
is meant to familiarize yourself with the framework. For your own
documentation better use the *plain* Version.
::::
::::::

# Business Goals {#section-business-goals}

:::::::::: sidebar
::: title
:::

:::: formalpara
::: title
Content
:::

The business objectives of your product development or project. Short
and concise, understandable and transparent for your stakeholders.
::::

:::: formalpara
::: title
Motivation
:::

Goals must be specified and agreed upon to the point where everyone
involved has a clear idea of what is to be accomplished and in what time
frames. Establishing vision and goals guides the team in developing
detailed requirements and avoids fragmentation.
::::

Perhaps your clients gave you rough goals or a vision when they
entrusted you with the role of product owner. Often, however, the
precision of these specifications is not enough to lead a team
systematically to success.

:::: formalpara
::: title
Notations/Tools
:::

A wide variety of means of expression are available for defining goals,
which you can choose according to your mood.
::::

Our recommendation:

- Notation in the form of PAM (Purpose, Advantage, Metric).

Alternative forms of notation:

- Product case

- News from the Future

- Product Canvas

- Value Proposition

There is only one thing you should never do: Work without explicit goals
or visions.
::::::::::

Goal definitions according to PAM:

Goal 1:

Advantage 1:

Metric 1:

Goal 2:

Advantage 2:

Metric 2:

Goal 3:

Advantage 3:

Metric 3:

# Stakeholder {#section-stakeholder}

:::::::::: sidebar
::: title
:::

:::: formalpara
::: title
Content
:::

A (prioritized) list of your stakeholders, along with indications of
where these stakeholders can help (or hinder) the analysis work.
::::

:::: formalpara
::: title
Motivation
:::

Stakeholders are the most important sources for requirements. Therefore,
you should know and document them. You need to know who can help you
with what or hinder you in what way. You need to know who has what
influence - and if opinions differ, you need to mediate or decide.
Without explicitly identified stakeholders, all this is difficult.
::::

<div>

::: title
Notations/Tools
:::

- Tables or lists (simple form)

- Possibly stakeholder map (more complex form)

</div>

Below we have included a simple stakeholder list as an example.

The order \"role before person\" has been chosen deliberately. This
order has proven itself since requirements normally always represent
needs from the perspective of a role, but the person taking on the role
can change during the project.

If required, you can also add further columns (contact data, ...​) - but
consider the effort for their maintenance.
::::::::::

+--------------+---------------------------+---------------+-------------------+
| Role         | Person                    | Topic         | Influence         |
+==============+===========================+===============+===================+
| *\<Role-1\>* | *\<Person-1\>*            | *\<Topic-1\>* | \_\<Influence-1\> |
+--------------+---------------------------+---------------+-------------------+
| *\<Role-2\>* | *\<Person-2\>*            | *\<Topic-2\>* | \_\<Influence-2\> |
+--------------+---------------------------+---------------+-------------------+
|              |                           |               |                   |
+--------------+---------------------------+---------------+-------------------+

# Scope {#section-scope}

:::::::::: sidebar
::: title
:::

:::: formalpara
::: title
Content
:::

Your product with all external interfaces to (human and automated)
neighbors, resp. neighboring systems.
::::

:::: formalpara
::: title
Motivation
:::

Scope is the area that you can influence. The environment of the
product, to which there are certainly many interfaces, represents the
context. The context cannot (usually) be decided by you alone, but can
often be negotiated. To gain clarity it is important to describe both as
much as possible and especially to define the boundary between the two
scopes.
::::

req42 recommends that you start with the business scope and do not limit
the product scope too early. The decision about the product scope should
be a conscious one. Read more about this indispensable topic in the blog
post \"Scope is not equal to Scope\" or in \[2\]. In our courses, you
will practice scope delimitation using a realistic case study.

:::: formalpara
::: title
Notations/Tools
:::

There are many different means of expression for representing scope
delineation, but a good scope delineation makes the interfaces to the
context explicit (e.g., in terms of inputs and outputs, of services
provided and required, ...​).
::::

- Various forms of context diagrams

- Context chart
::::::::::

Insert [???](#Context diagram) or [???](#Context table) here.

Optional: add table with explanations of interfaces:

+------------+-----------------------------------------------------------+
| Interface  | Meaning/Explanation                                       |
| Name       |                                                           |
+============+===========================================================+
| *\<IF-1\>* | *\<Meaning-1\>*                                           |
+------------+-----------------------------------------------------------+
| *\<IF-2\>* | *\<Meaning-2\>*                                           |
+------------+-----------------------------------------------------------+
|            |                                                           |
+------------+-----------------------------------------------------------+

# Product Backlog {#section-product-backlog}

:::::::::: sidebar
::: title
:::

:::: formalpara
::: title
Content
:::

An ordered list of product backlog items (at different levels of
granularity: e.g. epics, features and user stories). Backlog items
should be prioritized (better term: ranked) among each other.
::::

The items with the greatest added value in terms of implementation
effort should be at the top of the backlog to be implemented next.

You have to define explicitly what added value means for you and your
development. The simplest definition is the business added value for the
customer when implementing the requirement.

:::: formalpara
::: title
Motivation
:::

The Scrum Guide defines:
::::

\"The Product Backlog is an ordered list of everything that is known to
be included in the product. It serves as the single source of
requirements for all changes to the product. The Product Owner is
responsible for the Product Backlog, its contents, access to it, and the
order of entries. A Product Backlog is never complete. During its
initial development steps, it identifies the requirements that are
initially known and best understood. The Product Backlog evolves with
the product and its use. It is dynamic; it constantly adapts to make
clear for the product what it needs to be adequate to its task, to
compete, and to provide the required benefits.\"

As long as a product exists, so does its Product Backlog. So you see:
the Product Backlog is really important for successful work as a Product
Owner. But please fill in the other artifacts as well. Your job may not
start with the Product Backlog and it certainly doesn't end with the
Product Backlog.

:::: formalpara
::: title
Notations/Tools
:::

Proven (regardless of granularity) for epics, features and user stories
is the formula:
::::

    As <role> I want <functionality> so that <advantage>.

For the more abstract levels (epics, features), compound nouns may also
be suitable for describing functionality.

Use ALM tools or ticket systems (JIRA or Azure DevOps) or wikis (like
Confluence) to manage your epics, features and stories (linked and
ordered).

A two-dimensional representation of the product backlog in the form of a
story map has proven particularly useful.
::::::::::

EPIC 1: As *\<role\>* I want *\<functionality\>* so that
*\<advantage\>*. *\<optional: Link to models\>*.

FEATURE 1.1: As *\<role\>* I want *\<functionality\>* so that
*\<advantage\>*. *\<optional: Link to models\>*.

STORY 1.1.1: As *\<role\>* I want *\<functionality\>* so that
*\<advantage\>*. *\<optional: Link to models\>*.

STORY 1.1.x.:As *\<role\>* I want *\<functionality\>* so that
*\<advantage\>*. *\<optional: Link to models\>*.

EPIC 2: As *\<role\>* I want *\<functionality\>* so that
*\<advantage\>*. *\<optional: Link to models\>*.

FEATURE 2.1: As *\<role\>* I want *\<functionality\>* so that
*\<advantage\>*. *\<optional: Link to models\>*.

STORY 2.1.1: As *\<role\>* I want *\<functionality\>* so that
*\<advantage\>*. *\<optional: Link to models\>*.

STORY 2.1.2: As *\<role\>* I want *\<functionality\>* so that
*\<advantage\>*. *\<optional: Link to models\>*.

FEATURE 2.2: As *\<role\>* I want *\<functionality\>* so that
*\<advantage\>*. *\<optional: Link to models\>*.

STORY 2.2.1: As *\<role\>* I want *\<functionality\>* so that
*\<advantage\>*. *\<optional: Link to models\>*.

STORY 2.2.2: As *\<role\>* I want *\<functionality\>* so that
*\<advantage\>*. *\<optional: Link to models\>*.

EPIC 3: As *\<role\>* I want *\<functionality\>* so that
*\<advantage\>*. *\<optional: Link to models\>*.

# Supporting Models {#section-suppporting-models}

:::::::::: sidebar
::: title
:::

:::: formalpara
::: title
Content
:::

Any kind of graphical models that facilitate the understanding (of
relationships) of Backlog Items. The diagrams should be linked to items
from the Product Backlog.
::::

:::: formalpara
::: title
Motivation
:::

In the agile world, it has become widespread to write requirements in
the form of epics, features or user stories on little cards or to file
them in equivalent form in tools.
::::

Nevertheless, communication among all stakeholders sometimes becomes
much easier if you also use the tools we have come to know over the last
decades to make the colloquial language more precise. So don't be afraid
to use models if they help communication.

Don't worry: these models don't have to be perfect. But especially with
increasing complexity (loops or case distinctions), a graphical
visualization of the steps of a business process promotes understanding
better than many tickets in the system without recognizable sequences
and dependencies.

<div>

::: title
Notations/Tools
:::

- Flowcharts

- activity diagrams

- BPMN

- state models

- data models

- UI prototypes

- mock-ups

- wireframes

</div>

Simple modeling tools like Gliffy, Diagrams.Net (formerly DrawIO),
...​...​, or DSLs like PlantUML, Kroki, ...​ or UML modeling tools like
Enterprise Architect, Visual Paradigm, MagicDraw are suitable for
creating the models. The models should be linked to your backlog items
(in both directions)
::::::::::

*\<Diagram Title 1:\>*. *\<insert diagram and explanations here \>*
*\<optional: Link to Epics, Features or Stories\>*

*\<Diagram Title 2:\>*. *\<insert diagram and explanations here \>*
*\<optional: Link to Epics, Features or Stories\>*

*\<Diagram Title 3:\>*. *\<insert diagram and explanations here \>*
*\<optional: Link to Epics, Features or Stories\>*

    .
    .
    .

*\<Diagram Title n:\>*. *\<insert diagram and explanations here \>*
*\<optional: Link to Epics, Features or Stories\>*

# Quality Requirements {#section-quality-requirements}

:::::::::: sidebar
::: title
:::

:::: formalpara
::: title
Content
:::

Quality requirements are the \"how\" to the \"what\" - qualitative
definitions or precisions of the functional requirements.
::::

:::: formalpara
::: title
Motivation
:::

Our experience shows: Quality requirements are (unfortunately) still
severely underestimated, not only in the agile world. Everyone wants
good quality products and services, but only a few make it explicit what
exactly is meant by this.
::::

Some quality requirements (such as response times) can perhaps be
integrated directly into a story (or added as an acceptance criterion).
However, the vast majority of quality requirements relate to many, if
not all, of the functional requirements in the product backlog.

Therefore, as a product owner, you need somewhere to specify and assign
the desired qualities of your products and services. For this activity,
industry-proven checklists (such as ISO 25010 and others) are available
to help you quickly identify and manage the most important categories.

:::: formalpara
::: title
Notations/Tools
:::

Simple textual scenarios, possibly structured according to the sections
of Q42, or the ISO 25010 quality tree, or according to VOLERE.
::::
::::::::::

*\< quality requirement or scenario 1\>* : *\<Link to functional
requirements or scope for this quality \>*

*\< quality requirement or scenario 2\>* : *\<Link to functional
requirements or scope for this quality \>*

*\< quality requirement or scenario 3\>* : *\<Link to functional
requirements or scope for this quality \>*

    .
    .
    .

*\< quality requirement or scenario n\>* : *\<Link to functional
requirements or scope for this quality \>*

# Constraints {#section-constraints}

:::::::::: sidebar
::: title
:::

:::: formalpara
::: title
Content
:::

Technological or organizational (mandated) constraints for the
development process, such as mandatory activities, prescribed documents
and their content, milestones to be met, ...​
::::

:::: formalpara
::: title
Motivation
:::

Such constraints are also requirements. And since they often apply to
several or even all functional requirements, they are difficult to
accommodate in the ordered product backlog. Just make sure that all
stakeholders know these constraints and have access to them when needed.
::::

:::: formalpara
::: title
Form
:::

Simple lists, possibly organized by category.
::::
::::::::::

## Organizational Constraints {#_organizational_constraints}

- *\<OrgConstraint1\>*

- *\<OrgConstraint2\>*

- *\<OrgContraint3\>*

## Technical Constraints {#_technical_constraints}

- *\<TechConstraint1\>*

- *\<TechConstraint2\>*

- *\<TechContraint3\>*

# Domain Terminology {#section-domain-terminology}

:::::::::: sidebar
::: title
:::

:::: formalpara
::: title
Content
:::

A glossary of technical terms with definitions. The \"ubiquitous
language\" of your domain
::::

:::: formalpara
::: title
Motivation
:::

Terms from your domain appear in every epic, feature, or story. These
terms should be clear to everyone involved. And that's why it is
desirable to have a glossary of such terms for a project or product
development.
::::

Make sure that everyone involved speaks a common language - and has
access to agreed-upon definitions of terms instead of bringing new words
into play in every meeting.

:::: formalpara
::: title
Notations/Tools
:::

Alphabetically ordered list of term definitions
::::
::::::::::

+--------------+---------------------------------------------------------+
| Term         | Definition                                              |
+==============+=========================================================+
| *\<Term-1\>* | *\<Definition-1\>*                                      |
+--------------+---------------------------------------------------------+
| *\<Term-2\>* | *\<Definition-2\>*                                      |
+--------------+---------------------------------------------------------+
|              |                                                         |
+--------------+---------------------------------------------------------+

# Assets {#section-assets}

:::::::::: sidebar
::: title
:::

:::: formalpara
::: title
Content
:::

Under assets we summarize everything that your sponsors or clients give
you to enable you as a product owner (together with your team) to do
your job successfully.
::::

Assets definitely include time and budget, i.e., resources they give you
to do your job. You may have to get your team with these resources
yourself, or they may also provide you with staff (your team),
workspace, infrastructure, etc.

:::: formalpara
::: title
Motivation
:::

If you take on the job as a product owner you have to negotiate these
assets with your sponsor or client and certainly in the end also account
for their use (through hopefully successful results).
::::

In any case, you should know what you have at your disposal in terms of
money, personnel, time, infrastructure, ...​ at your disposal. These
assets are an essential boundary condition for your work as a product
owner.

:::: formalpara
::: title
Notations/Tools
:::

Simple lists or tables
::::
::::::::::

## Budget {#_budget}

(possibly structured according to roadmap or intermediate goals, or
divided into personnel budget, material budget, ...​)

## Time frame/final date {#_time_framefinal_date}

## Team members {#_team_members}

(simple enumeration of team members for small team. Or a link to complex
team structure in section 10).

## External resources {#_external_resources}

# Teams {#section-teams}

:::::::::: sidebar
::: title
:::

:::: formalpara
::: title
Content
:::

This section can be omitted for small product developments with only one
development team, since the team members are already listed in the
previous section.
::::

For scaled large products, the organization chart of your teams should
be here and an assignment to the topics (e.g. epics, features, ...​) this
team is responsible for.

:::: formalpara
::: title
Motivation
:::

If you have more than one team at your disposal, it goes without saying
that you should have an overview of who works in which (sub-)team and
how these teams are organized.
::::

The focus should be on (sub-)teams being organized in such a way that
they can deliver functions/features or partial products as independently
as possible without having to constantly coordinate with everyone else.

:::: formalpara
::: title
Notations/Tools
:::

Lists of teams (each with assigned people and assigned topics from the
roadmap or from the product backlog (e.g., epics or features).
::::
::::::::::

+--------------+---------------------------+---------------------------+
| Team         | Team Members              | Feature                   |
+==============+===========================+===========================+
| *\<Team-1\>* | PO: *\<Person-1\>*        | *\<Feature-A\>*           |
+--------------+---------------------------+---------------------------+
|              | *\<Team member-2\>*       |                           |
+--------------+---------------------------+---------------------------+
|              | *\<Team member-3\>*       |                           |
+--------------+---------------------------+---------------------------+
|              |                           |                           |
+--------------+---------------------------+---------------------------+
| *\<Team-2\>* | PO\_\<Person-2\>\_        | *\<Feature-B\>*           |
+--------------+---------------------------+---------------------------+
|              | *\<Team member-2\>*       |                           |
+--------------+---------------------------+---------------------------+
|              |                           |                           |
+--------------+---------------------------+---------------------------+

# Roadmap {#section-roadmap}

:::::::::: sidebar
::: title
:::

:::: formalpara
::: title
Content
:::

\"Delivery artifacts put on the timeline\" - who delivers what and when?
::::

:::: formalpara
::: title
Motivation
:::

Agile projects also need a plan. The more distant a goal is, the less
precise the plan can be. The closer, the more precise.
::::

An explicitly known roadmap enables all participants to coordinate with
each other and to think along with each other, and therefore to take
into account what is still to come in the medium term when making
short-term decisions.

If you only live from hand to mouth, you may unknowingly make short-term
decisions that are contrary to longer-term product success. In our
courses we show you how rough or fine a roadmap can, may or should be.

:::: formalpara
::: title
Notations/Tools
:::

Whatever you have in use as a planning tool or which allows you to
present, if possible on one page, an appropriate overview over a longer
period of time.
::::
::::::::::

*\< Insert your planning here\>*

# Risks & Assumptions {#section-risks-assumptions}

:::::::::: sidebar
::: title
:::

:::: formalpara
::: title
Content
:::

(Prioritized) lists of risks you have identified and a list of
assumptions you have made as a basis for decisions.
::::

:::: formalpara
::: title
Motivation
:::

\"Risk management is project management for adults\" says Tim Lister of
the Atlantic Systems Guild\".
::::

With this in mind, you should keep your risks under control as a product
owner.

req42 provides you with the means to consciously manage risks.
Especially when prioritizing your requirements you should balance
business value and risk reduction.

:::: formalpara
::: title
Notations/Tools
:::

Simple tables or lists are often already sufficient.
::::
::::::::::

## Risks {#_risks}

  ------------------------------------------------------------------------------
  Id      Text                    Probability   Damage   Possible Measures
                                                Amount   
  ------- ----------------------- ------------- -------- -----------------------
                                                         

                                                         
  ------------------------------------------------------------------------------

## Assumptions {#_assumptions}

  -----------------------------------------------------------------------
  Id          Text
  ----------- -----------------------------------------------------------
              

              
  -----------------------------------------------------------------------
