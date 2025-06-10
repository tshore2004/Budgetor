import React, { useEffect, useState } from 'react';
import './App.css';
import BalanceTracker from './Components/BalanceTracker';
import ExpenseTracker from './Components/ExpenseTracker';
import IncomeTracker from './Components/IncomeTracker';
import ChartComponent from './Components/ChartComponents';
//import { get } from 'mongoose';
function App() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [activeTab, setActiveTab] = useState('balance');
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  const [authToken, setAuthToken] = useState(null);
  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`,
  });

  const addExpense = async (newExpense) => {
    try {
      const response = await fetch(`${API_BASE_URL}/add-entry`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ type: 'expense', ...newExpense }),
      });
      const result = await response.json();
      console.log(result.message);
      setExpenses([...expenses, result]);
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete-entry/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
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
      const response = await fetch(`${API_BASE_URL}/add-entry`, {
        method: 'POST',
        headers:getAuthHeaders(),
        body: JSON.stringify({ type: 'income', ...newIncome }),
      });
      const result = await response.json();
      console.log(result.message);
      setIncome([...income, result]);
    } catch (error) {
      console.error('Error saving income:', error);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete-entry/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
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



  
  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       let token = localStorage.getItem('jwt_token');

  //       if (!token) {
  //         const response = await fetch(`${API_BASE_URL}/auth/anonymous`);
  //         const data = await response.json();
  //         token = data.token;
  //         localStorage.setItem('jwt_token', token);
  //       }

  //       setAuthToken(token);

  //       const budgetResponse = await fetch(`${API_BASE_URL}/budget-data`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       const budgetData = await budgetResponse.json();

  //       const incomeData = budgetData.filter(item => item.type === 'income');
  //       const expenseData = budgetData.filter(item => item.type === 'expense');

  //       setIncome(incomeData);
  //       setExpenses(expenseData);
  //     } catch (error) {
  //       console.error('Error during initialization:', error);
  //     }
  //   };

  //   init();
  // }, [API_BASE_URL]);

  useEffect(() => {
  const init = async () => {
    try {
      let token = localStorage.getItem('jwt_token');

      if (!token) {
        const response = await fetch(`${API_BASE_URL}/auth/anonymous`);
        const data = await response.json();

        if (!data.token) {
          throw new Error('Failed to get token');
        }

        token = data.token;
        localStorage.setItem('jwt_token', token);
      }

      setAuthToken(token);

      const budgetResponse = await fetch(`${API_BASE_URL}/budget-data`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!budgetResponse.ok) {
        const errData = await budgetResponse.json();
        throw new Error(errData.error || 'Failed to fetch budget data');
      }

      const budgetData = await budgetResponse.json();

      if (!Array.isArray(budgetData)) {
        throw new Error('Unexpected response format: not an array');
      }

      const incomeData = budgetData.filter(item => item.type === 'income');
      const expenseData = budgetData.filter(item => item.type === 'expense');

      setIncome(incomeData);
      setExpenses(expenseData);
    } catch (error) {
      console.error('Error during initialization:', error);
      localStorage.removeItem('jwt_token');
      // Optional: reload to trigger re-auth
      window.location.reload();
    }
  };

  init();
}, [API_BASE_URL]);


  const clearData = async () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      try {
        const response = await fetch(`${API_BASE_URL}/clear-data`, {
          method: 'DELETE',
          headers: getAuthHeaders()
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