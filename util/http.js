import axios from "axios";

const backendURL = 'https://expense-tracker-d3503-default-rtdb.firebaseio.com';

export function storeExpense(expenseData){
    axios.post(
        {backendURL} + '/expenses.json',
        expenseData
    ) 
}

export async function fetchExpenses(){
    const response = await axios.get( {backendURL} + 'expenses.json', expenseData )

    const expenses = [];

    for(const key in response.data){
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: response.date[key].date,
            description: response.data[key].description
        };
        expenses.push(expenseObj);
    }

    return expenses;
}