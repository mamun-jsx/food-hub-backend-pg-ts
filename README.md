# 🍔 Food Hub Multi-Vendor Backend System

Food Hub is a scalable backend system for a multi-vendor food ordering platform where users can browse food, filter by category, view provider/restaurant-wise meals, place orders, and leave reviews after delivery. Admins manage users and assign provider roles, while providers manage their own food items and orders. The system uses a modular architecture built with Node.js, Express, TypeScript, and Better Auth for secure authentication and role-based access control.


## Video 
https://youtu.be/cucXtUwvNOo 
---

## 🚀 Features

Customers can browse food items, filter by category, view restaurant/provider-wise food listings, place orders, and submit reviews after delivery. Providers can create and manage meals, handle incoming orders, and view customer feedback. Admins have full control over the system including creating providers, managing users, and performing full CRUD operations.

Authentication is handled using Better Auth with secure session management. Role-based access control ensures separation between Admin, Provider, and Customer.

---

---

## ⚙️ Setup & Installation

Clone the repository:

```bash
git clone https://github.com/mamun-jsx/food-hub-backend.git
cd food-hub-backend
npm install
npx prisma migrate dev
npx prisma migrate dev


## 🏗️ Project Structure
src/
├── middlewares/
│ ├── requireRole.ts
│ ├── setUser.ts
│
├── modules/
│ ├── admin/
│ │ ├── admin.controller.ts
│ │ ├── admin.route.ts
│ │
│ ├── provider/
│ │ ├── provider.controller.ts
│ │ ├── provider.route.ts
│ │
│ ├── customer/
│ │ ├── customer.controller.ts
│ │ ├── customer.route.ts
│ │
│ ├── auth/
│ ├── auth.controller.ts
│ ├── auth.route.ts
│
├── routes/
│ └── index.ts
│
├── app.ts
└── server.ts


--
```
