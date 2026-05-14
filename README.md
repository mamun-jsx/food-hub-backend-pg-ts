# FoodHub Backend 🍳

A powerful, role-based RESTful API for the FoodHub ecosystem. Engineered for high performance and security to handle complex food ordering workflows, provider management, and administrative control.

## 🔗 Quick Links

- **Live API**: [https://food-hub-backend-pg-ts.vercel.app](https://food-hub-backend-pg-ts.vercel.app)
- **Frontend Code Repo**: [https://github.com/mamun-jsx/food-hub-frontend](https://github.com/mamun-jsx/food-hub-frontend)
- **Frontend Live Site**: [https://food-hub-frontend-tan.vercel.app](https://food-hub-frontend-tan.vercel.app)

## 🚀 Technologies

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL (Relational Data Persistence)
- **ORM**: Prisma (Type-safe Database Access)
- **Security**: JWT (JSON Web Tokens), Bcrypt.js (Password Hashing)
- **Middleware**: Custom Auth, Error Handling, and Role-Based Access Control

## ✨ Key Features

- **Role-Based Access Control (RBAC)**: Secure multi-tier access for Customers, Providers, and Administrators.
- **Verified Review Engine**: Sophisticated logic that only permits reviews from users who have successfully received a "DELIVERED" order for the specific meal.
- **Scalable Meal Management**: Full CRUD capabilities for providers with optimized category and search indexing.
- **Dynamic Order Processing**: Real-time status updates (PLACED → PREPARING → READY → DELIVERED) with transactional integrity.
- **Profile Synchronization**: Centralized user and merchant profiling with image URL support and secure field updates.

## 📂 Core Modules

- **Auth**: Secure JWT-based registration and login flows.
- **Customer**: Browsing, ordering, and review management.
- **Provider**: Restaurant identity management and menu oversight.
- **Admin**: Platform-wide monitoring of users and orders.

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL (Local or Hosted instance)

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/foodhub"
JWT_SECRET="your_secure_jwt_secret"
PORT=4000
```

### 4. Database Initialization
```bash
npx prisma generate
npx prisma db push
```

### 5. Running the Server
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## 📍 API Reference (Key Endpoints)

- `POST /api/register` & `POST /api/login`: Authentication.
- `GET /api/meals`: List all meals with search/filter support.
- `PATCH /api/profile-update`: Securely update user name and image.
- `POST /api/reviews`: Submit verified reviews for delivered orders.
- `PATCH /api/provider/orders/:id`: Update order status (Merchant only).

---
Developed by **[Abdullah Al Mamun](https://github.com/mamun-jsx)**
