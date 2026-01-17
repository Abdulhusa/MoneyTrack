# MoneyTrack Backend API

RESTful API for the MoneyTrack expense tracker application built with Node.js, Express, and MongoDB.

## 🏗️ Architecture

This backend follows the **MVC (Model-View-Controller)** architecture pattern:

- **Models**: Mongoose schemas defining data structure
- **Controllers**: Business logic and request handling
- **Routes**: API endpoint definitions
- **Middleware**: Authentication and request processing

## 📁 Directory Structure

```
ExpenseTracker_Backend/
├── controllers/
│   ├── authController.js      # Authentication logic (signup, login, getMe)
│   └── expenseController.js   # Expense CRUD operations
├── models/
│   ├── User.js                # User schema with password hashing
│   └── Expense.js             # Expense schema with validation
├── middleware/
│   └── authMiddleware.js      # JWT token verification
├── routes/
│   ├── authRoutes.js          # Authentication endpoints
│   └── expenseRoutes.js       # Expense endpoints (protected)
├── server.js                  # Express server setup
├── package.json               # Dependencies
└── .env.example               # Environment variables template
```

## 🔑 Key Features

### Authentication
- JWT-based authentication
- bcrypt password hashing (12 salt rounds)
- Token expiration (7 days)
- Protected route middleware

### Expense Management
- Full CRUD operations
- User-specific data isolation
- Statistics aggregation
- Category-based filtering

### Data Validation
- Mongoose schema validation
- Input sanitization
- Error handling

## 📦 Dependencies

```json
{
  "express": "^4.18.2",        // Web framework
  "mongoose": "^8.0.3",        // MongoDB ODM
  "jsonwebtoken": "^9.0.2",    // JWT tokens
  "bcryptjs": "^2.4.3",        // Password hashing
  "dotenv": "^16.3.1",         // Environment variables
  "cors": "^2.8.5"             // CORS middleware
}
```

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Start MongoDB**
   ```bash
   # Local MongoDB
   mongod
   
   # Or use MongoDB Atlas connection string
   ```

4. **Run the server**
   ```bash
   npm run dev    # Development with nodemon
   npm start      # Production
   ```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Signup
```http
POST /api/auth/signup
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Expense Endpoints (All Protected)

#### Get All Expenses
```http
GET /api/expenses
Authorization: Bearer <token>

# Optional query parameters:
# ?type=Expense
# ?category=Food
# ?startDate=2024-01-01
# ?endDate=2024-01-31
```

#### Get Expense Statistics
```http
GET /api/expenses/stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalIncome": 5000,
    "totalExpense": 2500,
    "balance": 2500,
    "count": 15,
    "categoryBreakdown": [
      {
        "_id": "Food",
        "total": 800,
        "count": 5
      }
    ]
  }
}
```

#### Create Expense
```http
POST /api/expenses
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Grocery Shopping",
  "amount": 150.50,
  "type": "Expense",
  "category": "Food",
  "date": "2024-01-15"
}
```

#### Update Expense
```http
PUT /api/expenses/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "amount": 200.00
}
```

#### Delete Expense
```http
DELETE /api/expenses/:id
Authorization: Bearer <token>
```

## 🔒 Security

### Password Hashing
- Uses bcrypt with 12 salt rounds
- Passwords are hashed before saving to database
- Password field is excluded from queries by default

### JWT Authentication
- Tokens expire after 7 days
- Stored in Authorization header as `Bearer <token>`
- Middleware verifies token on protected routes

### Data Isolation
- All expense queries are filtered by user ID
- Users can only access their own data

## 🗄️ Database Models

### User Model
```javascript
{
  username: String (required, unique, 3-30 chars),
  email: String (required, unique, valid email),
  password: String (required, min 6 chars, hashed),
  createdAt: Date
}
```

### Expense Model
```javascript
{
  title: String (required, max 100 chars),
  amount: Number (required, min 0.01),
  type: String (required, enum: ['Income', 'Expense']),
  category: String (required, max 50 chars),
  date: Date (required),
  user: ObjectId (required, ref: 'User'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🛠️ Development

### Environment Variables
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/moneytrack
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🐛 Error Handling

All errors are handled consistently:
- Validation errors return 400 status
- Authentication errors return 401 status
- Not found errors return 404 status
- Server errors return 500 status

Error response format:
```json
{
  "message": "Error description"
}
```

## 📝 Notes

- All expense routes require authentication
- User data is automatically filtered by authenticated user
- Statistics are calculated using MongoDB aggregation
- Indexes are created on user and date fields for performance

