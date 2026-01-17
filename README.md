# MoneyTrack - Expense Tracker Application

A comprehensive, production-ready expense tracking application built with Node.js/Express backend and React frontend. Perfect for managing personal finances with income and expense tracking, category-based visualization, and secure user authentication.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Expense Management**: Full CRUD operations for income and expense transactions
- **Data Visualization**: Interactive pie charts showing expense breakdown by category
- **Dashboard**: Real-time statistics including total income, expenses, and balance
- **Category Tracking**: Organize transactions by customizable categories
- **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS
- **MVC Architecture**: Clean, modular codebase following best practices

## 📁 Project Structure

```
ExpenseTracker/
├── ExpenseTracker_Backend/          # Node.js/Express Backend
│   ├── controllers/                 # Business logic
│   │   ├── authController.js        # Authentication handlers
│   │   └── expenseController.js    # Expense CRUD handlers
│   ├── models/                      # Mongoose Schemas
│   │   ├── User.js                  # User schema
│   │   └── Expense.js               # Expense schema
│   ├── middleware/                  # Custom middleware
│   │   └── authMiddleware.js        # JWT authentication
│   ├── routes/                      # API routes
│   │   ├── authRoutes.js            # Auth endpoints
│   │   └── expenseRoutes.js         # Expense endpoints
│   ├── server.js                    # Express server entry point
│   ├── package.json                 # Backend dependencies
│   └── .env.example                 # Environment variables template
│
└── ExpenseTracker_Frontend/         # React + Vite Frontend
    ├── src/
    │   ├── components/              # Reusable components
    │   │   ├── ExpenseChart.jsx     # Recharts pie chart
    │   │   ├── ExpenseList.jsx      # Transaction list table
    │   │   └── ProtectedRoute.jsx   # Route protection
    │   ├── context/                 # State management
    │   │   └── ExpenseContext.jsx   # Context API + useReducer
    │   ├── pages/                   # Page components
    │   │   ├── Login.jsx            # Login page
    │   │   ├── Signup.jsx           # Registration page
    │   │   ├── Home.jsx              # Dashboard
    │   │   ├── AddExpense.jsx        # Add transaction form
    │   │   ├── UpdateExpense.jsx    # Edit transaction form
    │   │   └── RemoveExpense.jsx    # Delete handler
    │   ├── utils/                   # Utilities
    │   │   └── api.js               # Axios configuration
    │   ├── App.jsx                  # Main app component
    │   └── main.jsx                 # React entry point
    ├── package.json                 # Frontend dependencies
    ├── tailwind.config.js           # Tailwind CSS config
    └── postcss.config.js            # PostCSS config
```

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **React Router DOM** - Client-side routing
- **Recharts** - Chart library
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Context API + useReducer** - State management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ExpenseTracker
```

### 2. Backend Setup

```bash
cd ExpenseTracker_Backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env file with your configuration
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/moneytrack
# JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
# NODE_ENV=development

# Start the server
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ExpenseTracker_Frontend

# Install dependencies
npm install

# Create .env file (optional, for custom API URL)
# VITE_API_URL=http://localhost:5000/api

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173` (default Vite port)

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /api/auth/signup` - Register a new user
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/me` - Get current user (Protected)

### Expense Routes (`/api/expenses`) - All Protected

- `GET /api/expenses` - Get all expenses for authenticated user
- `GET /api/expenses/stats` - Get expense statistics
- `GET /api/expenses/:id` - Get expense by ID
- `POST /api/expenses` - Create new expense
  ```json
  {
    "title": "Grocery Shopping",
    "amount": 150.50,
    "type": "Expense",
    "category": "Food",
    "date": "2024-01-15"
  }
  ```
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense

## 🗄️ Database Schemas

### User Schema
```javascript
{
  username: String (required, unique, 3-30 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  createdAt: Date (default: now)
}
```

### Expense Schema
```javascript
{
  title: String (required, max 100 chars),
  amount: Number (required, min 0.01),
  type: String (required, enum: ['Income', 'Expense']),
  category: String (required, max 50 chars),
  date: Date (required, default: now),
  user: ObjectId (required, ref: 'User'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🎨 Frontend Routes

- `/login` - Login page
- `/signup` - Registration page
- `/home` - Dashboard with chart and transaction list
- `/home/add` - Add new transaction
- `/home/update?id=<expense_id>` - Edit transaction
- `/home/remove?id=<expense_id>` - Delete transaction (with confirmation)

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds of 12
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Frontend and backend route protection
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Controlled cross-origin requests

## 🧪 Testing the Application

1. **Start MongoDB**: Ensure MongoDB is running locally or use MongoDB Atlas
2. **Start Backend**: `cd ExpenseTracker_Backend && npm run dev`
3. **Start Frontend**: `cd ExpenseTracker_Frontend && npm run dev`
4. **Register**: Create a new account at `/signup`
5. **Login**: Sign in with your credentials
6. **Add Transactions**: Start adding income and expenses
7. **View Dashboard**: See your statistics and charts on `/home`

## 📝 Code Quality

- **Clean Code**: Well-commented, readable codebase
- **MVC Architecture**: Separation of concerns
- **Error Handling**: Comprehensive error handling
- **Validation**: Input validation on both client and server
- **Responsive Design**: Mobile-first approach

## 🚀 Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Use a strong `JWT_SECRET`
3. Configure MongoDB Atlas or production MongoDB instance
4. Deploy to platforms like Heroku, Railway, or AWS

### Frontend
1. Build the project: `npm run build`
2. Set `VITE_API_URL` to your production API URL
3. Deploy to Vercel, Netlify, or any static hosting service

## 📄 License

This project is open source and available for portfolio use.

## 👤 Author

Built as a portfolio project demonstrating full-stack development skills.

---

**Note**: Remember to change the JWT_SECRET in production and never commit `.env` files to version control.

