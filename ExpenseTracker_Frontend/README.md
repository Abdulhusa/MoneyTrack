# MoneyTrack Frontend

Modern React application for expense tracking built with Vite, React Router, and Tailwind CSS.

## 🏗️ Architecture

- **React 19** with functional components and hooks
- **Context API + useReducer** for state management
- **React Router DOM** for client-side routing
- **Recharts** for data visualization
- **Axios** for API communication
- **Tailwind CSS** for styling

## 📁 Directory Structure

```
src/
├── components/              # Reusable UI components
│   ├── ExpenseChart.jsx     # Pie chart visualization
│   ├── ExpenseList.jsx      # Transaction table
│   └── ProtectedRoute.jsx   # Route guard
├── context/                 # Global state
│   └── ExpenseContext.jsx   # Context + useReducer
├── pages/                   # Page components
│   ├── Login.jsx            # Login page
│   ├── Signup.jsx           # Registration page
│   ├── Home.jsx             # Dashboard
│   ├── AddExpense.jsx       # Add transaction form
│   ├── UpdateExpense.jsx    # Edit transaction form
│   └── RemoveExpense.jsx    # Delete handler
├── utils/                   # Utilities
│   └── api.js               # Axios configuration
├── App.jsx                  # Main app with routing
└── main.jsx                 # React entry point
```

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure API URL (optional)**
   ```bash
   # Create .env file
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎨 Features

### State Management
- **Context API**: Global state for user and expenses
- **useReducer**: Predictable state updates
- **Local Storage**: Persistent authentication

### Routing
- `/login` - Login page
- `/signup` - Registration page
- `/home` - Dashboard (protected)
- `/home/add` - Add transaction (protected)
- `/home/update?id=<id>` - Edit transaction (protected)
- `/home/remove?id=<id>` - Delete transaction (protected)

### Components

#### ExpenseChart
- Pie chart showing expense breakdown by category
- Uses Recharts library
- Responsive design

#### ExpenseList
- Table displaying all transactions
- Edit and delete actions
- Formatted currency and dates

#### ProtectedRoute
- Redirects unauthenticated users to login
- Wraps protected pages

## 🎯 Key Features

### Authentication
- JWT token stored in localStorage
- Automatic token attachment to API requests
- Auto-redirect on 401 errors

### Expense Management
- Add, edit, and delete transactions
- Real-time statistics
- Category-based filtering
- Date-based transactions

### UI/UX
- Responsive design (mobile-first)
- Loading states
- Error handling
- Form validation
- Modern gradient backgrounds

## 📦 Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-router-dom": "^6.22.0",
  "recharts": "^2.10.3",
  "axios": "^1.6.5"
}
```

## 🎨 Styling

### Tailwind CSS Configuration
- Custom color palette (primary colors)
- Responsive utilities
- Modern design system

### Color Scheme
- Primary: Blue shades (500-700)
- Success: Green (income)
- Danger: Red (expenses)
- Neutral: Gray scale

## 🔧 Configuration

### API Configuration
The API base URL is configured in `src/utils/api.js`:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

### Environment Variables
Create a `.env` file in the frontend root:
```env
VITE_API_URL=http://localhost:5000/api
```

## 📱 Responsive Design

- **Mobile**: Single column layout
- **Tablet**: 2-column grid for charts
- **Desktop**: Full dashboard with sidebar

## 🧩 Component Details

### ExpenseContext
Manages:
- User authentication state
- Expense list
- Statistics
- Loading and error states
- CRUD operations

### API Utility
- Axios instance with base URL
- Automatic token injection
- Error interceptors
- Request/response handling

## 🚀 Deployment

### Build
```bash
npm run build
```

Output: `dist/` directory

### Deploy to Vercel
```bash
vercel --prod
```

### Deploy to Netlify
```bash
netlify deploy --prod
```

## 🐛 Troubleshooting

### CORS Issues
Ensure backend CORS is configured to allow frontend origin.

### API Connection
Check that `VITE_API_URL` matches your backend URL.

### Authentication
Clear localStorage if experiencing auth issues:
```javascript
localStorage.clear();
```

## 📝 Notes

- All protected routes require authentication
- Tokens expire after 7 days (backend setting)
- Charts update automatically when data changes
- Form validation on both client and server
