import { useReducer, createContext } from 'react';

const DUMMY_EXPENSES = [
    {
      id: 'e1',
      description: 'Shooting',
      amount: 52,
      date: new Date('2021-12-19')
    },
    {
      id: 'e2',
      description: 'Shooting',
      amount: 23,
      date: new Date('2022-10-15')
    },
    {
      id: 'e3',
      description: 'Shooting',
      amount: 100,
      date: new Date('2023-12-01')
    },
    {
      id: 'e4',
      description: 'Game',
      amount: 23,
      date: new Date('2022-02-19')
    },
    {
      id: 'e5',
      description: 'Game',
      amount: 23,
      date: new Date('2023-02-18')
    },
    {
      id: 'e6',
      description: 'Shooting',
      amount: 32,
      date: new Date('2023-01-05')
    },
    {
      id: 'e7',
      description: 'Shooting',
      amount: 17,
      date: new Date('2023-10-16')
    },
    {
      id: 'e8',
      description: 'Game',
      amount: 14,
      date: new Date('2023-02-19')
    },
    {
      id: 'e9',
      description: 'Game',
      amount: 18,
      date: new Date('2023-02-18')
    }
  ];

export const ExpensesContext = createContext({ 
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action){
    switch(action.type){
        case 'ADD':
            const id = Math.random().toString() + new Date().toString();
            return [{...action.payload, id: id}, ...state]
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
              (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
          return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;
    }
}

function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData});
    }

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}})
    } 

    const value = {
      expenses: expensesState,
      addExpense: addExpense,
      deleteExpense: deleteExpense,
      updateExpense: updateExpense
    }

    return(
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>)

}

export default ExpensesContextProvider;