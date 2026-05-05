# Coinbase Clone - Backend API

A RESTful API backend for a Coinbase clone cryptocurrency platform built with Node.js, Express, and MongoDB.

## Features

- **JWT-based Authentication**: Secure user registration and login with JSON Web Tokens
- **Cryptocurrency Management**: CRUD operations for cryptocurrency data
- **Protected Routes**: Middleware-based route protection for authenticated users
- **MongoDB Integration**: Persistent data storage with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

## Project Structure

```
backend/
├── controllers/         # Business logic
│   ├── authController.js
│   └── cryptoController.js
├── middleware/          # Custom middleware
│   └── auth.js
├── models/              # Database schemas
│   ├── User.js
│   └── Crypto.js
├── routes/              # API routes
│   ├── auth.js
│   └── crypto.js
├── .env                 # Environment variables
├── server.js            # Main application entry
└── seed.js             # Database seeding script
```

## Installation

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   
   Create a `.env` file in the backend directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/coinbase-clone
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

3. **Start MongoDB**
   
   Ensure MongoDB is running on your system:
   - Windows: `mongod`
   - macOS/Linux: `sudo systemctl start mongodb`

4. **Seed the Database** (Optional)
   ```bash
   npm run seed
   ```
   This will populate the database with sample cryptocurrency data.

5. **Start the Server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |
| POST | `/api/auth/logout` | Logout user | No |

### Cryptocurrency Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/crypto` | Get all cryptocurrencies | No |
| GET | `/api/crypto/gainers` | Get top gainers (sorted by 24h change) | No |
| GET | `/api/crypto/new` | Get newest listings | No |
| GET | `/api/crypto/:id` | Get single cryptocurrency by ID | No |
| POST | `/api/crypto` | Add new cryptocurrency | Yes |

## Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-05-05T..."
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Login User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get All Cryptocurrencies
```bash
GET /api/crypto
```

**Response:**
```json
{
  "message": "Cryptocurrencies retrieved successfully",
  "cryptos": [
    {
      "_id": "...",
      "name": "Bitcoin",
      "symbol": "BTC",
      "price": 67542.32,
      "change24h": 2.34,
      "marketCap": 1324000000000,
      "volume24h": 28500000000,
      "circulatingSupply": 19600000,
      "image": "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      "description": "...",
      "createdAt": "2026-05-05T..."
    }
  ]
}
```

### Add New Cryptocurrency (Protected)
```bash
POST /api/crypto
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "Polkadot",
  "symbol": "DOT",
  "price": 7.85,
  "image": "https://cryptologos.cc/logos/polkadot-new-dot-logo.png",
  "change24h": 4.56
}
```

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

The token is returned upon successful registration or login.

## Error Handling

All errors follow a consistent format:
```json
{
  "message": "Error description",
  "error": "Detailed error message (in development)"
}
```

## Development

### Running in Development Mode
```bash
npm run dev
```
Uses nodemon for automatic server restart on file changes.

### Database Seeding
```bash
node seed.js
```
Populates the database with sample cryptocurrency data including Bitcoin, Ethereum, Solana, Cardano, XRP, and Dogecoin.

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: Secure, stateless authentication
- **HTTP-only Cookies**: Token storage in secure cookies
- **Input Validation**: Server-side validation on all inputs
- **CORS**: Configured for frontend communication
- **Environment Variables**: Sensitive data in .env file

## Production Considerations

1. Change `JWT_SECRET` to a strong, unique secret
2. Set `NODE_ENV=production`
3. Use HTTPS
4. Implement rate limiting
5. Add input sanitization
6. Use a production MongoDB instance
7. Enable CORS for specific domains only

## License

ISC
