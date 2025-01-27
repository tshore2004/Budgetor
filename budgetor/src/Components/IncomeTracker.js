import React, { useState, useRef, useEffect } from 'react';
import './IncomeTracker.css';

function IncomeTracker({ income, addIncome, handleDeleteIncome }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const categories = ['Work', 'Venmo', 'Other'];
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

    const incomeByCategory = income.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.amount;
        return acc;
    }, {});

    const handleAddIncome = () => {
        if (description && amount) {
            const formattedDescription = description.charAt(0).toUpperCase() + description.slice(1);
            addIncome({
                description: formattedDescription,
                amount: parseFloat(amount),
                category: category || 'Uncategorized',
            });
            setCategory('');
            setDescription('');
            setAmount('');

        }
    };

    return (
        <div className="income-tracker">
            <h2>Income Tracker</h2>
            <div className="income-form">
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

                <button onClick={handleAddIncome} className="add-button">
                    Add Income
                </button>
            </div>
            <div className="income-list">
                <h3>Income Entries</h3>
                {income && income.length > 0 ? (
                    <ul>
                        {income.map((item) => (
                            <li key={item._id} className="income-item">
                                <div className="income-main">
                                    <span className="description">{item.description}</span>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDeleteIncome(item._id)}
                                        aria-label="Delete income"
                                    >
                                        ✖
                                    </button>
                                    <span className="amount">${item.amount.toFixed(2)}</span>
                                </div>
                                <div className="income-category">
                                    <span>{item.category}</span>
                                </div>
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
