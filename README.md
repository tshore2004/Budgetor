# Budgetor

Budgetor is a simple budgeting tool to help you track your income and expenses, categorize transactions, and visualize your financial data. Built with Node.js and MongoDB, it provides an easy way to manage your finances.

## Live Demo

Try it out here: [budgetor-pied.vercel.app](https://budgetor-pied.vercel.app)

## Features

- Log income and expenses
- Categorize transactions
- Visualize data with graphs
- Persistent storage with MongoDB

## Tech Stack

- **Backend:** Node.js
- **Database:** MongoDB
- **Frontend:** React (planned)

## Getting Started

### Prerequisites
- Node.js (https://nodejs.org/)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/tshore2004/Budgetor.git
   cd Budgetor
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Set up environment variables:**
   - Create a `.env` file in the root directory.
   - Add your MongoDB connection string:
     ```env
     MONGO_URI=your-mongodb-connection-string
     ```
4. **Start the server:**
   ```sh
   npm start
   # or
   yarn start
   ```
5. **Open your browser:**
   Go to [http://localhost:3000](http://localhost:3000)

## Usage

- Add income and expenses with amount, date, and category.
- View transaction history and graphs for insights.

## Contributing

1. Fork the repository
2. Create a feature branch:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```sh
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```sh
   git push origin feature/your-feature-name
   ```
5. Open a pull request
