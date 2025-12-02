# 👻 The Gopher Séance: Resurrection Hackathon Project 🔮

**Category:** Resurrection (Primary) / Costume Contest (Bonus) / Frankenstein (Bonus)

**Description:** The Gopher Séance is a full-stack web application dedicated to the Resurrection of the obsolete **Gopher protocol**. It brings the dead technology back to life by channeling cryptic messages from a custom Gopher Archive (the "digital afterlife") through an **AI Digital Medium Agent** (Gemini 2.5 Flash). This agent, strictly guided by a haunting, arcane persona, interprets the retrieved data into a spooky prophecy for the user. The application features a fully immersive, 1990s CRT-terminal-style UI, complete with custom audio, animated text effects, and text-to-speech, making it a strong contender for the Costume Contest bonus. The mixture of Python, React, Web Speech API, and the AI model also makes it a strong candidate for the Frankenstein bonus.

---

## 🛠️ Kiro Feature Implementation: A Necromancy of Code

This project was developed using a deep, strategic application of Kiro's features to manage complexity and enforce the core persona.

1.  **Vibe Coding (Core Development):**
    The base structure and implementation of several UI components (`SeancePage.js` and `LearnPage.js`), complex CSS animations (e.g., the new microphone button glow, the `flicker` and `scatter-char` effects), and initial logic were rapidly generated and iterated upon using Vibe Coding in natural conversation with Kiro. This accelerated the development of the immersive, spooky aesthetic.

2.  **Spec-Driven Development (Specs):**
    The entire system architecture was defined upfront in the specification files, guaranteeing a robust **Communication Flow** (Frontend to Agent) and a strictly validated **Core API Contract** (`/api/seance`).

3.  **Steering Docs (Digital Medium Persona):**
    The core of the project's creativity—the AI's haunting personality—was enforced by the `/.kiro/steering_docs/medium_persona.md` file. This document set **mandatory constraints**, ensuring the AI:
    * Begins **EVERY** response with: `"Hark, the Gopher nexus coughs up a cipher..."`.
    * Adheres to a **maximum 85-word limit** per prophecy.

4.  **MCP (Model Context Protocol) Tool:**
    A custom Python tool, **`search_gopher_archive`**, was created to provide the Gemini model with structured access to the Gopher data. This empowered the AI to ground its vague prophecies in **specific, relevant search results**.

5.  **Agent Hooks (CQA Automation):**
    The **`post-commit.py` hook** automatically runs the **`flake8` linter** on all Python backend files after every commit, enforcing consistent code quality (CQA) and PEP8 compliance.

---

## 🚀 Step-by-Step Run Instructions

The project requires a separate backend (Python/Flask) and frontend (React).

### Prerequisites

1.  **Python 3.8+**
2.  **Node.js & npm**
3.  **A Gemini API Key** (required in a `.env` file)

### 1. Backend Setup & Run

1.  Navigate to the **root directory** of the repository.
2.  Create a file named **`.env`** in the root directory with your API key:
    ```
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    ```
3.  Install Python dependencies and start the agent:

```bash
# Navigate to the backend folder
cd backend

# Install dependencies
pip install -r requirements.txt

# Run the agent API 
python agent.py 
# API will run on [http://127.0.0.1:5000/](http://127.0.0.1:5000/)

```
### 2. Frontend Setup & Run

1.Open a second terminal window and navigate to the frontend folder.

2.Install Node dependencies and start the React application:


```bash

# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

```

# Run the React application
npm start
# Application will open in your browser on http://localhost:3000/
