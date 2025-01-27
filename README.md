# Budgetor

Budgetor is a simple and intuitive budgeting tool that helps you take control of your finances. Log your income and expenses, categorize them, and visualize your financial data with easy-to-read graphs.

## Features

- **Log Income & Expenses**: Keep track of your financial transactions, including income and expenses, with ease.
- **Categorization**: Assign categories to each transaction for better organization.
- **Graphical Visualizations**: View graphs of your financial data to analyze spending and income trends.
- **Database Integration**: All data is securely stored in a MongoDB database for persistence and scalability.

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js
- **Database**: MongoDB
- **Styling**: CSS

## Getting Started

Follow these steps to set up and start using Budgetor:

### Prerequisites

Ensure you have the following installed:
- Node.js: https://nodejs.org/
- npm: https://www.npmjs.com/ or yarn: https://yarnpkg.com/
- MongoDB: https://www.mongodb.com/ (Ensure a running instance of MongoDB)

### Installation

1. Clone the repository:
   git clone https://github.com/tshore2004/Budgetor.git
   cd Budgetor

2. Install dependencies:
   npm install
   # or
   yarn install

3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add your MongoDB connection string:
     MONGO_URI=your-mongodb-connection-string

4. Start the development server:
   npm start
   # or
   yarn start

5. Open your browser and navigate to http://localhost:3000 to use Budgetor.

### Database

Budgetor uses MongoDB to store user data, including transactions and categories. Ensure you have a running instance of MongoDB, either locally or via a cloud service like MongoDB Atlas: https://www.mongodb.com/cloud/atlas.

## How to Use

1. Log your income and expenses by entering the amount, date, and category.
2. View your transaction history for a detailed breakdown of your finances.
3. Use the graphs to visualize your spending and income trends.

## Contributing

Contributions are welcome! If you'd like to help improve Budgetor, please:

1. Fork the repository.
2. Create a feature branch:
   git checkout -b feature/your-feature-name
3. Commit your changes:
   git commit -m "Add your message here"
4. Push to the branch:
   git push origin feature/your-feature-name
5. Submit a pull request.

## License

This project is licensed under the MIT License.
