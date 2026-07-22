export const CATEGORIES = {
  expense: ["Food", "Housing", "Transport", "Utilities", "Health", "Education", "Other"],
  income: ["Salary", "Freelance", "Gift", "Investment", "Other"],
};

export function validateTransaction(input) {
  const errors = {};
  const description = input.description.trim();
  const amount = Number(input.amount);
  if (description.length < 2) errors.description = "Enter at least 2 characters.";
  if (!Number.isFinite(amount) || amount <= 0) errors.amount = "Enter an amount greater than zero.";
  if (!CATEGORIES[input.type]?.includes(input.category)) errors.category = "Choose a valid category.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) errors.date = "Choose a valid date.";
  return errors;
}

export function calculateSummary(transactions) {
  return transactions.reduce((summary, transaction) => {
    const amount = Number(transaction.amount);
    if (transaction.type === "income") summary.income += amount;
    if (transaction.type === "expense") summary.expenses += amount;
    summary.balance = summary.income - summary.expenses;
    summary.count += 1;
    return summary;
  }, { income: 0, expenses: 0, balance: 0, count: 0 });
}

export function filterTransactions(transactions, filters) {
  const query = filters.search.trim().toLocaleLowerCase();
  return transactions
    .filter((item) => filters.type === "all" || item.type === filters.type)
    .filter((item) => filters.category === "all" || item.category === filters.category)
    .filter((item) => !query || item.description.toLocaleLowerCase().includes(query))
    .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt));
}

export function formatMoney(value, locale = "en-US", currency = "USD") {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);
}
