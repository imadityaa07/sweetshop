# 🍬 Sweet Shop Management System

A full-stack Sweet Shop Management System built using modern web technologies.
The application allows users to browse and purchase sweets, while admins can manage inventory, pricing, stock, and images through a secure dashboard.

# 📌 Project Overview

This project demonstrates end-to-end application development, including:

RESTful API design

Secure authentication using JWT

Role-based access control (Admin / User)

Database integration with Prisma & PostgreSQL

Modern, responsive frontend UI with animations

Clean coding practices and modular architecture

# 🚀 Features
# 👤 Authentication

User Registration

User Login

JWT-based authentication

Role management (USER, ADMIN)

# 🍭 Sweets Management

View all sweets

Search sweets by:

Name

Category

Price range

Purchase sweets (User)

Add new sweets (Admin)

Edit price, quantity, and image (Admin)

Delete sweets (Admin)

Stock auto-update on purchase/restock

# 🖼 Image Support

Each sweet can have an image URL

Fallback image shown if URL fails

Responsive image cards with hover effects

# 🎨 Frontend UI

Modern glass-morphism cards

Soft pink & sweet-themed background

Subtle hover glow & animations

Fully responsive layout

# 🛠 Tech Stack
# Backend

Node.js

TypeScript

Express.js

Prisma ORM

PostgreSQL

JWT Authentication

# Frontend

React (Vite + TypeScript)

Tailwind CSS

Axios

LocalStorage for auth token

# 🗂 Project Structure

sweetshop/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── prismaClient.ts
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/
│   │   ├── utils/
│   │   ├── index.css
│   │   └── App.tsx
│   └── package.json
│
└── README.md

# ⚙️ Setup Instructions (Local)
# 1️⃣ Backend Setup
cd backend
npm install

Create .env file:
DATABASE_URL=postgresql://username:password@localhost:5432/sweetshop
JWT_SECRET=your_secret_key

Run Prisma:
npx prisma migrate dev
npx prisma generate

Start backend:
npm run dev

Backend runs on:
http://localhost:4000

# 2️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

# 🔐 API Endpoints

Auth
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
Sweets
Method	Endpoint	Access
GET	/api/sweets	Public
GET	/api/sweets/search	Public
POST	/api/sweets	Admin
PUT	/api/sweets/:id	Admin
DELETE	/api/sweets/:id	Admin
Inventory
Method	Endpoint	Access
POST	/api/sweets/:id/purchase	User
POST	/api/sweets/:id/restock	Admin

# 🧪 Testing

API endpoints tested using Thunder Client / Postman

Manual test cases verified for:

Authentication

Role authorization

Stock validation

Error handling

(Automated tests can be added as an enhancement)

# 🤖 My AI Usage

AI Tools Used

ChatGPT

How AI Was Used
API design guidance
Debugging Prisma & TypeScript issues
UI/UX improvements with Tailwind CSS
Structuring README documentation
Best practices for role-based access control

Reflection

AI significantly improved development speed, clarity, and code quality.
However, all logic, decisions, and integrations were understood, verified, and customized manually.

# 📸Screenshots:-

<img width="1919" height="1052" alt="image" src="https://github.com/user-attachments/assets/0cdbccc9-653a-45e3-a4c0-911acfeef292" />


#  USER UI:-
<img width="1919" height="1048" alt="Screenshot 2025-12-16 015253" src="https://github.com/user-attachments/assets/3f3ab581-96df-4e2e-aa7b-2046b4747282" />
<img width="1901" height="1046" alt="Screenshot 2025-12-16 015312" src="https://github.com/user-attachments/assets/2f1c2083-a401-4fe3-bbc1-e8f75854d380" />

# Search By Filters:-
<img width="1904" height="1048" alt="Screenshot 2025-12-16 015358" src="https://github.com/user-attachments/assets/d33b22e2-5f10-4af5-b312-dedae635011f" />

# Admin Login:-

<img width="1919" height="1043" alt="Screenshot 2025-12-16 015931" src="https://github.com/user-attachments/assets/2438c1d1-e56c-4f70-9a08-f71ea6402ccf" />

# Admin Dashboard:-

<img width="1919" height="1051" alt="Screenshot 2025-12-16 015951" src="https://github.com/user-attachments/assets/65a0b469-680c-473f-93f4-0b400da0213f" />


<img width="1915" height="1045" alt="Screenshot 2025-12-16 020009" src="https://github.com/user-attachments/assets/8380cebe-7677-4557-a7ed-ffe294c0190b" />

# Edit button:- For stock and price (Add/reduce)


<img width="1914" height="1045" alt="Screenshot 2025-12-16 020032" src="https://github.com/user-attachments/assets/522670c6-d13a-4a31-a0de-1011a75a74d9" />




# 🌟 Future Improvements

File upload (local images instead of URLs)

Pagination for sweets list

Admin dashboard analytics

Unit & integration tests

Deployment (Vercel + Render/AWS)

# 👨‍💻 Author

Aditya Niphade
Final Year CSE (AIML) Student
Project built for learning full-stack development & placement preparation.
