import { useState, useEffect } from "react";

function ExpenseForm({ addExpense, editingExpense, updateExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setCategory(editingExpense.category);
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !amount) {
      alert("Please fill all fields.");
      return;
    }

    if (editingExpense) {
      updateExpense({
        id: editingExpense.id,
        title,
        amount: Number(amount),
        category,
      });
    } else {
      addExpense({
        id: Date.now(),
        title,
        amount: Number(amount),
        category,
      });
    }

    setTitle("");
    setAmount("");
    setCategory("food");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-5"
    >
      <h1 className="text-3xl font-bold text-slate-800">
        {editingExpense ? "Edit Expense" : "Add New Expense"}
      </h1>

      <div>
        <label className="block mb-2 font-medium">Title</label>

        <input
          type="text"
          placeholder="Enter expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Amount</label>

        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3"
        >
          <option value="food">Food</option>
          <option value="shopping">Shopping</option>
          <option value="transport">Transport</option>
          <option value="bills">Bills</option>
          <option value="entertainment">Entertainment</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        className={`py-3 rounded-lg text-white font-semibold transition duration-300 ${
          editingExpense
            ? "bg-green-600 hover:bg-green-700 cursor-pointer"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        }`}
      >
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;
