# App brief

This brief describes the first version of the app. Change it when your team decides something new; the agent follows it. Unfilled points are not requirements; the agent should ask about missing details needed for implementation.

## App name

Job Hunt Board

## User and problem

- Who will use it? Someone looking for a job in tech.
- What problem does it solve? Many applications at different stages are hard to keep track of.

## Main user journey

The user adds an application card with company and role, moves it through the columns Wishlist, Applied, Interview and Offer, and deletes it when it is no longer relevant.

## Must-have features

1. Add a card with company and role. New cards start in Wishlist.
2. Move a card to the next or previous column.
3. Delete a card.
4. Search applications by company or role and filter by stage; combine both controls and clear them.

## Additional rules

- Explain every change in at most three sentences.
- Keep every component file under 100 lines.

## Demo acceptance criteria

- Given the empty board, when the user adds "Example GmbH – Junior Developer", then the card appears in Wishlist.
- Given a card in Applied, when the user moves it forward, then it appears in Interview and no longer in Applied.
- Given several cards, when the user deletes one, then only that card disappears.

## Sample data

Fictional companies and roles only, for example "Example GmbH – Junior Developer".

## Out of scope

- Keeping cards after a page reload
- Notes and dates per card
- Level-ups from README.md, until the team adds them to this brief

## Explicit overrides

The participant requested search and filtering, bringing these features into scope.

- Drag and drop (requested by the participant): cards can be dragged to any column. The Back and Forward buttons stay for keyboard and touch users.

When an override is requested, replace "None" with the specific participant decision and its scope. Only record decisions actually requested or approved by the participant; the agent must not propose alternative stacks or excluded features proactively.

## Project decisions

- Write one line per work loop in `LOOP_LOG.md`, recording the prompt, what happened, and what changed afterwards.
- Search ignores letter case and surrounding spaces; the stage filter defaults to all stages.
