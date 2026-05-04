# Food Hub Backend

A robust and clean backend for the Food Hub application, built with **Express**, **Prisma**, **PostgreSQL**, and **TypeScript**.

## Features

- **JWT Authentication**: Custom implementation using `jsonwebtoken` and `bcryptjs`.
- **Role-Based Access Control (RBAC)**: Supports `ADMIN`, `PROVIDER`, and `CUSTOMER` roles.
- **Service Layer Architecture**: Business logic is separated into services for better maintainability and testing.
- **Prisma ORM**: Type-safe database queries with a PostgreSQL backend (NeonDB).
- **Modern TypeScript**: Built with TypeScript ES2023 and NodeNext module resolution.

## Project Structure

```text
src/
├── generated/      # Auto-generated Prisma client
├── lib/            # Utilities (JWT, Prisma client, constants)
├── middlewear/     # Express middleware (Auth, Roles)
├── modules/        # Feature modules (Auth, Customer, Provider, Admin)
│   ├── auth/       # Registration and Login
│   ├── customer/   # Customer APIs (Meals, Orders, Reviews)
│   ├── provider/   # Provider APIs (Meal management, Profile)
│   └── admin/      # Admin APIs (User/Order management)
├── Router/         # Main router configuration
├── app.ts          # Express app configuration
└── server.ts       # Entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database (e.g., NeonDB)

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables in a `.env` file:
   ```env
   PORT=4000
   DATABASE_URL="your_postgresql_connection_string"
   JWT_SECRET="your_secure_jwt_secret"
   JWT_EXPIRES_IN="7d"
   FRONTEND_URL="http://localhost:3000"
   ```
4. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```

### Running the App

- **Development**:
  ```bash
  npm run dev
  ```
- **Production**:
  ```bash
  npm run build
  ```

## Authentication

The backend uses JWT for authentication. 
- **Header**: `Authorization: Bearer <your_jwt_token>`
- **Endpoints**:
    - `POST /api/auth/register`: Register a new user (default role: `CUSTOMER`).
    - `POST /api/auth/login`: Login and receive a JWT.
    - `POST /api/auth/logout`: Logout (client-side token removal).

## API Modules

### Customer
- `GET /api/meals`: List all meals (with search/filter).
- `POST /api/orders`: Place a new order.
- `GET /api/orders`: Get logged-in user's orders.
- `POST /api/reviews`: Submit a meal review.

### Provider
- `POST /api/provider/meals`: Add a new meal to your menu.
- `GET /api/provider/orders`: View orders for your meals.
- `PATCH /api/provider/orders/:id`: Update order status.

### Admin
- `GET /api/admin/users`: List all users.
- `PATCH /api/admin/users/:id`: Update user roles.
- `GET /api/admin/orders`: View all platform orders.

## License

This project is licensed under the MIT License.
