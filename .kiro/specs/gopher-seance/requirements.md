# Requirements Document

## Introduction

The Gopher Séance is a Halloween-themed application that resurrects the 1991 Gopher protocol as an AI-powered digital oracle. The system combines a cryptic archive of 6000+ prophecies with modern AI interpretation to deliver spooky, mystical responses through a retro CRT terminal interface. Users submit queries to commune with the digital spirits of the early internet, receiving cryptic Gopher-era messages interpreted by an AI medium.

## Glossary

- **GopherArchive**: A JSON data store containing 6000+ cryptic prophecies with simulated Gopher protocol paths
- **DigitalMediumAgent**: The Flask backend service that orchestrates archive searches and AI interpretation
- **SeanceFrontend**: The React-based user interface styled as a retro CRT terminal
- **MCP Tool**: Model Context Protocol tool for searching the Gopher archive
- **Gemini API**: Google's generative AI service used for interpreting cryptic messages
- **Séance Session**: A single user query and response cycle through the system

## Requirements

### Requirement 1

**User Story:** As a user, I want to submit mystical queries to the digital oracle, so that I can receive cryptic prophecies from the resurrected Gopher protocol.

#### Acceptance Criteria

1. WHEN a user submits a query with 4 or more characters, THEN the DigitalMediumAgent SHALL accept and process the query
2. WHEN a user submits a query with fewer than 4 characters, THEN the DigitalMediumAgent SHALL reject the query and return a validation error
3. WHEN a query is submitted, THEN the SeanceFrontend SHALL display a loading state with character-scatter animations
4. WHEN the query processing completes, THEN the SeanceFrontend SHALL display both the cryptic response and its interpretation
5. WHEN an error occurs during processing, THEN the SeanceFrontend SHALL display a user-friendly error message

### Requirement 2

**User Story:** As the DigitalMediumAgent, I want to search the GopherArchive for relevant cryptic messages, so that I can provide contextually appropriate prophecies to users.

#### Acceptance Criteria


1. WHEN the search_gopher_archive tool receives a keyword with 4 or more characters, THEN the tool SHALL perform regex word-boundary matching on content and path fields
2. WHEN matching entries are found in the GopherArchive, THEN the search_gopher_archive tool SHALL return all matching entries
3. WHEN no matching entries are found, THEN the search_gopher_archive tool SHALL return a random entry from the archive as a fallback
4. WHEN the GopherArchive is empty, THEN the search_gopher_archive tool SHALL return an error indicating no data is available
5. WHEN a keyword contains fewer than 4 characters, THEN the search_gopher_archive tool SHALL reject the search and return a validation error

### Requirement 3

**User Story:** As the DigitalMediumAgent, I want to interpret cryptic Gopher messages using AI, so that I can provide meaningful yet mystical responses to user queries.

#### Acceptance Criteria

1. WHEN archive search results are obtained, THEN the DigitalMediumAgent SHALL send the results to the Gemini API for interpretation
2. WHEN the Gemini API returns an interpretation, THEN the DigitalMediumAgent SHALL format the response with both cryptic_response and interpretation fields
3. WHEN the Gemini API fails or times out, THEN the DigitalMediumAgent SHALL return an error response with appropriate error details
4. WHEN processing a séance request, THEN the DigitalMediumAgent SHALL maintain the mystical and cryptic tone in all responses
5. WHEN the API key is missing or invalid, THEN the DigitalMediumAgent SHALL return a configuration error without exposing sensitive details

### Requirement 4

**User Story:** As a system administrator, I want the GopherArchive to maintain data integrity, so that the oracle can reliably serve prophecies.

#### Acceptance Criteria

1. WHEN the GopherArchive is loaded, THEN the system SHALL validate that each entry contains id, path, and content fields
2. WHEN the GopherArchive is loaded, THEN the system SHALL verify that all id values are unique integers
3. WHEN an entry is accessed, THEN the system SHALL ensure the path field follows the Gopher menu path format
4. WHEN the archive file is corrupted or missing, THEN the system SHALL log an error and prevent the DigitalMediumAgent from starting
5. WHEN the archive contains fewer than 100 entries, THEN the system SHALL log a warning about limited data availability

### Requirement 5

**User Story:** As a user, I want to experience a spooky retro interface, so that I feel immersed in the Halloween-themed séance atmosphere.

#### Acceptance Criteria


1. WHEN the SeanceFrontend loads, THEN the system SHALL display a CRT monitor-styled terminal interface with retro aesthetics
2. WHEN a query is being processed, THEN the SeanceFrontend SHALL animate text with character-by-character scatter effects
3. WHEN a response is received, THEN the SeanceFrontend SHALL apply chaos state CSS animations to enhance the spooky atmosphere
4. WHEN the interface is idle, THEN the SeanceFrontend SHALL maintain the retro terminal aesthetic without modern UI elements
5. WHEN visual effects are applied, THEN the SeanceFrontend SHALL ensure text remains readable despite stylistic distortions

### Requirement 6

**User Story:** As a user, I want to hear the oracle's prophecies spoken aloud, so that I can experience a more immersive and eerie séance.

#### Acceptance Criteria

1. WHEN a response is received, THEN the SeanceFrontend SHALL use the Web Speech API to speak the interpretation aloud
2. WHEN text-to-speech is activated, THEN the system SHALL configure the voice with low pitch and slow rate for a spooky effect
3. WHEN speech synthesis is not supported by the browser, THEN the SeanceFrontend SHALL gracefully degrade to text-only display
4. WHEN speech is playing, THEN the user SHALL have the ability to stop or skip the audio playback
5. WHEN multiple responses are received rapidly, THEN the system SHALL queue or cancel previous speech to avoid overlapping audio

### Requirement 7

**User Story:** As a developer, I want the backend API to be properly secured and configured, so that the application runs reliably in production.

#### Acceptance Criteria

1. WHEN the DigitalMediumAgent starts, THEN the system SHALL load configuration from environment variables using python-dotenv
2. WHEN cross-origin requests are made from the frontend, THEN the DigitalMediumAgent SHALL handle them using CORS middleware
3. WHEN the API receives a POST request to /api/seance, THEN the system SHALL validate the request contains a user_query field
4. WHEN the API returns a response, THEN the system SHALL include appropriate HTTP status codes and content-type headers
5. WHEN the server starts, THEN the DigitalMediumAgent SHALL listen on port 5000 and log successful startup

### Requirement 8

**User Story:** As a developer, I want proper error handling throughout the system, so that failures are graceful and debuggable.

#### Acceptance Criteria

1. WHEN any component encounters an error, THEN the system SHALL log the error with sufficient context for debugging
2. WHEN the frontend API call fails, THEN the SeanceFrontend SHALL display a user-friendly error message without exposing technical details
3. WHEN the backend encounters an exception, THEN the DigitalMediumAgent SHALL return a 500 status code with a generic error message
4. WHEN network connectivity is lost, THEN the SeanceFrontend SHALL detect the failure and inform the user to check their connection
5. WHEN the Gemini API rate limit is exceeded, THEN the DigitalMediumAgent SHALL return a specific error indicating the service is temporarily unavailable


### Requirement 9

**User Story:** As a user, I want the frontend to manage application state effectively, so that the interface responds smoothly to my interactions.

#### Acceptance Criteria

1. WHEN the user types in the query input field, THEN the SeanceFrontend SHALL update the query state using React useState hooks
2. WHEN a séance request is initiated, THEN the SeanceFrontend SHALL set the loading state to true and disable the submit button
3. WHEN a response is received or an error occurs, THEN the SeanceFrontend SHALL set the loading state to false and re-enable the submit button
4. WHEN an error occurs, THEN the SeanceFrontend SHALL store the error message in state and display it to the user
5. WHEN a new query is submitted, THEN the SeanceFrontend SHALL clear previous results and error states before processing

### Requirement 10

**User Story:** As a system integrator, I want the components to communicate through well-defined interfaces, so that the system is maintainable and extensible.

#### Acceptance Criteria

1. WHEN the SeanceFrontend makes an API call, THEN the system SHALL send a POST request to http://localhost:5000/api/seance with JSON payload
2. WHEN the DigitalMediumAgent receives a request, THEN the system SHALL parse the JSON body and extract the user_query field
3. WHEN the DigitalMediumAgent calls the search_gopher_archive tool, THEN the system SHALL pass the keyword as a string parameter
4. WHEN the search_gopher_archive tool returns results, THEN the system SHALL provide a list of entry objects with id, path, and content fields
5. WHEN the DigitalMediumAgent returns a response, THEN the system SHALL format it as JSON with cryptic_response and interpretation string fields