# 👻 The Gopher Séance: Resurrection Hackathon Project 👻

**Category:** Resurrection

**Description:** The Gopher Séance revives the obsolete Gopher protocol (represented by a simple JSON data structure) and pairs it with an AI-powered Digital Medium Agent. This agent interprets cryptic messages retrieved from the "digital afterlife" (the Gopher Archive) and translates them into a haunting, narrative response for the user.

---

## 🛠️ Kiro Feature Implementation

This project was developed using a deep, strategic application of Kiro's features:

1.  **Spec-Driven Development:** The entire system architecture, data flow (GopherArchive), and API endpoints (`/api/seance`) were defined first in `/.kiro/spec.yaml`, driving the code generation for both the backend and frontend components.

2.  **Steering Docs:** The AI Agent's unique "Digital Medium" personality was strictly enforced using the `/.kiro/steering_docs/medium_persona.md` file.

3.  **Agent Hooks (CQA Automation):** The **`post-commit.py` hook** automatically runs a code quality check (`flake8`) on the Python backend files.

4.  **MCP (Model Context Protocol):** The agent was given a new custom tool, **`search_gopher_archive`**, enabling it to perform structured data search on the archive before interpreting the result.

---

## 🚀 Step-by-Step Run Instructions

### 1. Backend Setup (Python Agent)

Navigate to the `/backend` folder. **Ensure your `.env` file is configured.**

```bash
# Install dependencies
pip install -r requirements.txt

# Run the agent API 
python agent.py 
# API will run on [http://127.0.0.1:5000/](http://127.0.0.1:5000/)