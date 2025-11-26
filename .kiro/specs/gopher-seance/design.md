# Design Document

## Overview

The Gopher Séance is a Halloween-themed web application that combines retro computing nostalgia with modern AI capabilities. The system architecture follows a client-server model where a React frontend communicates with a Flask backend that orchestrates searches through a cryptic message archive and interprets results using Google's Gemini AI.

The application creates an immersive experience by styling the interface as a 1990s CRT terminal, animating text with scatter effects, and using text-to-speech to vocalize prophecies. The backend implements an MCP (Model Context Protocol) tool pattern for searching the archive, enabling the AI to access relevant cryptic messages based on user queries.

## Architecture

### System Components

The system consists of three primary layers:

**Presentation Layer (SeanceFrontend)**
- React 18+ single-page application
- Runs on port 3000 during development
- Handles user input, state management, and visual/audio effects
- Communicates with backend via REST API

**Application Layer (DigitalMediumAgent)**
- Flask web server with CORS support
- Runs on port 5000
- Orchestrates archive searches and AI interpretation
- Implements MCP tool pattern for structured data access

**Data Layer (GopherArchive)**
- JSON file-based data store (gopher_archive.json)
- Contains 6000+ entries with id, path, and content fields
- Read-only access pattern
- Loaded into memory at application startup

### Communication Flow


1. User enters query in SeanceFrontend
2. Frontend sends POST request to /api/seance endpoint
3. DigitalMediumAgent validates request and extracts keywords
4. search_gopher_archive MCP tool performs regex matching
5. Matching entries (or random fallback) returned to agent
6. Agent sends archive results to Gemini API with persona prompt
7. Gemini returns interpretation maintaining mystical tone
8. Agent formats response with cryptic_response and interpretation
9. Frontend receives JSON response and updates UI
10. Web Speech API vocalizes the interpretation
11. CSS animations and audio effects enhance atmosphere

### Technology Stack

**Frontend:**
- React 18+ (UI framework)
- Web Speech API (text-to-speech)
- CSS3 animations (visual effects)
- Fetch API (HTTP client)

**Backend:**
- Python 3.8+
- Flask (web framework)
- Flask-CORS (cross-origin support)
- google-genai SDK (AI integration)
- python-dotenv (configuration management)

**External Services:**
- Google Gemini 2.5 Flash (AI interpretation)

## Components and Interfaces

### SeanceFrontend Component

**Responsibilities:**
- Render CRT-styled terminal interface
- Manage application state (query, result, loading, error)
- Handle user input and form submission
- Trigger visual and audio effects
- Make API calls to backend
- Invoke text-to-speech for responses

**State Management:**
```javascript
const [query, setQuery] = useState('')           // User input
const [result, setResult] = useState(null)       // API response
const [loading, setLoading] = useState(false)    // Request in progress
const [error, setError] = useState(null)         // Error message
```

**Key Methods:**
- `handleSubmit()`: Validates input, makes API call, manages loading state
- `speakResponse()`: Configures and triggers Web Speech API
- `applyVisualEffects()`: Triggers CSS animations and audio

**API Contract:**

```javascript
// Request
POST http://localhost:5000/api/seance
Content-Type: application/json
{
  "user_query": "string (min 4 characters)"
}

// Success Response (200)
{
  "cryptic_response": "string (original archive entry)",
  "interpretation": "string (AI-generated mystical interpretation)"
}

// Error Response (400/500)
{
  "error": "string (user-friendly error message)"
}
```

### DigitalMediumAgent Service

**Responsibilities:**
- Expose REST API endpoint for séance requests
- Validate incoming requests
- Load and manage GopherArchive in memory
- Invoke search_gopher_archive MCP tool
- Communicate with Gemini API
- Format and return responses
- Handle errors gracefully

**Configuration:**
- `GEMINI_API_KEY`: API key loaded from .env file
- `GOPHER_ARCHIVE_PATH`: Path to JSON data file
- `MODEL_NAME`: Gemini model identifier (gemini-2.5-flash)
- `PORT`: Server port (5000)

**Endpoints:**
```python
POST /api/seance
  Request Body: { "user_query": str }
  Returns: { "cryptic_response": str, "interpretation": str }
  Status Codes: 200 (success), 400 (validation), 500 (server error)
```

**Key Functions:**
- `load_gopher_archive()`: Loads JSON file into memory at startup
- `search_gopher_archive(keyword)`: MCP tool for archive search
- `get_medium_persona_prompt()`: Loads AI persona instructions
- `handle_seance_request()`: Main request handler

### search_gopher_archive MCP Tool

**Purpose:**
Provides structured access to the GopherArchive for the AI agent, enabling keyword-based searches with fallback behavior.

**Function Signature:**
```python
def search_gopher_archive(keyword: str) -> list[dict] | dict:
    """
    Search the Gopher archive for entries matching the keyword.
    
    Args:
        keyword: Search term (minimum 4 characters)
        
    Returns:
        List of matching entries or single random entry if no matches
        
    Raises:
        ValueError: If keyword is too short or archive is empty
    """
```

**Implementation Logic:**
1. Validate keyword length (>= 4 characters)
2. Check archive is not empty
3. Compile regex pattern with word boundaries: `\b{keyword}\b` (case-insensitive)
4. Search both 'content' and 'path' fields
5. Return all matches if found
6. Return random entry if no matches
7. Raise appropriate errors for invalid inputs

**Return Format:**
```python
[
  {
    "id": int,
    "path": str,  # e.g., "/menu/prophecy/2024"
    "content": str  # Cryptic message
  }
]
```

### GopherArchive DataStore

**Schema:**
```json
[
  {
    "id": "integer (unique identifier)",
    "path": "string (Gopher menu path format)",
    "content": "string (cryptic prophecy message)"
  }
]
```

**Validation Rules:**
- All entries must have id, path, and content fields
- id values must be unique integers
- path should follow Gopher format (e.g., /menu/category/item)
- content should be non-empty string
- Minimum 100 entries recommended for variety

**Access Pattern:**
- Loaded once at application startup
- Stored in memory for fast access
- Read-only operations
- No runtime modifications

## Data Models

### Request Model
```typescript
interface SeanceRequest {
  user_query: string;  // Minimum 4 characters
}
```

### Response Model
```typescript
interface SeanceResponse {
  cryptic_response: string;  // Original archive entry
  interpretation: string;    // AI-generated interpretation
}
```

### Error Model
```typescript
interface ErrorResponse {
  error: string;  // User-friendly error message
}
```

### Archive Entry Model
```typescript
interface ArchiveEntry {
  id: number;           // Unique identifier
  path: string;         // Gopher menu path
  content: string;      // Cryptic message
}
```

### Frontend State Model
```typescript
interface AppState {
  query: string;                    // Current user input
  result: SeanceResponse | null;    // Last successful response
  loading: boolean;                 // Request in progress
  error: string | null;             // Error message if any
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Input Validation Properties

**Property 1: Valid query acceptance**
*For any* query string with 4 or more characters, the DigitalMediumAgent should accept and process the query without returning a validation error.
**Validates: Requirements 1.1**

**Property 2: Invalid query rejection**
*For any* query string with fewer than 4 characters, the DigitalMediumAgent should reject the query and return a validation error.
**Validates: Requirements 1.2**

**Property 3: Search keyword validation**
*For any* keyword with fewer than 4 characters, the search_gopher_archive tool should reject the search and return a validation error.
**Validates: Requirements 2.5**

**Property 4: Request field validation**
*For any* POST request to /api/seance, if the user_query field is missing, the system should return a 400 validation error.
**Validates: Requirements 7.3**

### Search and Retrieval Properties

**Property 5: Word-boundary matching**
*For any* valid keyword, the search_gopher_archive tool should perform regex word-boundary matching on both content and path fields, not substring matching.
**Validates: Requirements 2.1**

**Property 6: Complete result return**
*For any* keyword that matches entries in the archive, the search_gopher_archive tool should return all matching entries, not a subset.
**Validates: Requirements 2.2**

**Property 7: Fallback behavior**
*For any* keyword that matches no entries in a non-empty archive, the search_gopher_archive tool should return exactly one random entry.
**Validates: Requirements 2.3**

### Data Integrity Properties

**Property 8: Required fields presence**
*For any* entry in the loaded GopherArchive, the entry should contain id, path, and content fields.
**Validates: Requirements 4.1**

**Property 9: Unique identifiers**
*For any* GopherArchive, all id values should be unique integers with no duplicates.
**Validates: Requirements 4.2**

**Property 10: Path format compliance**
*For any* archive entry, the path field should follow the Gopher menu path format (starting with /).
**Validates: Requirements 4.3**

**Property 11: Result schema compliance**
*For any* result returned by search_gopher_archive, each entry should have id, path, and content fields.
**Validates: Requirements 10.4**

### Response Format Properties

**Property 12: API response structure**
*For any* successful séance request, the DigitalMediumAgent should return a JSON response with both cryptic_response and interpretation string fields.
**Validates: Requirements 3.2, 10.5**

**Property 13: HTTP compliance**
*For any* API response, the system should include appropriate HTTP status codes (200 for success, 400 for validation, 500 for errors) and content-type: application/json header.
**Validates: Requirements 7.4**

**Property 14: Error response format**
*For any* backend exception, the DigitalMediumAgent should return a 500 status code with a generic error message that doesn't expose technical details.
**Validates: Requirements 8.3**

**Property 15: Frontend error display**
*For any* API error response, the SeanceFrontend should display a user-friendly error message without exposing stack traces or sensitive information.
**Validates: Requirements 8.2**

### State Management Properties

**Property 16: Loading state activation**
*For any* query submission, the SeanceFrontend should set the loading state to true and disable the submit button.
**Validates: Requirements 1.3, 9.2**

**Property 17: Loading state deactivation**
*For any* completed request (success or error), the SeanceFrontend should set the loading state to false and re-enable the submit button.
**Validates: Requirements 9.3**

**Property 18: Input state synchronization**
*For any* user input in the query field, the SeanceFrontend should update the query state to reflect the current input value.
**Validates: Requirements 9.1**

**Property 19: Error state management**
*For any* error that occurs, the SeanceFrontend should store the error message in state and display it to the user.
**Validates: Requirements 1.5, 9.4**

**Property 20: State reset on new query**
*For any* new query submission, the SeanceFrontend should clear previous results and error states before processing.
**Validates: Requirements 9.5**

### Integration Properties

**Property 21: API endpoint correctness**
*For any* API call from the SeanceFrontend, the system should send a POST request to http://localhost:5000/api/seance with a JSON payload containing user_query.
**Validates: Requirements 10.1**

**Property 22: Request parsing**
*For any* request received by the DigitalMediumAgent, the system should parse the JSON body and extract the user_query field.
**Validates: Requirements 10.2**

**Property 23: Tool invocation**
*For any* séance request, the DigitalMediumAgent should call the search_gopher_archive tool with the keyword as a string parameter.
**Validates: Requirements 10.3**

**Property 24: Gemini API integration**
*For any* archive search result, the DigitalMediumAgent should send the results to the Gemini API for interpretation.
**Validates: Requirements 3.1**

### Audio Properties

**Property 25: TTS activation**
*For any* successful response, the SeanceFrontend should invoke the Web Speech API to speak the interpretation aloud.
**Validates: Requirements 6.1**

**Property 26: TTS configuration**
*For any* text-to-speech activation, the system should configure the voice with low pitch and slow rate values.
**Validates: Requirements 6.2**

**Property 27: Audio overlap prevention**
*For any* sequence of multiple rapid responses, the system should cancel previous speech before starting new speech to prevent overlapping audio.
**Validates: Requirements 6.5**

### Logging Properties

**Property 28: Error logging**
*For any* error encountered in any component, the system should log the error with sufficient context (error message, component name, timestamp) for debugging.
**Validates: Requirements 8.1**


## Error Handling

### Frontend Error Handling

**Network Errors:**
- Catch fetch() promise rejections
- Display "Unable to connect to the oracle. Check your connection." message
- Set error state and clear loading state
- Log error to console for debugging

**API Errors (4xx/5xx):**
- Parse error field from JSON response
- Display user-friendly error message
- Avoid exposing technical details or stack traces
- Clear loading state and re-enable form

**Validation Errors:**
- Check query length before submission
- Display inline validation message for queries < 4 characters
- Prevent API call for invalid inputs

**Speech API Errors:**
- Wrap speechSynthesis calls in try-catch
- Gracefully degrade to text-only if API unavailable
- Log warnings for speech failures without blocking UI

### Backend Error Handling

**Request Validation:**
- Check for user_query field presence
- Validate query length >= 4 characters
- Return 400 status with descriptive error message
- Log validation failures

**Archive Loading Errors:**
- Catch FileNotFoundError during startup
- Log critical error and prevent server start
- Provide clear error message about missing archive file

**Search Tool Errors:**
- Validate keyword length
- Check archive is not empty
- Raise ValueError with descriptive messages
- Catch and handle regex compilation errors

**Gemini API Errors:**
- Wrap API calls in try-except blocks
- Catch APIError for rate limits and failures
- Return 500 status with generic error message
- Log detailed error information server-side
- Handle missing/invalid API key gracefully

**Configuration Errors:**
- Check GEMINI_API_KEY at startup
- Log warning if key is missing
- Provide fallback behavior or prevent startup
- Never expose API keys in error messages

### Error Response Format

All error responses follow consistent structure:
```json
{
  "error": "User-friendly error message"
}
```

HTTP status codes:
- 400: Client validation errors
- 500: Server errors, API failures, unexpected exceptions

## Testing Strategy

### Unit Testing

**Backend Unit Tests:**
- Test search_gopher_archive with various keywords
- Test archive loading with valid/invalid JSON
- Test request validation logic
- Test error handling for missing API keys
- Test response formatting functions
- Mock Gemini API calls to test interpretation flow

**Frontend Unit Tests:**
- Test state management hooks
- Test form submission logic
- Test error display components
- Test API call construction
- Mock fetch responses to test success/error paths

**Testing Framework:**
- Backend: pytest with pytest-mock for mocking
- Frontend: Jest with React Testing Library

### Property-Based Testing

Property-based testing will verify universal properties across many randomly generated inputs using hypothesis (Python) and fast-check (JavaScript).

**Backend Property Tests:**
- Use hypothesis library for Python
- Configure minimum 100 iterations per property
- Tag each test with format: `# Feature: gopher-seance, Property {number}: {property_text}`

**Frontend Property Tests:**
- Use fast-check library for JavaScript/React
- Configure minimum 100 iterations per property
- Tag each test with format: `// Feature: gopher-seance, Property {number}: {property_text}`

**Property Test Coverage:**
Each correctness property listed above should have a corresponding property-based test that:
1. Generates random valid inputs for the property domain
2. Executes the system behavior
3. Asserts the property holds true
4. Reports counterexamples if property is violated

**Example Property Test Structure:**
```python
# Feature: gopher-seance, Property 1: Valid query acceptance
@given(st.text(min_size=4, max_size=100))
def test_valid_query_acceptance(query):
    """For any query >= 4 chars, agent should accept it."""
    response = agent.process_query(query)
    assert response.status_code != 400  # Not a validation error
```

### Integration Testing

**API Integration Tests:**
- Test full request/response cycle
- Test with real archive data
- Test CORS headers
- Test error propagation from backend to frontend

**End-to-End Tests:**
- Test complete user flow: input → API → response → display
- Test with mock Gemini API responses
- Verify state transitions
- Verify error handling across layers

### Test Data

**Archive Test Data:**
- Small test archive (10-20 entries) for unit tests
- Entries with various path formats
- Entries with special characters in content
- Duplicate content for testing search completeness

**Query Test Data:**
- Valid queries (4+ characters)
- Invalid queries (< 4 characters)
- Queries with special regex characters
- Queries matching multiple entries
- Queries matching no entries

## Deployment Considerations

### Environment Configuration

**Required Environment Variables:**
- `GEMINI_API_KEY`: Google Gemini API key (required)

**Optional Configuration:**
- `PORT`: Backend server port (default: 5000)
- `GOPHER_ARCHIVE_PATH`: Path to archive JSON (default: gopher_archive.json)

### Development Setup

1. Install backend dependencies: `pip install -r requirements.txt`
2. Install frontend dependencies: `npm install`
3. Create .env file with GEMINI_API_KEY
4. Start backend: `python backend/agent.py`
5. Start frontend: `npm start` (in frontend directory)

### Production Considerations

**Security:**
- Never commit .env file or API keys
- Use environment variables for sensitive configuration
- Implement rate limiting on API endpoint
- Add request size limits
- Enable HTTPS in production

**Performance:**
- Archive loaded once at startup (not per request)
- Consider caching Gemini API responses
- Implement request timeouts
- Monitor API rate limits

**Monitoring:**
- Log all errors with context
- Track API response times
- Monitor Gemini API usage
- Alert on repeated failures

**Scalability:**
- Current design supports single-server deployment
- Archive size limited by available memory
- Consider database for archives > 100MB
- Consider Redis for caching if needed
