import React, { useEffect, useState } from 'react';
import './App.css';
import BalanceTracker from './Components/BalanceTracker';
import ExpenseTracker from './Components/ExpenseTracker';
import IncomeTracker from './Components/IncomeTracker';
import ChartComponent from './Components/ChartComponents';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [activeTab, setActiveTab] = useState('balance');

  const addExpense = async (newExpense) => {
    try {
      const response = await fetch('http://localhost:5000/add-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'expense', ...newExpense }),
      });
      const result = await response.json();
      console.log(result.message);
      setExpenses([...expenses, newExpense]);
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-entry/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense._id !== id)
        );
        console.log('Expense deleted successfully!');
      } else {
        const errorData = await response.json();
        console.error('Failed to delete expense:', errorData.error);
      }
    } catch (error) {
      console.error('Error while deleting expense:', error);
    }
  };

  const addIncome = async (newIncome) => {
    try {
      const response = await fetch('http://localhost:5000/add-entry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: 'income', ...newIncome }),
      });
      const result = await response.json();
      console.log(result.message);
      setIncome([...income, newIncome]);
    } catch (error) {
      console.error('Error saving income:', error);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/delete-entry/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setIncome((prevIncome) =>
          prevIncome.filter((income) => income._id !== id)
        );
        console.log('Income deleted successfully!');
      } else {
        const errorData = await response.json();
        console.error('Failed to delete income:', errorData.error);
      }
    } catch (error) {
      console.error('Error while deleting income:', error);
    }
  };

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response = await fetch('http://localhost:5000/budget-data');
        const data = await response.json();

        // Separate income and expenses if needed
        const incomeData = data.filter(item => item.type === 'income');
        const expenseData = data.filter(item => item.type === 'expense');

        setIncome(incomeData);
        setExpenses(expenseData);
      } catch (error) {
        console.error('Error fetching budget data:', error);
      }
    };

    fetchBudgetData();
  }, []);

  const clearData = async () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      try {
        const response = await fetch('http://localhost:5000/clear-data', {
          method: 'DELETE',
        });
        const result = await response.json();
        if (response.ok) {
          console.log(result.message);
          setExpenses([]);
          setIncome([]);
        } else {
          console.error('Failed to clear data:', result.error);
        }
      } catch (error) {
        console.error('Error clearing data:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Personal Finance Manager</h1>
      <div className="tabs">
        <button
          onClick={() => setActiveTab('balance')}
          className={`tab-button balance-tab ${activeTab === 'balance' ? 'active' : ''}`}
        >
          Balance Tracker
        </button>
        <button
          onClick={() => setActiveTab('expenses')}
          className={`tab-button expense-tab ${activeTab === 'expenses' ? 'active' : ''}`}
        >
          Expense Tracker
        </button>
        <button
          onClick={() => setActiveTab('income')}
          className={`tab-button income-tab ${activeTab === 'income' ? 'active' : ''}`}
        >
          Income Tracker
        </button>
        <button
          onClick={() => setActiveTab('charts')}
          className={`tab-button charts-tab ${activeTab === 'charts' ? 'active' : ''}`}
        >
          Charts
        </button>

      </div>
      <div className="tab-content">
        {activeTab === 'balance' && <BalanceTracker income={income} expenses={expenses} clearData={clearData} />}
        {activeTab === 'expenses' && <ExpenseTracker expenses={expenses} addExpense={addExpense} handleDeleteExpense={handleDeleteExpense} />}
        {activeTab === 'income' && <IncomeTracker income={income} addIncome={addIncome} handleDeleteIncome={handleDeleteIncome} />}
        {activeTab === 'charts' && <ChartComponent income={income} expenses={expenses} />}
      </div>
    </div>
  );
}

export default App;