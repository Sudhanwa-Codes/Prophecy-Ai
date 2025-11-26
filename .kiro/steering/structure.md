# Project Structure

## Root Directory

```
/
├── .env                    # Environment variables (GEMINI_API_KEY)
├── .gitignore             # Git ignore rules
├── README.md              # Project documentation
├── LICENSE                # License file
├── .kiro/                 # Kiro configuration
│   ├── steering/          # Steering documents (this folder)
│   └── steering_docs/     # Legacy location for medium_persona.md
├── backend/               # Python Flask API
└── frontend/              # React application
```

## Backend Structure

```
backend/
├── agent.py                      # Main Flask API with /api/seance endpoint
├── requirements.txt              # Python dependencies
├── gopher_archive.json          # JSON data representing Gopher protocol archive
├── generate_archive.py          # Script to generate archive data
├── semantic_cipher_generator.py # Utility for creating cryptic content
└── wordlist.txt                 # Word list for cipher generation
```

### Backend Key Components

- **agent.py**: Core API with MCP tool implementation (`search_gopher_archive`), LLM integration, and persona loading
- **gopher_archive.json**: Data source for séance queries (path + content entries)
- Persona prompt loaded from `../.kiro/steering_docs/medium_persona.md`

## Frontend Structure

```
frontend/
├── package.json           # NPM dependencies and scripts
├── package-lock.json      # Locked dependency versions
├── public/                # Static assets
│   ├── index.html        # HTML template
│   ├── monitor_frame.jpg # CRT monitor background
│   ├── laughing_skull.gif # Skull animation
│   ├── spooky_bg_music.wav # Background audio
│   └── spooky_laugh.wav  # Laugh sound effect
└── src/                   # React source code
    ├── index.js          # React entry point
    ├── App.js            # Main component with séance logic
    └── App.css           # Styling and animations
```

### Frontend Key Components

- **App.js**: Main React component handling user input, API calls, audio/visual effects
- **ScatteredText**: Component for animated character-by-character text rendering
- Audio control functions for background music and voice synthesis
- Visual effects: screen vibration, skull animations, CRT aesthetics

## Configuration Files

- `.kiro/steering_docs/medium_persona.md` - LLM persona definition (referenced by backend)
- `.kiro/steering/*.md` - General steering documents for AI assistant
- `.env` - API keys and environment variables (not in git)
