<p align="center">
  <img src="public/logo.png" alt="Athar Coding" width="120" />
</p>

<h1 align="center">Athar Coding Academy</h1>

<p align="center">
  <strong>🐍 Learn Python from Zero to Cybersecurity Hero</strong>
</p>

<p align="center">
  An interactive coding education platform with story-based learning, real-world examples, and hands-on challenges.
</p>

---

## ✨ Features

### 🎓 Learning Experience
- **6 Progressive Levels** - From Python basics to Cybersecurity
- **23 Interactive Challenges** - Write real code in the browser
- **Codédex-Style Content** - Stories, emojis, and real-world analogies
- **Bilingual Support** - English & Arabic

### 🔐 Platform Features
- **JWT Authentication** - Secure login/register with refresh tokens
- **Admin Panel** - Manage courses, levels, tasks, and users
- **Progress Tracking** - XP system and completion tracking
- **In-Browser Python** - Powered by Pyodide

### 🎨 Design
- **Extraordinary Landing Page** - Winding journey path, not cards
- **Glassmorphism Auth** - Animated login/register pages
- **Dark Theme** - Modern gradient-based design

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React, TypeScript, Vite, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB with Mongoose |
| **Auth** | JWT (access + refresh tokens) |
| **Code Execution** | Pyodide (Python in WebAssembly) |
| **Editor** | Monaco Editor |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Clone & Install

```bash
git clone https://github.com/3aboshe/AtharCoding.git
cd AtharCoding/athar-coding

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install
```

### 2. Configure Environment

```bash
# In backend/.env
MONGODB_URI=mongodb://localhost:27017/athar-academy
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
PORT=5000
FRONTEND_URL=http://localhost:5173
```

### 3. Run the Application

```bash
# Terminal 1: Start backend
cd backend && npm run dev

# Terminal 2: Start frontend
npm run dev
```

### 4. Access
- **App**: http://localhost:5173
- **API**: http://localhost:5000/api
- **Admin**: http://localhost:5173/admin

---

## 📚 Course Structure

| Level | Title | Topics |
|-------|-------|--------|
| 🐍 | Python Foundations | Variables, strings, math |
| 🔀 | Control Flow | If/else, loops, conditions |
| 📦 | Data Structures | Lists, dictionaries, iteration |
| ⚡ | Functions | Parameters, return values, defaults |
| 🚀 | Advanced Concepts | Error handling, comprehensions, lambda |
| 🔐 | Cybersecurity | Password security, encryption, hashing, port scanning |

---

## 👨‍💼 Admin Setup

1. Register a normal account
2. In MongoDB, update the user:
   ```javascript
   db.users.updateOne(
     { email: "your@email.com" },
     { $set: { role: "admin" } }
   )
   ```
3. Access admin panel at `/admin`

---

## 📁 Project Structure

```
athar-coding/
├── src/
│   ├── components/     # UI components
│   ├── contexts/       # React contexts (Auth, App)
│   ├── data/           # Course content (tasks.ts)
│   ├── pages/          # Route pages
│   │   ├── admin/      # Admin panel pages
│   │   └── ...
│   └── hooks/          # Custom hooks
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.ts
│   └── uploads/        # Uploaded images
└── public/
```

---

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

## 📄 License

MIT © Athar Coding Academy

---

<p align="center">Made with 💚 for aspiring developers</p>
