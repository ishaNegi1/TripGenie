"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Expense, TripMember } from "@/types";

type Settlement = {
  from: string;
  to: string;
  amount: number;
};

export function GroupExpenseManager({
  tripId,
  members,
  expenses,
}: {
  tripId: string;
  members: TripMember[];
  expenses: Expense[];
}) {
  const router = useRouter();

  const [memberName, setMemberName] = useState("");

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [paidBy, setPaidBy] = useState("");

  const [loading, setLoading] = useState(false);

  const totalExpense = useMemo(() => {
    return expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0
    );
  }, [expenses]);

  const perPersonShare =
    members.length > 0
      ? totalExpense / members.length
      : 0;

  const settlements: Settlement[] = useMemo(() => {
    const balances: Record<string, number> = {};

    members.forEach((member) => {
      balances[member.member_name] = -perPersonShare;
    });

    expenses.forEach((expense) => {
      balances[expense.paid_by] += Number(
        expense.amount
      );
    });

    const creditors = Object.entries(balances)
      .filter(([_, amount]) => amount > 0)
      .map(([name, amount]) => ({
        name,
        amount,
      }));

    const debtors = Object.entries(balances)
      .filter(([_, amount]) => amount < 0)
      .map(([name, amount]) => ({
        name,
        amount: Math.abs(amount),
      }));

    const result: Settlement[] = [];

    let i = 0;
    let j = 0;

    while (
      i < debtors.length &&
      j < creditors.length
    ) {
      const debtor = debtors[i];
      const creditor = creditors[j];

      const settledAmount = Math.min(
        debtor.amount,
        creditor.amount
      );

      result.push({
        from: debtor.name,
        to: creditor.name,
        amount: Number(
          settledAmount.toFixed(2)
        ),
      });

      debtor.amount -= settledAmount;
      creditor.amount -= settledAmount;

      if (debtor.amount <= 0.01) i++;
      if (creditor.amount <= 0.01) j++;
    }

    return result;
  }, [expenses, members, perPersonShare]);

  const handleAddMember = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "/api/members",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            trip_id: tripId,
            member_name: memberName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed");
      }

      setMemberName("");

      router.refresh();
    } catch {
      alert("Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        "/api/expenses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            trip_id: tripId,
            title,
            amount: Number(amount),
            category,
            paid_by: paidBy,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed");
      }

      setTitle("");
      setAmount("");
      setCategory("Food");

      router.refresh();
    } catch {
      alert("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 space-y-10">
      <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h2 className="mb-4 text-2xl font-semibold dark:text-amber-100">
          Group Members
        </h2>

        <form
          onSubmit={handleAddMember}
          className="flex gap-3"
        >
          <input
            type="text"
            placeholder="Enter member name"
            value={memberName}
            onChange={(e) =>
              setMemberName(e.target.value)
            }
            required
            className="flex-1 rounded-md border border-zinc-300 bg-transparent px-3 py-2 dark:border-zinc-700"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Add Member
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="rounded-full bg-zinc-900 px-4 py-1 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
            >
              {member.member_name}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold dark:text-amber-100">
            Group Expenses
          </h2>

          <div className="rounded-lg bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-900">
            Total: ₹{totalExpense.toFixed(2)}
          </div>
        </div>

        <form
          onSubmit={handleAddExpense}
          className="grid gap-4 md:grid-cols-2"
        >
          <input
            type="text"
            placeholder="Expense title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
            className="rounded-md border border-zinc-300 bg-transparent px-3 py-2 dark:border-zinc-700"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            required
            className="rounded-md border border-zinc-300 bg-transparent px-3 py-2 dark:border-zinc-700"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="rounded-md border border-zinc-300 bg-transparent px-3 py-2 dark:border-zinc-700"
          >
            <option>Food</option>
            <option>Hotel</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Activities</option>
          </select>

          <select
            value={paidBy}
            onChange={(e) =>
              setPaidBy(e.target.value)
            }
            required
            className="rounded-md border border-zinc-300 bg-transparent px-3 py-2 dark:border-zinc-700"
          >
            <option value="">
              Select payer
            </option>

            {members.map((member) => (
              <option
                key={member.id}
                value={member.member_name}
              >
                {member.member_name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-zinc-900 px-4 py-2 text-white dark:bg-zinc-100 dark:text-zinc-900"
          >
            Add Expense
          </button>
        </form>

        <div className="mt-8 space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <div>
                <h3 className="font-medium dark:text-amber-100">
                  {expense.title}
                </h3>

                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {expense.category} • Paid by{" "}
                  {expense.paid_by}
                </p>
              </div>

              <div className="font-semibold dark:text-amber-100">
                ₹{expense.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h2 className="mb-6 text-2xl font-semibold dark:text-amber-100">
          Smart Expense Settlement
        </h2>

        <div className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
          Per person share:
          <span className="ml-2 font-semibold">
            ₹{perPersonShare.toFixed(2)}
          </span>
        </div>

        <div className="space-y-3">
          {settlements.map((settlement, index) => (
            <div
              key={index}
              className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <span className="font-semibold">
                {settlement.from}
              </span>{" "}
              pays{" "}
              <span className="font-semibold">
                {settlement.to}
              </span>{" "}
              ₹
              <span className="font-semibold">
                {settlement.amount}
              </span>
            </div>
          ))}

          {settlements.length === 0 ? (
            <p className="text-sm text-zinc-500">
              No settlements yet.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}