# Shop-Ez - E-Commerce Platform

A full-stack MERN application for online shopping with user authentication, product catalog, cart management, and order processing. Built following MVC architecture with comprehensive API documentation.

## Tech Stack
- **Client**: React 18 + Vite, React Router, Axios, Bootstrap 5
- **Server**: Node.js, Express.js, MongoDB Atlas
- **Authentication**: JWT, bcrypt
- **Validation**: express-validator
- **Build Tool**: Vite (migrated from Create React App)

## Features

### User Features
- User registration and authentication with JWT
- Browse products with search and category filters
- Product details with reviews and ratings
- Shopping cart management (add, update, remove items)
- Order placement with address and payment details
- Order history and tracking
- User profile management

### Admin Features
- Admin dashboard with statistics
- Product management (Create, Read, Update, Delete)
- Order management and status updates
- User management
- Revenue tracking

## Project Structure

```
Shop-Ez/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React Context (Auth, Cart)
│   │   ├── pages/          # Page components
│   │   └── utils/          # API utilities
│   └── package.json
│
├── server/                 # Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── scripts/            # Utility scripts
│   ├── index.js            # Server entry point
│   └── package.json
│
└── Documentation files
```

## Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Server Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=8000
NODE_ENV=development
```

4. Seed the database (optional):
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:8000`

### Client Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Client will run on `http://localhost:3000`

> Note: This project uses Vite for faster development and build times.

## API Documentation

Complete API documentation is available in [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

### Base URL
```
http://localhost:8000/api
```

### Main Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

#### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products/:id/review` - Add review

#### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:productId` - Remove from cart
- `DELETE /api/cart/clear` - Clear cart

#### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get single order

#### Admin (Requires Admin Role)
- `GET /api/admin/orders` - Get all orders
- `PATCH /api/admin/orders/:id` - Update order status
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/users` - Get all users
- `GET /api/admin/stats` - Get dashboard stats

## Default Credentials

### Admin Account
- Email: `admin@shop-ez.com`
- Password: `admin123`

### Test User Account
- Email: `user@shop-ez.com`
- Password: `user123`

## Database Collections

1. **users** - User accounts and authentication
   - username, email, password, usertype
2. **admins** - Admin-specific data (banners, categories)
   - banner, categories
3. **products** - Product catalog
   - title, description, mainImg, carousel, sizes, category, gender, price, discount
4. **carts** - User shopping carts
   - userId, title, description, mainImg, size, quantity, price, discount
5. **orders** - Order records
   - userId, name, email, mobile, address, pincode, title, description, mainImg, size, quantity, price, discount, paymentMethod, orderDate, deliveryDate, orderStatus

## MVC Architecture

### Model (Data Layer)
- Mongoose schemas defining data structure
- Database operations and validations
- Located in `server/models/`

### View (Routing Layer)
- API endpoint definitions
- Request routing to controllers
- Located in `server/routes/`

### Controller (Business Logic)
- Request processing
- Business logic implementation
- Response formatting
- Located in `server/controllers/`

## Middleware

- **Authentication** (`auth.js`) - JWT token verification
- **Authorization** (`adminAuth`) - Role-based access control
- **Validation** (`validation.js`) - Request data validation
- **Error Handler** (`errorHandler.js`) - Global error handling

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Role-based authorization
- Input validation and sanitization
- CORS configuration
- Error handling without sensitive data exposure

## Error Handling

Comprehensive error handling with appropriate HTTP status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Additional Documentation

- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Complete API reference
- [IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md) - Implementation details
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Project architecture
- [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) - Detailed setup guide

## Testing

### Using Postman/Thunder Client

1. Import the API endpoints
2. Set base URL: `http://localhost:8000/api`
3. For authenticated routes, add header:
   ```
   Authorization: Bearer <your_jwt_token>
   ```

### Test Flow

1. Register a new user or login with default credentials
2. Browse products
3. Add products to cart
4. Create an order
5. View order history
6. Login as admin to manage products and orders

## Development

### Server Development
```bash
cd server
npm run dev  # Uses nodemon for auto-restart
```

### Client Development
```bash
cd client
npm run dev  # Vite development server with HMR
```

## Production Build

### Client
```bash
cd client
npm run build
```

### Server
```bash
cd server
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please create an issue in the repository.

---

**Built with ❤️ using MERN Stack**
