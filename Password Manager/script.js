document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();

  renderExpenses();
  updateTotal();

  expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());
    if (name && !isNaN(amount) && amount > 0) {
      const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(expense);
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
      saveExpensesToLocal();
      updateTotal();
    }
  });

  expenseList.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      const expenseId = parseInt(event.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== expenseId);
      saveExpensesToLocal();
      updateTotal();
    }
  });

  function calculateTotal() {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
    renderExpenses();
  }

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `${expense.name}: $${expense.amount.toFixed(
        2
      )} <button data-id="${expense.id}">Delete</button>`;
      expenseList.appendChild(li);
    });
  }
});
