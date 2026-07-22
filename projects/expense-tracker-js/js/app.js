import { CATEGORIES, calculateSummary, filterTransactions, formatMoney, validateTransaction } from "./transaction-utils.js";

const STORAGE_KEY = "ledgerly-transactions-v1";
const elements = {
  form: document.querySelector("#transaction-form"), id: document.querySelector("#transaction-id"),
  description: document.querySelector("#description"), amount: document.querySelector("#amount"),
  category: document.querySelector("#category"), date: document.querySelector("#date"),
  list: document.querySelector("#transaction-list"), search: document.querySelector("#search"),
  typeFilter: document.querySelector("#type-filter"), categoryFilter: document.querySelector("#category-filter"),
  formTitle: document.querySelector("#form-title"), submit: document.querySelector("#submit-button"),
  cancelEdit: document.querySelector("#cancel-edit"), formStatus: document.querySelector("#form-status"),
  resultsStatus: document.querySelector("#results-status"), clearAll: document.querySelector("#clear-all"),
  clearDialog: document.querySelector("#clear-dialog"), balance: document.querySelector("#balance-total"),
  income: document.querySelector("#income-total"), expenses: document.querySelector("#expense-total"), count: document.querySelector("#transaction-count"),
};

let transactions = loadTransactions();

function loadTransactions() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    queueMicrotask(() => setStatus("Saved data could not be read. A new list has been started.", true));
    return [];
  }
}

function saveTransactions() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    return true;
  } catch {
    setStatus("Your browser could not save this change. Check storage permissions.", true);
    return false;
  }
}

function setStatus(message, isError = false) {
  elements.formStatus.textContent = message;
  elements.formStatus.classList.toggle("error", isError);
}

function updateCategories(type, selected = "") {
  elements.category.replaceChildren(new Option("Choose a category", ""));
  CATEGORIES[type].forEach((category) => elements.category.add(new Option(category, category, false, category === selected)));
}

function updateCategoryFilter() {
  const current = elements.categoryFilter.value;
  const categories = [...new Set(transactions.map((item) => item.category))].sort();
  elements.categoryFilter.replaceChildren(new Option("All categories", "all"));
  categories.forEach((category) => elements.categoryFilter.add(new Option(category, category)));
  elements.categoryFilter.value = categories.includes(current) ? current : "all";
}

function createActionButton(label, action, id) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `table-action ${action}`;
  button.dataset.action = action;
  button.dataset.id = id;
  button.textContent = label;
  button.setAttribute("aria-label", `${label} transaction`);
  return button;
}

function renderTransactions() {
  const visible = filterTransactions(transactions, {
    search: elements.search.value, type: elements.typeFilter.value, category: elements.categoryFilter.value,
  });
  elements.list.replaceChildren();
  if (!visible.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.className = "empty-state";
    const hasFilters = elements.search.value || elements.typeFilter.value !== "all" || elements.categoryFilter.value !== "all";
    const title = document.createElement("strong");
    title.textContent = hasFilters ? "No matching transactions" : "No transactions yet";
    const copy = document.createElement("span");
    copy.textContent = hasFilters ? "Adjust the filters or search term and try again." : "Add your first income or expense using the form.";
    cell.append(title, copy); row.append(cell); elements.list.append(row);
  }
  visible.forEach((transaction) => {
    const row = document.createElement("tr");
    const details = document.createElement("td");
    const name = document.createElement("strong"); name.textContent = transaction.description;
    const type = document.createElement("span"); type.className = "transaction-type"; type.textContent = transaction.type;
    details.append(name, type);
    const category = document.createElement("td"); category.textContent = transaction.category;
    const date = document.createElement("td"); date.textContent = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(`${transaction.date}T00:00:00Z`));
    const amount = document.createElement("td"); amount.className = `transaction-amount ${transaction.type === "income" ? "positive" : "negative"}`; amount.textContent = `${transaction.type === "income" ? "+" : "−"}${formatMoney(transaction.amount)}`;
    const actions = document.createElement("td"); actions.className = "table-actions"; actions.append(createActionButton("Edit", "edit", transaction.id), createActionButton("Delete", "delete", transaction.id));
    row.append(details, category, date, amount, actions); elements.list.append(row);
  });
  elements.resultsStatus.textContent = `${visible.length} of ${transactions.length} transaction${transactions.length === 1 ? "" : "s"} shown.`;
}

function renderSummary() {
  const summary = calculateSummary(transactions);
  elements.balance.textContent = formatMoney(summary.balance);
  elements.balance.className = summary.balance < 0 ? "negative" : summary.balance > 0 ? "positive" : "";
  elements.income.textContent = formatMoney(summary.income);
  elements.expenses.textContent = formatMoney(summary.expenses);
  elements.count.textContent = String(summary.count);
}

function render() { updateCategoryFilter(); renderSummary(); renderTransactions(); elements.clearAll.disabled = !transactions.length; }

function resetForm(message = "") {
  elements.form.reset(); elements.id.value = ""; elements.date.value = new Date().toISOString().slice(0, 10);
  updateCategories("expense"); elements.formTitle.textContent = "Add a record"; elements.submit.textContent = "Add transaction";
  elements.cancelEdit.hidden = true; clearErrors(); setStatus(message);
}

function clearErrors() {
  ["description", "amount", "category", "date"].forEach((name) => {
    document.querySelector(`#${name}-error`).textContent = "";
    document.querySelector(`#${name}`).removeAttribute("aria-invalid");
  });
}

function showErrors(errors) {
  clearErrors();
  Object.entries(errors).forEach(([name, message]) => {
    document.querySelector(`#${name}-error`).textContent = message;
    document.querySelector(`#${name}`).setAttribute("aria-invalid", "true");
  });
  document.querySelector(`#${Object.keys(errors)[0]}`)?.focus();
}

elements.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const type = new FormData(elements.form).get("type");
  const input = { type, description: elements.description.value, amount: elements.amount.value, category: elements.category.value, date: elements.date.value };
  const errors = validateTransaction(input);
  if (Object.keys(errors).length) { showErrors(errors); setStatus("Review the highlighted fields.", true); return; }
  const existingIndex = transactions.findIndex((item) => item.id === elements.id.value);
  const transaction = { ...input, description: input.description.trim(), amount: Number(input.amount), id: elements.id.value || crypto.randomUUID(), createdAt: existingIndex >= 0 ? transactions[existingIndex].createdAt : new Date().toISOString() };
  const next = [...transactions];
  if (existingIndex >= 0) next[existingIndex] = transaction; else next.push(transaction);
  const previous = transactions; transactions = next;
  if (!saveTransactions()) { transactions = previous; return; }
  render(); resetForm(existingIndex >= 0 ? "Transaction updated." : "Transaction added.");
});

elements.form.addEventListener("change", (event) => {
  if (event.target.name === "type") updateCategories(event.target.value);
});

elements.list.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]"); if (!button) return;
  const transaction = transactions.find((item) => item.id === button.dataset.id); if (!transaction) return;
  if (button.dataset.action === "edit") {
    elements.id.value = transaction.id; elements.description.value = transaction.description; elements.amount.value = transaction.amount;
    elements.date.value = transaction.date; document.querySelector(`input[name="type"][value="${transaction.type}"]`).checked = true;
    updateCategories(transaction.type, transaction.category); elements.formTitle.textContent = "Edit transaction"; elements.submit.textContent = "Save changes";
    elements.cancelEdit.hidden = false; setStatus(""); elements.description.focus(); elements.form.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
  }
  if (button.dataset.action === "delete") {
    transactions = transactions.filter((item) => item.id !== transaction.id);
    if (saveTransactions()) { render(); if (elements.id.value === transaction.id) resetForm(); elements.resultsStatus.textContent = `${transaction.description} deleted.`; }
  }
});

[elements.search, elements.typeFilter, elements.categoryFilter].forEach((control) => control.addEventListener("input", renderTransactions));
elements.cancelEdit.addEventListener("click", () => resetForm("Editing cancelled."));
elements.clearAll.addEventListener("click", () => elements.clearDialog.showModal());
elements.clearDialog.addEventListener("close", () => {
  if (elements.clearDialog.returnValue !== "confirm") return;
  transactions = []; if (saveTransactions()) { render(); resetForm("All transaction data cleared."); }
});
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && elements.id.value && !elements.clearDialog.open) resetForm("Editing cancelled."); });

resetForm(); render();
