const card = document.querySelector('[data-testid="test-todo-card"]');
const checkbox = document.getElementById("complete-toggle");
const taskTitle = document.getElementById("task-title");
const taskDesc = document.getElementById("task-description");
const statusBadge = document.getElementById("status-badge");
const statusControl = document.getElementById("status-control");
const priorityBadge = document.getElementById("priority-badge");
const priorityDot = document.getElementById("priority-indicator");
const timeEl = document.getElementById("time-remaining");
const overdueEl = document.getElementById("overdue-indicator");
const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const deleteBtn = document.querySelector(
  '[data-testid="test-todo-delete-button"]',
);
const editForm = document.getElementById("edit-form");
const saveBtn = document.querySelector('[data-testid="test-todo-save-button"]');
const cancelBtn = document.querySelector(
  '[data-testid="test-todo-cancel-button"]',
);
const collapsible = document.getElementById("collapsible-section");
const expandToggle = document.getElementById("expand-toggle");

// ─────────────────────────────────────────
// 2. STATE VARIABLES
// These are the card's "memory"
// ─────────────────────────────────────────

let currentStatus = "In Progress";
let currentPriority = "High";
let isExpanded = false;
let dueDate = new Date("2026-04-20T18:00:00");
let timerInterval = null; // holds our setInterval so we can stop it later

// ─────────────────────────────────────────
// 3. STATUS FUNCTION
// One function that updates EVERYTHING related to status
// ─────────────────────────────────────────

function applyStatus(newStatus) {
  currentStatus = newStatus; // update our memory

  statusControl.value = newStatus;

  checkbox.checked = newStatus === "Done";

  statusBadge.textContent = newStatus;

  if (newStatus === "Done") {
    statusBadge.style.background = "#eaf3de";
    statusBadge.style.color = "#3b6d11";
    statusBadge.style.borderColor = "#c0dd97";
    taskTitle.style.textDecoration = "line-through";
    taskTitle.style.color = "#aaa";
    stopTimer(); // stop the countdown when done
  } else if (newStatus === "In Progress") {
    statusBadge.style.background = "#e6f1fb";
    statusBadge.style.color = "#185fa5";
    statusBadge.style.borderColor = "#b5d4f4";
    taskTitle.style.textDecoration = "none";
    taskTitle.style.color = "#1a1a1a";
    startTimer(); // make sure timer is running
  } else {
    // Pending
    statusBadge.style.background = "#faeeda";
    statusBadge.style.color = "#633806";
    statusBadge.style.borderColor = "#fac775";
    taskTitle.style.textDecoration = "none";
    taskTitle.style.color = "#1a1a1a";
    startTimer();
  }
}

// ─────────────────────────────────────────
// 4. PRIORITY FUNCTION
// Updates the badge text and the colored dot
// ─────────────────────────────────────────
function applyPriority(newPriority) {
  currentPriority = newPriority;

  // Update text
  priorityBadge.textContent = newPriority;

  // Update aria label
  priorityBadge.setAttribute("aria-label", "Priority: " + newPriority);

  // Update DOT
  priorityDot.classList.remove(
    "priority-low",
    "priority-medium",
    "priority-high",
  );
  priorityDot.classList.add("priority-" + newPriority.toLowerCase());

  // 🔥 Update BADGE color
  priorityBadge.classList.remove("badge-low", "badge-medium", "badge-high");
  priorityBadge.classList.add("badge-" + newPriority.toLowerCase());
}

// ─────────────────────────────────────────
// 5. TIME / OVERDUE FUNCTIONS
// ─────────────────────────────────────────

function getTimeRemaining() {
  // If the task is done, stop showing a countdown
  if (currentStatus === "Done") {
    return "Completed";
  }

  const now = new Date();
  const diff = dueDate - now; // milliseconds between now and due date

  const totalMinutes = Math.floor(Math.abs(diff) / 1000 / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const remMinutes = totalMinutes % 60; // leftover minutes after extracting hours

  if (diff < 0) {
    // OVERDUE — show the overdue indicator
    overdueEl.classList.remove("hidden");

    if (totalMinutes < 60) return "Overdue by " + totalMinutes + " min";
    if (totalHours < 24)
      return "Overdue by " + totalHours + "h " + remMinutes + "m";
    return "Overdue by " + totalDays + " days";
  } else {
    // NOT overdue — hide the overdue indicator
    overdueEl.classList.add("hidden");

    if (totalDays >= 2) return "Due in " + totalDays + " days";
    if (totalDays === 1) return "Due tomorrow";
    if (totalHours >= 1)
      return "Due in " + totalHours + "h " + remMinutes + "m";
    if (totalMinutes > 0) return "Due in " + totalMinutes + " min";
    return "Due now";
  }
}

function updateTime() {
  timeEl.textContent = getTimeRemaining();
}

function startTimer() {
  // Only start if not already running
  if (timerInterval) return;
  updateTime(); // run immediately
  timerInterval = setInterval(updateTime, 30000); // then every 30 seconds
}

function stopTimer() {
  clearInterval(timerInterval); // cancel the interval
  timerInterval = null; // reset to null so startTimer works again later
  timeEl.textContent = "Completed";
}

// ─────────────────────────────────────────
// 6. EDIT MODE
// ─────────────────────────────────────────

function openEditMode() {
  // Pre-fill form inputs with current card values
  document.getElementById("edit-title-input").value =
    taskTitle.textContent.trim();
  document.getElementById("edit-desc-input").value =
    taskDesc.textContent.trim();
  document.getElementById("edit-priority-select").value = currentPriority;
  document.getElementById("edit-due-date-input").value = dueDate
    .toISOString()
    .slice(0, 16);

  editForm.classList.remove("hidden");

  // Change Edit button label so user knows they're in edit mode
  editBtn.textContent = "Editing...";
  editBtn.disabled = true; // prevent double-clicking into edit mode

  document.getElementById("edit-title-input").focus();
}

function closeEditMode() {
  editForm.classList.add("hidden");
  editBtn.textContent = "Edit";
  editBtn.disabled = false;
  editBtn.focus();
}

function saveEdit() {
  const newTitle = document.getElementById("edit-title-input").value.trim();
  const newDesc = document.getElementById("edit-desc-input").value.trim();
  const newPriority = document.getElementById("edit-priority-select").value;
  const newDueInput = document.getElementById("edit-due-date-input").value;

  // Update the display
  taskTitle.textContent = newTitle || "Untitled Task"; // fallback if blank
  taskDesc.textContent = newDesc;

  // Update due date (convert the input string back to a Date object)
  if (newDueInput) {
    dueDate = new Date(newDueInput);
    updateTime(); 
  }

  applyPriority(newPriority); // update dot + badge

  checkExpandNeeded();

  closeEditMode();
}

// ─────────────────────────────────────────
// 7. EXPAND / COLLAPSE
// ─────────────────────────────────────────

function checkExpandNeeded() {
  
  const needsToggle = collapsible.scrollHeight > 60;

  if (needsToggle) {
    expandToggle.classList.remove("hidden"); // show the toggle button
  } else {
    expandToggle.classList.add("hidden"); // hide it if not needed
    collapsible.classList.remove("collapsed");
    collapsible.classList.add("expanded"); // always show full content
  }
}

function toggleExpand() {
  isExpanded = !isExpanded; 

  if (isExpanded) {
    collapsible.classList.remove("collapsed");
    collapsible.classList.add("expanded");
    expandToggle.textContent = "Show less";
    expandToggle.setAttribute("aria-expanded", "true");
  } else {
    collapsible.classList.remove("expanded");
    collapsible.classList.add("collapsed");
    expandToggle.textContent = "Show more";
    expandToggle.setAttribute("aria-expanded", "false");
  }
}

// ─────────────────────────────────────────
// 8. EVENT LISTENERS
// Wire everything together
// ─────────────────────────────────────────

// Checkbox → status sync
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    applyStatus("Done");
  } else {
    applyStatus("Pending"); // acceptable based on spec
  }
});

// Status dropdown → status sync
statusControl.addEventListener("change", () => {
  applyStatus(statusControl.value);
  // Just pass the selected value into our applyStatus function
});

// Edit button
editBtn.addEventListener("click", openEditMode);

// Save button
saveBtn.addEventListener("click", (e) => {
  e.preventDefault(); // 🔥 prevents reload
  saveEdit();
});

// Cancel button
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closeEditMode();
});

// Expand toggle
expandToggle.addEventListener("click", toggleExpand);

// Delete button (kept from Stage 0)
deleteBtn.addEventListener("click", () => {
  if (confirm("Delete this task?")) {
    card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    card.style.opacity = "0";
    card.style.transform = "scale(0.97)";
    setTimeout(() => card.remove(), 300);
  }
});

// ─────────────────────────────────────────
// 9. INITIALIZE — run this when page loads
// ─────────────────────────────────────────

applyStatus(currentStatus); // set initial status
applyPriority(currentPriority); // set initial priority dot
startTimer(); // start the countdown
checkExpandNeeded(); // check if description needs a toggle
