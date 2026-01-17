# MoneyTrack - Project Structure

## Complete File Structure

```
ExpenseTracker/
│
├── README.md                          # Main project documentation
├── PROJECT_STRUCTURE.md               # This file
│
├── ExpenseTracker_Backend/            # Node.js/Express Backend
│   ├── README.md                      # Backend documentation
│   ├── package.json                   # Backend dependencies
│   ├── .gitignore                     # Git ignore rules
│   ├── server.js                      # Express server entry point
│   │
│   ├── models/                        # Mongoose Schemas
│   │   ├── User.js                    # User schema with bcrypt hashing
│   │   └── Expense.js                 # Expense schema with validation
│   │
│   ├── controllers/                   # Business Logic (MVC)
│   │   ├── authController.js          # signup, login, getMe
│   │   └── expenseController.js       # CRUD operations + stats
│   │
│   ├── middleware/                    # Custom Middleware
│   │   └── authMiddleware.js          # JWT authentication
│   │
│   └── routes/                        # API Routes
│       ├── authRoutes.js              # /api/auth/* endpoints
│       └── expenseRoutes.js           # /api/expenses/* endpoints
│
└── ExpenseTracker_Frontend/           # React + Vite Frontend
    ├── README.md                      # Frontend documentation
    ├── package.json                   # Frontend dependencies
    ├── vite.config.js                 # Vite configuration
    ├── tailwind.config.js             # Tailwind CSS config
    ├── postcss.config.js              # PostCSS config
    ├── index.html                     # HTML entry point
    │
    └── src/
        ├── main.jsx                   # React entry point
        ├── App.jsx                    # Main app with routing
        ├── index.css                  # Tailwind directives
        │
        ├── context/                   # State Management
        │   └── ExpenseContext.jsx     # Context API + useReducer
        │
        ├── components/                # Reusable Components
        │   ├── ExpenseChart.jsx       # Recharts pie chart
        │   ├── ExpenseList.jsx        # Transaction table
        │   └── ProtectedRoute.jsx     # Route protection
        │
        ├── pages/                     # Page Components
        │   ├── Login.jsx              # /login route
        │   ├── Signup.jsx             # /signup route
        │   ├── Home.jsx               # /home route (Dashboard)
        │   ├── AddExpense.jsx         # /home/add route
        │   ├── UpdateExpense.jsx      # /home/update?id= route
        │   └── RemoveExpense.jsx      # /home/remove?id= route
        │
        └── utils/                     # Utilities
            └── api.js                 # Axios configuration
```

## Key Files Explained

### Backend

#### `server.js`
- Express server setup
- MongoDB connection
- Middleware configuration
- Route mounting
- Error handling

#### `models/User.js`
- User schema definition
- Password hashing with bcrypt
- Password comparison method
- Validation rules

#### `models/Expense.js`
- Expense schema definition
- User reference (ObjectId)
- Type enum (Income/Expense)
- Indexes for performance

#### `controllers/authController.js`
- `signup()` - User registration
- `login()` - User authentication
- `getMe()` - Get current user

#### `controllers/expenseController.js`
- `getExpenses()` - List all expenses
- `getExpenseById()` - Get single expense
- `addExpense()` - Create expense
- `updateExpense()` - Update expense
- `removeExpense()` - Delete expense
- `getExpenseStats()` - Statistics aggregation

#### `middleware/authMiddleware.js`
- JWT token verification
- User attachment to request
- Error handling

### Frontend

#### `App.jsx`
- React Router setup
- Route definitions
- Protected route wrapping
- Context provider

#### `context/ExpenseContext.jsx`
- Global state management
- useReducer for state updates
- API integration
- LocalStorage persistence

#### `pages/Home.jsx`
- Dashboard layout
- Statistics cards
- Chart integration
- Transaction list

#### `components/ExpenseChart.jsx`
- Recharts pie chart
- Category breakdown visualization
- Responsive design

#### `components/ExpenseList.jsx`
- Transaction table
- Edit/Delete actions
- Currency formatting

#### `utils/api.js`
- Axios instance
- Token injection
- Error interceptors
- Base URL configuration

## Route Structure

### Backend API Routes
```
/api/auth/signup          POST    - Register user
/api/auth/login           POST    - Login user
/api/auth/me              GET     - Get current user (protected)

/api/expenses             GET     - List expenses (protected)
/api/expenses/stats       GET     - Get statistics (protected)
/api/expenses/:id         GET     - Get expense (protected)
/api/expenses             POST    - Create expense (protected)
/api/expenses/:id         PUT     - Update expense (protected)
/api/expenses/:id         DELETE  - Delete expense (protected)
```

### Frontend Routes
```
/login                    - Login page
/signup                   - Registration page
/home                     - Dashboard (protected)
/home/add                 - Add transaction (protected)
/home/update?id=<id>      - Edit transaction (protected)
/home/remove?id=<id>      - Delete transaction (protected)
```

## Architecture Patterns

### MVC (Backend)
- **Models**: Data structure (Mongoose schemas)
- **Views**: JSON responses (API)
- **Controllers**: Business logic

### Component-Based (Frontend)
- **Pages**: Route components
- **Components**: Reusable UI
- **Context**: Global state
- **Utils**: Helper functions

## Data Flow

1. **User Action** → React Component
2. **Component** → Context Action
3. **Context** → API Call (Axios)
4. **API** → Express Route
5. **Route** → Controller
6. **Controller** → Model (MongoDB)
7. **Response** → Context Update
8. **Context** → Component Re-render

## Security Features

- JWT token authentication
- Password hashing (bcrypt)
- Protected routes (frontend & backend)
- Input validation
- CORS configuration
- User data isolation

## Dependencies Summary

### Backend
- express, mongoose, jsonwebtoken, bcryptjs, cors, dotenv

### Frontend
- react, react-dom, react-router-dom, recharts, axios, tailwindcss

