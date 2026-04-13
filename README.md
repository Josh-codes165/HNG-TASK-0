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

## Accessibility

- All interactive elements have `aria-label`
- Checkbox has a visible label in the DOM
- Time remaining uses `aria-live="polite"`
- WCAG AA colour contrast
- Fully keyboard navigable
