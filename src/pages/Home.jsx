import { useState, useEffect } from "react";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";

function Home() {
  // Load expenses from LocalStorage
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Save expenses
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Add Expense
  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  // Delete Expense
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  // Edit Button
  const editExpense = (expense) => {
    setEditingExpense(expense);
  };

  // Update Expense
  const updateExpense = (updatedExpense) => {
    if (updatedExpense === null) {
      setEditingExpense(null);
      return;
    }

    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );

    setEditingExpense(null);
  };
  
  // Search + Filter
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || expense.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Statistics
  const totalExpense = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const highestExpense =
    filteredExpenses.length > 0
      ? Math.max(...filteredExpenses.map((expense) => expense.amount))
      : 0;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}

      <header className="bg-slate-900 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-3xl font-bold">
            💰 Expense Management Dashboard
          </h1>

          <p className="text-slate-300 mt-2">
            Track your daily expenses professionally.
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left */}

          <ExpenseForm
            addExpense={addExpense}
            updateExpense={updateExpense}
            editingExpense={editingExpense}
          />

          {/* Right */}

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="🔍 Search expense..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 bg-white"
              />

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border rounded-lg px-4 py-2 bg-white"
              >
                <option value="all">All</option>
                <option value="food">Food</option>
                <option value="shopping">Shopping</option>
                <option value="transport">Transport</option>
                <option value="bills">Bills</option>
                <option value="entertainment">Entertainment</option>
                <option value="other">Other</option>
              </select>
            </div>

            <ExpenseList
              expenses={filteredExpenses}
              totalExpense={totalExpense}
              highestExpense={highestExpense}
              totalCount={filteredExpenses.length}
              deleteExpense={deleteExpense}
              editExpense={editExpense}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
