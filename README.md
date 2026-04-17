✅ Todo Card — Stage 1

A polished, fully interactive todo item card built with semantic HTML, CSS, and vanilla JavaScript. No frameworks. No dependencies. Just clean, well-structured frontend code.

Live Demo →

✨ What's New in Stage 1

Stage 1 significantly expanded the card's interactivity and state management on top of the Stage 0 foundation:
Status dropdown control — change task status between Pending, In Progress, and Done directly on the card
Priority system — three levels (Low, Medium, High) each with a colored dot indicator and matching badge
Full edit mode — edit the title, description, priority, and due date via an inline form that pre-fills with current values

Collapsible description — long descriptions collapse to ~2 lines with a "Show more / Show less" toggle, shown only when needed

Overdue detection — card automatically detects when the due date has passed and surfaces an "Overdue" badge
Smarter countdown — timer updates every 30 seconds and formats intelligently (minutes → hours → days)
Checkbox ↔ status sync — checking the box sets status to Done; unchecking reverts to Pending — both stay in sync
Smooth delete animation — card fades and scales out before being removed from the DOM

🧩 Full Feature List
Feature
Details
Priority indicator
Dot + badge, three levels: Low / Medium / High
Live countdown
Updates every 30s — shows minutes, hours, or days
Overdue badge
Appears automatically when due date has passed
Status control
Dropdown synced with checkbox and status badge
Checkbox
Marks Done, strikes through title, stops timer
Edit mode
Inline form — edits title, description, priority, due date
Expand / Collapse
Toggle for long descriptions, hidden when not needed
Delete
Confirmation dialog + fade-out animation
Accessibility
aria-label, aria-live, aria-expanded, keyboard navigable
Responsive
Wraps cleanly at 480px and below

🗂️ Project Structure
todo-card/
├── index.html    # Semantic markup with all data-testid attributes
├── style.css     # All visual styling and responsive rules
└── script.js     # State management, event listeners, DOM logic

🧪 Test IDs Reference
Every interactive and content element carries a data-testid for automated testing:
Element
data-testid
Card root
test-todo-card
Card heading
test-todo-name
Task title
test-todo-title
Task description
test-todo-description
Complete checkbox
test-todo-complete-toggle
Priority dot
test-todo-priority-indicator
Priority badge
test-todo-priority
Status badge
test-todo-status
Status dropdown
test-todo-status-control
Due date
test-todo-due-date
Time remaining
test-todo-time-remaining
Overdue indicator
test-todo-overdue-indicator
Tags list
test-todo-tags
Tag — Work
test-todo-tag-work
Tag — Urgent
test-todo-tag-urgent
Tag — Design
test-todo-tag-design
Tag — Mobile
test-todo-tag-mobile
Collapsible section
test-todo-collapsible-section
Expand toggle
test-todo-expand-toggle
Edit button
test-todo-edit-button
Delete button
test-todo-delete-button
Edit form
test-todo-edit-form
Edit — title input
test-todo-edit-title-input
Edit — description input
test-todo-edit-description-input
Edit — priority select
test-todo-edit-priority-select
Edit — due date input
test-todo-edit-due-date-input
Save button
test-todo-save-button
Cancel button
test-todo-cancel-button

🚀 Getting Started
No build step. No install. Just open and go.
git clone https://github.com/Josh-codes165/todo-card.git
cd todo-card
open index.html

💡 For Google Fonts to load correctly, serve with a local server:
npx serve .
# or
python -m http.server 8000
🎨 Design System
Typography — DM Sans for UI text; DM Mono for the time remaining badge — monospace rendering prevents layout shift as digits change.
Palette
Role
Color
Background
#f5f5f5
Card surface
#ffffff
Primary text
#1a1a1a
Accent gradient
#e24b4a → #ef9f27
High priority
#e24b4a
Medium priority
#ef9f27
Low priority
#639922
Border
#e0e0e0 (0.5px)

🔧 Key Implementation Decisions
Single applyStatus() function — rather than scattering status logic across multiple listeners, one function handles every status-related DOM update (badge color, checkbox state, title strikethrough, timer start/stop) to keep state predictable and easy to debug.
scrollHeight for expand detection — instead of hardcoding a character count, the expand toggle checks the actual rendered height of the description against a 60px threshold. This means the toggle only appears when the content genuinely overflows, regardless of font size or screen width.

timerInterval guard — startTimer() checks if an interval is already running before creating a new one, preventing duplicate intervals from stacking if status changes rapidly.

Pre-filled edit form — when edit mode opens, all inputs are populated from the live DOM values. This avoids maintaining a separate data object and keeps the source of truth in the rendered card itself.

0.5px borders — keeps the card light and modern. Standard 1px borders felt too heavy against the minimal layout.
translateY(-1px) on hover + scale(0.97) on active — gives buttons tactile feedback without a shadow or color change, keeping interactions snappy.

Gradient accent bar via ::before — the red-to-amber top bar is a pseudo-element, adding strong visual identity without polluting the HTML structure.

♿ Accessibility
All interactive elements have descriptive aria-label attributes

Time remaining and overdue indicator use aria-live="polite" for screen reader announcements
Expand toggle uses aria-expanded and aria-controls to communicate state
Custom checkbox is fully keyboard operable and retains native focus behaviour
WCAG AA colour contrast maintained across all badge and text combinations
Semantic elements throughout — <article>, <time>, <ul>
🛠️ Tech Stack
HTML5 — semantic structure, ARIA attributes, data-testid hooks
CSS3 — flexbox, CSS transitions, pseudo-elements, responsive media queries
Vanilla JavaScript — DOM manipulation, setInterval, event listeners, state management

👤 Author
Joshua Okoronkwo
Frontend Developer · Web3 Enthusiast · FUTO
Built with 💛 — pure HTML, CSS & JavaScript. Zero frameworks.

