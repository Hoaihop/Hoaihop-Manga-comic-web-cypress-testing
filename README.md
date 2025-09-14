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

1/ Clone the repository

git clone https://github.com/Hoaihop/Hoaihop-Manga-comic-web-cypress-testing.git
cd Project_CICD

2/ Backend setup

cd backend
npm install
Create a .env file inside backend/:
env
PORT=5000
MONGO_URI=mongodb://localhost:27017/project_cicd
Run the backend: npm run start

3️/ Frontend setup

cd ../client
npm i
Run the frontend:
npm run dev
App will be available at: http://localhost:5173

4/ Testing

Run Cypress (open mode) : npm run cypress:open
Run Cypress (headless) : npm run cypress:run
