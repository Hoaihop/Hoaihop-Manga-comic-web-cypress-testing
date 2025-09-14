## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

````bash
git clone https://github.com/Hoaihop/Hoaihop-Manga-comic-web-cypress-testing.git
cd Project_CICD
2️⃣ Backend setup
bash
Copy code
cd backend
npm install
Tạo file .env trong thư mục backend/ với nội dung:

env
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/project_cicd
Chạy backend:

bash
Copy code
npm run start
3️⃣ Frontend setup
bash
Copy code
cd ../client
npm install
npm run dev
Ứng dụng sẽ chạy tại: 👉 http://localhost:5173

4️⃣ Testing
Mở Cypress UI:

bash
Copy code
npm run cypress:open
Chạy Cypress ở chế độ headless:

bash
Copy code
npm run cypress:run
less
Copy code

---

📌 Giờ bạn chỉ cần copy đoạn trên dán vào file **README.md** trong repo → commit → push lại là GitHub sẽ hiển thị đẹp ngay 😎

Bạn có muốn mình viết thêm phần **📖 Features** (liệt kê các chức năng chính: đọc truyện, đăng nhập, test bằng Cypress...) để README của bạn nổi bật hơn không?






You said:
cho toi mot cai haon chinh di


ChatGPT said:
Ok 👍 mình viết cho bạn một file README.md hoàn chỉnh luôn, vừa chuyên nghiệp vừa dễ nhìn. Bạn chỉ cần copy nội dung dưới đây vào file README.md trong repo của bạn rồi git add . && git commit -m "update README" && git push là đẹp ngay 🚀

markdown
Copy code
# 📚 Manga Comic Web — Cypress Testing

A full-stack **Manga/Comic web application** with **Node.js + MongoDB (backend)** and **React + Vite (frontend)**.
The project is integrated with **Cypress** for end-to-end testing, ensuring high reliability and automation in testing flows.

---

## ✨ Features
- 📖 Browse and read manga/comics online
- 🔐 User authentication (login/register)
- 🗄️ Backend with Express & MongoDB
- ⚡ Fast frontend with React + Vite
- ✅ Automated testing using Cypress (UI & E2E)
- 🛠️ Linting & formatting with ESLint

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Hoaihop/Hoaihop-Manga-comic-web-cypress-testing.git
cd Project_CICD
2️⃣ Backend setup
bash
Copy code
cd backend
npm install
Create a .env file inside backend/:

env
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/project_cicd
Run the backend:

bash
Copy code
npm run start
3️⃣ Frontend setup
bash
Copy code
cd ../client
npm install
npm run dev
The app will be available at: 👉 http://localhost:5173

4️⃣ Testing with Cypress
Run Cypress in open mode:

bash
Copy code
npm run cypress:open
Run Cypress in headless mode:

bash
Copy code
npm run cypress:run
🧪 Testing Strategy
E2E Tests: Full user flows (login, browse manga, read, logout, etc.)

UI Tests: Component rendering & interaction

API Tests: Validate backend endpoints using Cypress
````
