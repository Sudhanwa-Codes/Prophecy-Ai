# Technology Stack

## Backend

- **Language:** Python 3.x
- **Framework:** Flask with CORS support
- **AI/LLM:** Google Gemini API (gemini-2.5-flash model)
- **Environment:** python-dotenv for configuration
- **Code Quality:** flake8 linting

### Backend Dependencies
```
Flask
google-genai
python-dotenv
flake8
requests==2.31.0
```

## Frontend

- **Framework:** React 18.2.0
- **Build Tool:** react-scripts 5.0.1
- **Styling:** CSS with custom animations
- **Browser APIs:** Web Speech API for text-to-speech

## Common Commands

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python agent.py
```
Backend runs on http://127.0.0.1:5000

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend runs on http://localhost:3000

### Code Quality
```bash
cd backend
flake8 *.py
```

## Environment Configuration

Required `.env` file in project root:
```
GEMINI_API_KEY=your_api_key_here
```

## API Endpoints

- `POST /api/seance` - Main endpoint accepting `user_query` parameter, returns `cryptic_response` and `interpretation`
