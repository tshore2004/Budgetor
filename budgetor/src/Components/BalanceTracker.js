import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './BalanceTracker.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function BalanceTracker({ income, expenses, clearData }) {
    const [activeSection, setActiveSection] = useState(null);

    const totalIncome = income.reduce((sum, entry) => sum + entry.amount, 0);
    const totalExpenses = expenses.reduce((sum, entry) => sum + entry.amount, 0);
    const balance = totalIncome - totalExpenses;

    const pieData = {
        labels: ['Income', 'Expenses', 'Balance'],
        datasets: [
            {
                data: [totalIncome, totalExpenses, balance],
                backgroundColor: ['green', 'red', 'blue'],
                hoverBackgroundColor: ['darkgreen', 'darkred', 'darkblue'],
            },
        ],
    };
    
    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: $${value.toFixed(2)}`;
                    },
                },
            },
        },
    };

    const renderDetails = () => {
        if (activeSection === 'income') {
            return (
                <div className="details-box">
                    <h4>Income Details:</h4>
                    <ul>
                        {income.map((item, index) => (
                            <li key={index}>
                                {item.description}: ${item.amount.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        if (activeSection === 'expenses') {
            return (
                <div className="details-box">
                    <h4>Expenses Details:</h4>
                    <ul>
                        {expenses.map((item, index) => (
                            <li key={index}>
                                {item.description}: ${item.amount.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
        if (activeSection === 'balance') {
            return (
                <div className="details-box">
                    <h4>Balance Information:</h4>
                    <p>
                        Your balance is calculated as Total Income - Total Expenses.
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="balance-tracker">
            <h2>Balance Tracker</h2>
            <div className="balance-summary">
                <p onClick={() => setActiveSection(activeSection === 'income' ? null : 'income')}>
                    Total Income: ${totalIncome.toFixed(2)}
                </p>
                <p onClick={() => setActiveSection(activeSection === 'expenses' ? null : 'expenses')}>
                    Total Expenses: ${totalExpenses.toFixed(2)}
                </p>
                <h3 onClick={() => setActiveSection(activeSection === 'balance' ? null : 'balance')}>
                    Balance: ${balance.toFixed(2)}
                </h3>
            </div>

            {renderDetails()}

            <div className="chart-container">
                <h2>Income vs Expenses Distribution</h2>
                <Pie data={pieData} options={options} />
            </div>
            <button className="clear-button" onClick={clearData}>Clear All Data</button>
        </div>
    );
}

export default BalanceTracker;
