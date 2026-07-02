import ExpenseCard from "./ExpenseCard";

function ExpenseList({
  expenses,
  totalExpense,
  highestExpense,
  totalCount,
  deleteExpense,
  editExpense,
}) {
  return (
    <div>
      {/* Statistics */}

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 rounded-xl shadow p-5">
          <p className="text-gray-600">Total Spending</p>

          <h2 className="text-3xl font-bold text-green-700">
            ₹ {totalExpense}
          </h2>
        </div>

        <div className="bg-blue-100 rounded-xl shadow p-5">
          <p className="text-gray-600">Highest Expense</p>

          <h2 className="text-3xl font-bold text-blue-700">
            ₹ {highestExpense}
          </h2>
        </div>

        <div className="bg-yellow-100 rounded-xl shadow p-5">
          <p className="text-gray-600">Total Expenses</p>

          <h2 className="text-3xl font-bold text-yellow-700">{totalCount}</h2>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-5">Expenses</h2>

      {expenses.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center">
          <p className="text-6xl">📭</p>

          <h3 className="text-xl font-semibold mt-4">No Expenses Yet</h3>

          <p className="text-gray-500 mt-2">Add your first expense.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              deleteExpense={deleteExpense}
              editExpense={editExpense}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseList;
  