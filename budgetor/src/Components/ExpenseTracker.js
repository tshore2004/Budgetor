import React, { useState, useRef, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './ExpenseTracker.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpenseTracker({ expenses, addExpense, handleDeleteExpense }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const categories = ['Food', 'Transportation', 'Rent', 'Entertainment', 'Other'];
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleCategorySelect = (selectedCategory) => {
        setCategory(selectedCategory);
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const calculateDropdownWidth = () => {
        const maxCategoryWidth = Math.max(...categories.map(cat => cat.length));
        return `${maxCategoryWidth * 10 + 20}px`; // Adjust based on font size (10px per char)
    };

    const expensesByCategory = expenses.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.amount;
        return acc;
    }, {});

    const pieData = {
        labels: Object.keys(expensesByCategory),
        datasets: [
            {
                data: Object.values(expensesByCategory),
                backgroundColor: ['#f94144', '#f3722c', '#f8961e', '#90be6d', '#43aa8b'],
                hoverBackgroundColor: ['#f94144aa', '#f3722caa', '#f8961eaa', '#90be6daa', '#43aa8baa'],
            },
        ],
    };

    const handleAddExpense = () => {
        if (description && amount) {
            const formattedDescription = description.charAt(0).toUpperCase() + description.slice(1);
            addExpense({
                description: formattedDescription,
                amount: parseFloat(amount),
                category: category || 'Uncategorized',
            });
            setCategory('');
            setDescription('');
            setAmount('');

        }
    };

    const generateInsights = () => {
        const insights = [];
        const totalExpenses = expenses.reduce((sum, entry) => sum + entry.amount, 0);

        // Insight 1: Largest spending category
        if (Object.keys(expensesByCategory).length > 0) {
            const largestCategory = Object.entries(expensesByCategory).reduce((a, b) => (a[1] > b[1] ? a : b));
            insights.push(`You are spending the most on ${largestCategory[0]}: $${largestCategory[1].toFixed(2)}.`);
        }

        // Insight 2: Warning for overspending
        if (totalExpenses > 1000) {
            insights.push(`Your total expenses exceed $1000. Consider revisiting your budget.`);
        }

        // Insight 3: Entertainment spending warning
        if (expensesByCategory['Entertainment'] > 0.2 * totalExpenses) {
            insights.push("You're spending a large portion of your budget on entertainment. Consider cutting back.");
        }

        // Insight 4: Low spending on essential categories
        if ((expensesByCategory['Food'] || 0) < 0.1 * totalExpenses) {
            insights.push("Your spending on food seems unusually low. Ensure you're covering essentials.");
        }

        return insights;
    };

    const insights = generateInsights();

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

    return (
        <div className="expenses-tracker">
            <h2>Expense Tracker</h2>
            <div className="expenses-form">
                <div className="input-row">
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="input-field"
                    />
                    <div className="custom-dropdown" ref={dropdownRef}>
                        <div className="dropdown-header" onClick={toggleDropdown}>
                            {category || 'Select Category'}
                            <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
                        </div>
                        {isDropdownOpen && (
                            <ul className="dropdown-menu" style={{ width: calculateDropdownWidth() }}>
                                {categories.map((cat, index) => (
                                    <li
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() => handleCategorySelect(cat)}
                                    >
                                        {cat}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-field"
                    />
                </div>

                <button onClick={handleAddExpense} className="add-button">
                    Add Expense
                </button>
            </div>
            <div className="expenses-list">
                <h3>Expense Entries</h3>
                {expenses && expenses.length > 0 ? (
                    <ul>
                        {expenses.map((item) => (
                            <li key={item._id} className="expenses-item">
                                <div className="expense-main">
                                    <span className="description">{item.description}</span>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDeleteExpense(item._id)}
                                        aria-label="Delete expense"
                                    >
                                        ✖
                                    </button>
                                    <span className="amount">${item.amount.toFixed(2)}</span>
                                </div>
                                <div className="expense-category">
                                    <span>{item.category}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-expenses">No expenses entries available.</p>
                )}
            </div>
            <div className="insights-panel">
                <h2>Insights</h2>
                <ul>
                    {insights.map((insight, index) => (
                        <li key={index}>
                            <span className={insight.includes('warning') ? 'insight-warning' : 'insight-info'}>
                                {insight}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chart-container">
                <h2>Income vs Expenses Distribution</h2>
                <Pie data={pieData} options={options} />
            </div>
        </div>
    );
}

export default ExpenseTracker;
