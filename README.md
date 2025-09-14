# 📝 Todo App with React, Vite, MUI, and MongoDB

This is a full-stack **Todo App** built with **React (Vite)** for the frontend, **Node.js/Express** for the backend, and **MongoDB** as the database. The app allows you to:

- Add tasks with **title, description, and priority**
- Delete tasks
- Mark tasks as **completed**
- Neon-glow styled UI using **Material-UI (MUI)**
- User authentication using **JWT tokens**

---

## 🛠 Tech Stack

- **Frontend**: React + Vite + MUI
- **Backend**: Node.js + Express
- **Database**: MongoDB (Atlas or local)
- **Authentication**: JWT
- **Styling**: Material-UI (MUI) + custom neon glow

---

## ⚡ Features

1. Add, delete, and mark tasks as completed
2. Task priority: Low, Medium, High
3. Neon glow card and task UI
4. JWT-based authentication for secure access
5. MongoDB stores all tasks and their status

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-repo-folder>
2. Backend Setup
a. Install dependencies
bash
Copy code
cd backend
npm install express mongoose cors dotenv jsonwebtoken bcryptjs
b. Setup .env
Create a .env file inside backend folder:

ini
Copy code
PORT=3000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
c. Start the backend server
bash
Copy code
node index.js
# or if you use nodemon
npx nodemon index.js
Backend endpoints:

Method	Endpoint	Description
POST	/todolist/todocreate	Create a new task
GET	/todolist/todoget	Get all tasks
DELETE	/todolist/tododeleting/:id	Delete a task by ID
PUT	/todolist/todoupdate/:id	Update task status

3. Frontend Setup (React + Vite + MUI)
a. Install dependencies
bash
Copy code
cd frontend
npm install
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material axios react-router-dom
b. Start the frontend
bash
Copy code
npm run dev
Your app should now be running at http://localhost:5173 (or the port Vite provides).

🔧 Folder Structure
pgsql
Copy code
backend/
├─ index.js          # Entry point
├─ routes/
│  └─ todoRoutes.js
├─ models/
│  └─ Todo.js
└─ .env

frontend/
├─ src/
│  ├─ App.jsx
│  ├─ main.jsx
│  ├─ pages/
│  │  └─ HomePage.jsx
│  └─ components/
├─ package.json
├─ vite.config.js
🌈 UI Features
Neon-glow card for the main container

Neon border and shadow for each task based on priority:

Low → Green

Medium → Yellow

High → Red

Line-through text when completed

Responsive design using MUI Container and Card

⚡ Usage
Open the app in browser

Add a new task using the Add Todo button

Set task priority and description

Toggle task completion using ✅ icon

Delete tasks using ❌ icon

📝 Notes
Make sure MongoDB is running locally or use MongoDB Atlas.

JWT token must be stored in localStorage after login.

Neon glow colors can be customized in HomePage.jsx under getNeonColor().

💻 Screenshots
Add screenshots of your app here.

🚀 Live Demo
Add link if deployed (Netlify/Vercel).

🔗 References
Vite

React

Material-UI

MongoDB

Axios

Express.js

pgsql
Copy code

---

If you want, I can **also create a version with setup commands for MongoDB Atlas, JWT login, and full backend code** integrated with this README so it’s ready to run.

Do you want me to do that next?
```
