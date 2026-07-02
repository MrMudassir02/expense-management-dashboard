function ExpenseCard({ expense, deleteExpense, editExpense }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border p-5 flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold text-slate-800">{expense.title}</h3>

        <p className="text-green-600 font-semibold mt-2">₹ {expense.amount}</p>

        <span className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-100 text-blue-700 capitalize text-sm">
          {expense.category}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => editExpense(expense)}
          className="bg-yellow-400 hover:bg-yellow-500 transition px-4 py-2 rounded-lg font-medium cursor-pointer"
        >
          ✏️ Edit
        </button>

        <button
          onClick={() => deleteExpense(expense.id)}
          className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg font-medium cursor-pointer"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseCard;
