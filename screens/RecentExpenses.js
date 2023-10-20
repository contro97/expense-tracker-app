
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context"
import { getDateMinusDays } from "../util/date";
import {fetchExpenses} from "../util/http"
import { useEffect, useState } from "react";

function RecentExpenses(){
    const expensesCtx = useContext(ExpensesContext);

    const [fetchedExpenses, setFetchedEpenses] = useState();
    

    useEffect( () => {
        async function getExpenses() {
            const expenses = await fetchExpenses();
            expensesContext.setFetchedEpenses(expenses);
        }
        getExpenses();
    }, []);

    const recentExpenses = expensesCtx.expenses.filter((expense) => { 
        const today = new Date();
        const date7dayAgo = getDateMinusDays(today, 7);

        return (expense.date >= date7dayAgo) && (expense.date <= today)
    });
    return(
        <ExpensesOutput 
        expensesPeriod="Last 7 Days"
        expenses={recentExpenses}
        fallbackText="No expenses in 7 days."
        />
    )
}

export default RecentExpenses