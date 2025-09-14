# Project_CICD

Web Comic application with **React (Vite)** frontend and **Node.js + Express + MongoDB** backend.  
This project is designed with a clean architecture, supports testing (Cypress, Vitest, Jest)

---

## 🚀 Features

- **Frontend (client)**

  - Built with [React](https://react.dev/) + [Vite](https://vitejs.dev/).
  - React Router DOM for page navigation.
  - Axios for API communication.
  - Cypress + Testing Library for frontend testing.

- **Backend (server)**

  - REST API using [Express.js](https://expressjs.com/).
  - MongoDB + Mongoose for database.
  - Environment variables with dotenv.
  - Secure authentication (bcrypt for password hashing).
  - Structured with `controllers`, `routes`, `models`, `utils`.

- **Testing**
  - [Vitest](https://vitest.dev/) for unit testing.
  - [Jest](https://jestjs.io/) for additional test cases.
  - [Cypress](https://www.cypress.io/) for end-to-end tests.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Hoaihop/Hoaihop-Manga-comic-web-cypress-testing.git
cd Project_CICD
```

### 2️⃣ Backend setup

```bash
cd .\backend\
npm install
```

```bash
Set up file .env:
PORT=5000
MONGO_URI=mongodb://localhost:27017/truyendex
```

```bash
npm run start
```

### 3️⃣ Frontend setup

```bash
cd .\client\
npm install
npm run dev
```

### 4️⃣ Testing with Cypress

```bash
npm run cypress:open
npm run cypress:run
```
