# 🚁 AI-Powered Rotorcraft Scenario Trainer — Frontend

This is the frontend of the Rotorcraft Trainer MVP — a modern training platform for helicopter pilots built with **React**, **Vite**, and **Tailwind CSS**.

> 💡 Train smarter. Fly safer.

---

## 🛠️ Tech Stack

- ⚛️ **React** — Component-based frontend
- ⚡ **Vite** — Lightning-fast build tool
- 🎨 **Tailwind CSS** — Utility-first responsive styling
- 🌐 **Firebase (optional)** — For Auth, Firestore, Hosting (integrate separately)
- 🤖 **OpenAI API** — For AI-generated feedback and knowledge assistance

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rotorcraft-trainer-frontend.git
cd rotorcraft-trainer-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Start the Development Server

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📁 Project Structure

```
src/
├── assets/          # Images, logos, etc.
├── components/      # Reusable components (Flashcard, ScenarioCard, ChatBot)
├── pages/           # Route-level pages (Scenario, Checkride, Assistant)
├── routes/          # React Router config
├── services/        # API logic, GPT calls, Firebase utils
├── hooks/           # Custom React hooks
├── App.jsx          # Main app wrapper
└── main.jsx         # Entry point
```

---

## 🎨 Tailwind CSS Setup

Tailwind is configured in:

- `tailwind.config.js`
- `src/index.css`

To customize the theme, update `tailwind.config.js`.

---

## 🚀 Deployment (Optional)

You can deploy this frontend easily using:

- Firebase Hosting
- Vercel
- Render
- Netlify

**Example for Firebase:**

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```
## ✅ To Do

- [ ] Add Firebase integration (Auth, Firestore)
- [ ] Connect to LangChain / FastAPI backend
- [ ] Build Scenario Trainer UI
- [ ] Implement AI-generated checkride feedback
- [ ] Deploy to hosting platform

## 📄 License

MIT License — Free to use and modify.