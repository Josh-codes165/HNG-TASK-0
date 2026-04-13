function getTimeRemaining() {
  const dueDate = new Date("2026-04-20T18:00:00");
  const now = new Date();
  const diff = dueDate - now;

  const minutes = Math.floor(Math.abs(diff) / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (diff < 0) {
    if (hours < 1) return "Overdue by " + minutes + " minutes";
    if (days < 1) return "Overdue by " + hours + " hours";
    return "Overdue by " + days + " days";
  } else {
    if (days === 1) return "Due tomorrow";
    if (days > 1) return "Due in " + days + " days";
    if (hours > 0) return "Due in " + hours + " hours";
    return "Due now";
  }
}

const timeEl = document.getElementById("time-remaining");
timeEl.textContent = getTimeRemaining();
setInterval(() => {
  timeEl.textContent = getTimeRemaining();
}, 60000);

// ── Checkbox ──
const checkbox = document.getElementById("complete-toggle");
const title = document.getElementById("task-title");
const status = document.getElementById("status-badge");

checkbox.addEventListener("change", () => {
  const title = document.getElementById("task-title");
  const status = document.getElementById("status-badge");
  if (checkbox.checked) {
    title.style.textDecoration = "line-through";
    title.style.color = "#999";
    status.textContent = "Done";
    status.style.background = "#eaf3de";
    status.style.color = "#3b6d11";
  } else {
    title.style.textDecoration = "none";
    title.style.color = "#1a1a1a";
    status.textContent = "In Progress";
    status.style.background = "#E6F1FB";
    status.style.color = "#185FA5";
  }
});

// ── Delete Button ──
const deleteBtn = document.querySelector(
  '[data-testid="test-todo-delete-button"]',
);
const card = document.querySelector('[data-testid="test-todo-card"]');

deleteBtn.addEventListener("click", () => {
  const confirmed = confirm("Delete this task?");
  if (confirmed) {
    card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    card.style.opacity = "0";
    card.style.transform = "scale(0.97)";
    setTimeout(() => card.remove(), 300);
  }
});

// ── Edit Button ──
const editBtn = document.querySelector('[data-testid="test-todo-edit-button"]');
const description = document.querySelector(
  '[data-testid="test-todo-description"]',
);

editBtn.addEventListener("click", () => {
  const isEditing = editBtn.textContent === "Save";

  const title = document.getElementById("task-title");
  const description = document.querySelector(
    '[data-testid="test-todo-description"]',
  );

  if (!isEditing) {
    // Switch title to input
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.value = title.textContent.trim();
    titleInput.id = "edit-title-input";
    titleInput.style.cssText = `
      font-size: 16px;
      font-weight: 600;
      font-family: inherit;
      border: 1.5px solid #B5D4F4;
      border-radius: 6px;
      padding: 4px 8px;
      width: 100%;
      outline: none;
      color: #1a1a1a;
      margin-bottom: 6px;
    `;
    title.replaceWith(titleInput);
    titleInput.focus();

    // Switch description to textarea
    const descTextarea = document.createElement("textarea");
    descTextarea.value = description.textContent.trim();
    descTextarea.id = "edit-desc-textarea";
    descTextarea.rows = 2;
    descTextarea.style.cssText = `
      font-size: 13px;
      font-family: inherit;
      border: 1.5px solid #B5D4F4;
      border-radius: 6px;
      padding: 4px 8px;
      width: 100%;
      outline: none;
      color: #666;
      resize: none;
      line-height: 1.6;
    `;
    description.replaceWith(descTextarea);

    editBtn.textContent = "Save";
    editBtn.style.background = "#eaf3de";
    editBtn.style.color = "#3b6d11";
    editBtn.style.borderColor = "#C0DD97";
  } else {
    // Read values back
    const titleInput = document.getElementById("edit-title-input");
    const descTextarea = document.getElementById("edit-desc-textarea");

    // Restore title h2
    const newTitle = document.createElement("h2");
    newTitle.id = "task-title";
    newTitle.setAttribute("data-testid", "test-todo-title");
    newTitle.textContent = titleInput.value.trim() || "Untitled Task";
    titleInput.replaceWith(newTitle);

    // Restore description p
    const newDesc = document.createElement("p");
    newDesc.setAttribute("data-testid", "test-todo-description");
    newDesc.textContent = descTextarea.value.trim();
    descTextarea.replaceWith(newDesc);

    editBtn.textContent = "Edit";
    editBtn.style.background = "#E6F1FB";
    editBtn.style.color = "#185FA5";
    editBtn.style.borderColor = "#B5D4F4";
  }
});
