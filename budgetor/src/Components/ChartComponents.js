import React from 'react';
import { Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

function ChartComponent({ income, expenses }) {
    const labels = income.map((item) => format(new Date(item.date), 'MMM dd, yyyy'));
    const incomeData = income.map((item) => item.amount);
    const expenseData = expenses.map((item) => item.amount);

    const totalIncome = incomeData.reduce((sum, value) => sum + value, 0);
    const totalExpenses = expenseData.reduce((sum, value) => sum + value, 0);
    const totalBalance = totalIncome - totalExpenses;

    const pieData = {
        labels: ['Income', 'Expenses', 'Balance'],
        datasets: [
            {
                data: [totalIncome, totalExpenses, totalBalance],
                backgroundColor: ['green', 'red', 'blue'],
                hoverBackgroundColor: ['darkgreen', 'darkred', 'darkblue'],
            },
        ],
    };

    const lineData = {
        labels,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                borderColor: 'green',
                backgroundColor: 'rgba(0, 255, 0, 0.3)',
                fill: true,
            },
            {
                label: 'Expenses',
                data: expenseData,
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.3)',
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: $${context.raw.toFixed(2)}`,
                },
            },
            title: { display: true, text: 'Income vs Expenses Trends' },
        },
    };

    return (
        <div>
            <h2>Trends</h2>
            <Line data={lineData} options={options} />

            <h2>Income vs Expenses Distribution</h2>
            <Pie data={pieData} />
            <Doughnut data={pieData} />
        </div>
    );
}

export default ChartComponent;