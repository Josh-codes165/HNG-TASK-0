# Todo Card — Stage 0

A clean, accessible todo item card built with HTML, CSS, and vanilla JavaScript.

## Features

- Priority badge (Low / Medium / High)
- Live time remaining that updates every 60 seconds
- Checkbox to mark task as complete — strikes through the title and updates status
- Edit button to update the title and description inline
- Delete button with confirmation
- Fully keyboard navigable and screen-reader accessible

## Tech Stack

- HTML5 (semantic elements — `article`, `time`, `ul`)
- CSS3 (custom properties, flexbox, responsive layout)
- Vanilla JavaScript (no frameworks)

## How to Run

Just open `index.html` in your browser — no install or build step needed.

## Live Demo

[https://todocard-silk.vercel.app/](#) <!-- replace with your Vercel/Netlify URL -->

## Decisions Made While Building

- **Red-to-amber accent bar** — used a CSS `::before` pseudo-element on the card to add a 3px gradient bar at the top, giving the card a strong visual identity without adding extra HTML
- **Custom checkbox** — stripped the default browser checkbox with `appearance: none` and rebuilt it from scratch using `::after` for the checkmark, keeping full keyboard and accessibility support
- **DM Mono for time remaining** — the time badge uses a monospace font specifically so the text doesn't shift width as the countdown updates
- **`flex-wrap` on tags and badges** — both the meta row and tags list wrap naturally so long content never breaks the layout on small screens
- **0.5px borders throughout** — kept borders subtle at 0.5px so the card feels light and modern rather than heavy
- **Transition on button hover** — buttons lift slightly with `translateY(-1px)` on hover and scale down on active to give tactile feedback
- **Edit swaps DOM elements** — when editing, the `h2` and `p` are replaced with an `input` and `textarea` directly, then swapped back on save, keeping the structure clean


## Accessibility

- All interactive elements have `aria-label`
- Checkbox has a visible label in the DOM
- Time remaining uses `aria-live="polite"`
- WCAG AA colour contrast
- Fully keyboard navigable
