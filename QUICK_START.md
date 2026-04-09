# Quick Start Guide - Shop-Ez (Vite Edition)

Get your Shop-Ez e-commerce platform up and running in minutes!

## Prerequisites

- Node.js 16+ installed
- MongoDB Atlas account (or local MongoDB)
- Terminal/Command Prompt

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Clone & Navigate
```bash
cd Shop-Ez
```

### Step 2: Setup Backend

```bash
# Navigate to server
cd server

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_jwt_key_here
PORT=8000
NODE_ENV=development
EOF

# Seed database with sample data
npm run seed

# Start server
npm run dev
```

✅ Server running at: http://localhost:8000

### Step 3: Setup Frontend (New Terminal)

```bash
# Navigate to client
cd client

# Dependencies already installed during migration
# If not, run: npm install

# Start Vite dev server
npm run dev
```

✅ Client running at: http://localhost:3000

---

## 🎯 Test the Application

### Default Login Credentials

**Admin Account**:
- Email: `admin@shop-ez.com`
- Password: `admin123`

**User Account**:
- Email: `user@shop-ez.com`
- Password: `user123`

### Test Flow:
1. Open http://localhost:3000
2. Click "Login"
3. Use credentials above
4. Browse products
5. Add to cart
6. Place order
7. View orders

---

## 🔧 Development Commands

### Backend (server/)
```bash
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production
npm run seed     # Seed database
```

### Frontend (client/)
```bash
npm run dev      # Start Vite dev server (HMR enabled)
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 📁 Project Structure

```
Shop-Ez/
├── client/              # React + Vite frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   ├── context/     # React Context
│   │   └── utils/       # Utilities
│   ├── index.html       # Entry HTML
│   ├── vite.config.js   # Vite config
│   └── package.json
│
└── server/              # Express backend
    ├── controllers/     # Business logic
    ├── models/          # MongoDB models
    ├── routes/          # API routes
    ├── middleware/      # Custom middleware
    └── package.json
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

### MongoDB Connection Error
- Check your `MONGODB_URI` in `.env`
- Ensure MongoDB Atlas IP whitelist includes your IP
- Verify database user credentials

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Vite Build Errors
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

---

## 🎨 What's New with Vite?

### Faster Development
- ⚡ Instant server start (no bundling)
- 🔥 Lightning-fast Hot Module Replacement
- 📦 Smaller, optimized builds

### Better Developer Experience
- Clear error messages
- Fast refresh
- Native ES modules

### Commands Changed
| Old (CRA) | New (Vite) |
|-----------|------------|
| `npm start` | `npm run dev` |
| `npm run build` | `npm run build` |
| N/A | `npm run preview` |

---

## 📚 Documentation

- `README.md` - Main project documentation
- `MANDATORY_REQUIREMENTS_CHECKLIST.md` - Requirements verification
- `VITE_MIGRATION_COMPLETE.md` - Migration details
- `client/MIGRATION_TO_VITE.md` - Technical migration notes
- `client/README.md` - Frontend documentation

---

## ✅ Verification Checklist

- [ ] Server starts on port 8000
- [ ] Client starts on port 3000
- [ ] Can login with default credentials
- [ ] Can browse products
- [ ] Can add to cart
- [ ] Can place order
- [ ] Admin dashboard accessible
- [ ] All pages load without errors

---

## 🎉 You're Ready!

Your Shop-Ez platform is now running with:
- ✅ MVC Architecture
- ✅ JWT Authentication
- ✅ React + Vite
- ✅ Protected Routes
- ✅ Bootstrap UI

Happy coding! 🚀
