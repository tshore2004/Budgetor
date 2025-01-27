Budgetor
Budgetor is a simple and intuitive budgeting tool that helps you take control of your finances. Log your income and expenses, categorize them, and visualize your financial data with easy-to-read graphs.

Features
Log Income & Expenses: Keep track of your financial transactions, including income and expenses, with ease.
Categorization: Assign categories to each transaction for better organization.
Graphical Visualizations: View graphs of your financial data to analyze spending and income trends.
Database Integration: All data is securely stored in a MongoDB database for persistence and scalability.
Tech Stack
Frontend: React
Backend: Node.js
Database: MongoDB
Styling: CSS
Getting Started
Follow these steps to set up and start using Budgetor:

Prerequisites
Ensure you have the following installed:

Node.js
npm or yarn
MongoDB (Ensure a running instance of MongoDB)
Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/tshore2004/Budgetor.git  
cd Budgetor  
Install dependencies:

bash
Copy
Edit
npm install  
# or  
yarn install  
Set up the environment variables:

Create a .env file in the root directory.
Add your MongoDB connection string:
plaintext
Copy
Edit
MONGO_URI=your-mongodb-connection-string  
Start the development server:

bash
Copy
Edit
npm start  
# or  
yarn start  
Open your browser and navigate to http://localhost:3000 to use Budgetor.

Database
Budgetor uses MongoDB to store user data, including transactions and categories. Ensure you have a running instance of MongoDB, either locally or via a cloud service like MongoDB Atlas.

How to Use
Log your income and expenses by entering the amount, date, and category.
View your transaction history for a detailed breakdown of your finances.
Use the graphs to visualize your spending and income trends.