# 🌐 Multi Planner Agent (Multi-Agent System)

This project is a real-time AI-based travel planner built using **Google Gemini 2.5 Pro**, allowing users to ask travel-related queries and view detailed trace logs of the AI's reasoning process.

## ✨ Features

- 🌍 AI-powered travel query processing using **Gemini 1.5 Pro API**
- 📜 Trace logs to view the step-by-step reasoning
- 💬 Markdown-supported responses
- ⚙️ Backend with Node.js & Express
- 🖥️ Frontend with React (Vite or Create React App)

## 📁 Folder Structure

```
🔹 client/                 # React frontend
├── src/
│   ├── components/     # QueryForm & TraceViewer components
│   └── App.jsx         # Main UI
└── public/
🔹 server/                 # Node.js backend
├── coordinator.js      # Core Gemini logic
└── index.js            # Express API server
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/travel-planner-agent.git
cd travel-planner-agent
```

### 2. Setup Backend

```bash
cd server
npm install
touch .env
```

**.env file:**

```env
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

Start server:

```bash
node index.js
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm start
```

> Make sure your frontend runs on port `3000` and backend on `5000`.

## 🔗 API Endpoint

- `POST /api/ask`\
  **Body:** `{ "query": "your travel question" }`\
  **Returns:** JSON response with AI's answer + trace log

## 📸 Screenshots

| Query Form | Trace Logs |
| ---------- | ---------- |
|            |            |

## 💡 Technologies Used

- React + React Markdown
- Node.js + Express
- Google Gemini 1.5 Pro API
- CSS for styling

## 🧠 How it works

- User inputs a travel-related question
- Backend sends it to Gemini API
- Response and reasoning trace are returned to the frontend
- React app renders both the final answer and AI trace log

##

