# Shop-Ez Client (React + Vite)

Modern e-commerce frontend built with React 18 and Vite.

## Tech Stack

- **Framework**: React 18.2
- **Build Tool**: Vite 5.0
- **Routing**: React Router DOM 6.20
- **UI Framework**: Bootstrap 5.3 + React-Bootstrap 2.9
- **HTTP Client**: Axios 1.6
- **State Management**: React Context API

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server (http://localhost:3000)
npm run dev
```

### Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
client/
├── src/
│   ├── components/      # Reusable UI components
│   │   └── Navbar.jsx
│   ├── context/         # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Orders.jsx
│   │   ├── Profile.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── Welcome.jsx
│   ├── utils/           # Utility functions
│   │   └── api.js       # Axios instance with interceptors
│   ├── App.jsx          # Main app component
│   ├── index.jsx        # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json

```

## Features

- 🔐 JWT Authentication
- 🛒 Shopping Cart Management
- 📦 Order Management
- 👤 User Profile
- 🔒 Protected Routes
- 👨‍💼 Admin Dashboard
- 🎨 Responsive Bootstrap UI
- ⚡ Fast HMR with Vite

## API Integration

The app connects to the backend API at `http://localhost:8000`. The proxy is configured in `vite.config.js`.

All API calls automatically include JWT token from localStorage via Axios interceptors.

## Environment

- Development server: http://localhost:3000
- Backend API: http://localhost:8000
- API Proxy: `/api` → `http://localhost:8000/api`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Migration Note

This project was migrated from Create React App to Vite for better performance and developer experience. See `MIGRATION_TO_VITE.md` for details.
