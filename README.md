# 🤖 Gemini Chatbot API

AI-powered chatbot API built with **Node.js, Express.js, and Google Gemini API**.

Project ini dibuat sebagai **Final Project Hacktiv8** untuk mempraktikkan integrasi REST API dengan Generative AI.

## ✨ Features

* 🤖 Google Gemini AI integration
* 💬 Multi-turn conversation
* 🍔 Food ordering chatbot
* 🌐 REST API with Express.js
* 🔐 Environment variable for API key
* 🖥️ Simple chatbot frontend

## 🛠️ Tech Stack

* Node.js
* Express.js
* Google Gemini API
* `@google/genai`
* HTML, CSS, JavaScript

## 🏗️ Architecture

```text
Client
  ↓
Express.js API
  ↓
Google Gemini API
  ↓
AI Response
  ↓
Client
```

## 🚀 Installation

Clone repository:

```bash
git clone https://github.com/wawan95/gemini-chatbot-api-batch16.git
cd gemini-chatbot-api-batch16
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
GEMINI_API_KEY=your_api_key
```

Run application:

```bash
node index.js
```

Open:

```text
http://localhost:3000
```

## 🔌 API Endpoint

### Chat

```http
POST /api/chat
```

Request:

```json
{
  "conversation": [
    {
      "role": "user",
      "text": "Saya ingin pesan makanan"
    }
  ]
}
```

Response:

```json
{
  "result": "Tentu! Silakan pilih makanan yang tersedia."
}
```

## 📁 Project Structure

```text
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── index.js
├── package.json
├── .env
└── README.md
```

## 🎯 Learning Goals

* REST API development
* Node.js & Express.js
* Google Gemini API integration
* Conversation history
* Prompt engineering
* API security & environment variables

## 👨‍💻 Author

**Sugeng Kurniawan**

IT Developer | QA Engineer

GitHub: https://github.com/wawan95
