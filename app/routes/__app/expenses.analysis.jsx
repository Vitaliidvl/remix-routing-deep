import { json } from '@remix-run/node';
import { useCatch, useLoaderData } from '@remix-run/react';
import { getExpenses } from '~/data/expenses.server';
import ExpenseStatistics from '~/components/expenses/ExpenseStatistics';
import Chart from '~/components/expenses/Chart';
import Error from '~/components/util/Error';
import { requireUserSession } from '~/data/auth.server';
// /expenses/analysis

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();
  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);
  if (!expenses || expenses.length === 0) {
    throw json(
      { message: 'Could not get expenses for the requested analysis. ' },
      {
        status: 404,
        statusText: 'Expenses not found',
      }
    );
  }
  return expenses;
}

export function CatchBoundary() {
  const caughtResponse = useCatch();
  return (
    <Error title={caughtResponse.statusText}>
      {caughtResponse.data?.message ||
        'Something went wrong - could not load expenses. '}
    </Error>
  );
}
