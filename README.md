# Stock Trading Simulation Platform (Zerodha Clone)

A full-stack stock trading simulation platform inspired by Zerodha, enabling users to explore stock data, place simulated trades, and manage their portfolio in a secure and interactive environment.

# Features

* Secure Authentication (JWT + Cookie-based session management)
* Interactive Dashboard with dynamic stock charts
* Place Buy Orders with quantity tracking
* Order Management & Tracking
* Portfolio Management
* RESTful APIs for user and order operations
* Backend Testing using Jest (unit + API testing)

# Tech Stack

# Frontend

* React.js
* HTML
* CSS
* JavaScript

# Backend

* Node.js
* Express.js

# Database

* MongoDB

# Testing

* Jest

# Installation & Setup

1️. Clone the repository

```
git clone https://github.com/your-username/stock-trading-app.git
cd stock-trading-app
```

2️ Setup Backend

```
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend:

```
npm run dev
```
3️. Setup Frontend

```
cd frontend
npm install
npm start
```

# Core Functionalities

# Authentication

* JWT-based authentication
* Cookie-based session tracking
* Secure login/signup flow

# Stock Dashboard

* Displays stock data
* Dynamic charts for visualization
* Real-time/dynamic updates

# Order Management

* Place buy orders
* Track orders history
* Store transactions in MongoDB

# Testing (Jest)

* Unit testing for services
* API testing using HTTP requests
* Mocking dependencies for isolated tests

# How It Works

1. User registers or logs in
2. JWT token is generated and stored in cookies
3. User views stock dashboard
4. User places an order
5. Backend validates and processes order
6. Order is stored in MongoDB
7. Portfolio and order history are updated

# Future Improvements

* Sell stock functionality
* Advanced portfolio analytics
* Price alerts & notifications
* Live stock API integration
* Payment gateway integration



# Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request.

# License

This project is licensed under the MIT License.

---

# Author

Amit Kumar

⭐ Support

If you like this project, give it a ⭐ on GitHub!
