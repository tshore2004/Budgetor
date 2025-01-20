import React, { useState } from 'react';
import './IncomeTracker.css';

function IncomeTracker({ income, addIncome }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');

    const handleAddIncome = () => {
        if (description && amount) {
            const formattedDescription = description.charAt(0).toUpperCase() + description.slice(1);
            addIncome({ description: formattedDescription, amount: parseFloat(amount) });
            setDescription('');
            setAmount('');
        }
    };

    return (
        <div className="income-tracker">
            <h2>Income Tracker</h2>
            <div className="income-form">
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="input-field"
                />
                <button onClick={handleAddIncome} className="add-button">
                    Add Income
                </button>
            </div>
            <div className="income-list">
                <h3>Income Entries</h3>
                {income.length > 0 ? (
                    <ul>
                        {income.map((item, index) => (
                            <li key={index} className="income-item">
                                <span className="description">{item.description}</span>
                                <span className="amount">${item.amount.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-income">No income entries available.</p>
                )}
            </div>
        </div>
    );
}

export default IncomeTracker;
