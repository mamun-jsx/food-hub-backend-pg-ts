# FoodHub Backend 🍳

A powerful, role-based backend API for the FoodHub ecosystem, built with high-performance technologies to handle seamless food ordering, provider management, and administrative control.

## 🔗 Quick Links

- **Live API**: [https://food-hub-backend-pg-ts.vercel.app](https://food-hub-backend-pg-ts.vercel.app)
- **Frontend Live**: [https://food-hub-frontend-tan.vercel.app](https://food-hub-frontend-tan.vercel.app)
- **Frontend Repository**: [https://github.com/mamun-jsx/food-hub-frontend](https://github.com/mamun-jsx/food-hub-frontend)


## 🚀 Technologies

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Security**: JWT (JSON Web Tokens), Bcrypt.js
- **Validation**: Custom Middleware

## 📂 Core Modules

- **Auth**: Secure registration and login for Users, Providers, and Admins.
- **Customer**: Public meal browsing, order placement, profile management, and reviews.
- **Provider**: Professional tools to manage restaurant profiles, meal listings, and incoming order statuses.
- **Admin**: Complete platform control including user management and global order monitoring.

## ⚙️ Key Features

- **Role-Based Access Control (RBAC)**: Fine-grained permissions for Customer, Provider, and Admin roles.
- **Prisma Integration**: Type-safe database queries with a scalable PostgreSQL schema.
- **JWT Authentication**: Stateless authentication with custom `setUser` middleware for request context.
- **Order Flow**: Automated order processing from placement to delivery status updates.
- **Provider Profiling**: Dedicated logic for merchants to build and update their culinary identity.

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL instance (local or hosted)

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/foodhub"
JWT_SECRET="your_ultra_secure_secret"
PORT=4000
```

### 4. Database Setup
```bash
npx prisma generate
npx prisma db push
```

### 5. Running the Server
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## 📍 API Endpoints (Quick Reference)

### Auth
- `POST /login` - User authentication
- `POST /register` - New user creation

### Customer (Public/Protected)
- `GET /api/meals` - Get all meals
- `GET /api/providers/:id` - Get provider with menu
- `POST /api/orders` - Place a new order
- `GET /api/profile` - Get current user profile

### Provider
- `GET /api/provider/meals` - View all owned meals
- `POST /api/provider/profile` - Create/Update restaurant profile
- `PATCH /api/provider/orders/:id` - Update order status

### Admin
- `GET /api/admin/users` - View all users
- `GET /api/admin/orders` - Monitor all platform orders

---
Developed by **Abdullah Al Mamun**
