# Implementation Plan

- [ ] 1. Enhance backend search_gopher_archive MCP tool
  - Implement proper word-boundary regex matching for keyword searches
  - Add validation for keyword length (minimum 4 characters)
  - Add empty archive check with appropriate error handling
  - Ensure fallback to random entry when no matches found
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ]* 1.1 Write property test for search validation
  - **Property 3: Search keyword validation**
  - **Validates: Requirements 2.5**

- [ ]* 1.2 Write property test for word-boundary matching
  - **Property 5: Word-boundary matching**
  - **Validates: Requirements 2.1**

- [ ]* 1.3 Write property test for complete result return
  - **Property 6: Complete result return**
  - **Validates: Requirements 2.2**

- [ ]* 1.4 Write property test for fallback behavior
  - **Property 7: Fallback behavior**
  - **Validates: Requirements 2.3**

- [ ] 2. Implement archive data validation
  - Add validation function to check all entries have required fields (id, path, content)
  - Verify all id values are unique integers
  - Validate path format follows Gopher menu structure
  - Add startup checks with appropriate error logging
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ]* 2.1 Write property test for required fields
  - **Property 8: Required fields presence**
  - **Validates: Requirements 4.1**

- [ ]* 2.2 Write property test for unique identifiers
  - **Property 9: Unique identifiers**
  - **Validates: Requirements 4.2**

- [ ]* 2.3 Write property test for path format
  - **Property 10: Path format compliance**
  - **Validates: Requirements 4.3**

- [ ] 3. Enhance API request validation
  - Add validation for user_query field presence in POST requests
  - Implement query length validation (minimum 4 characters)
  - Return appropriate 400 status codes with error messages
  - Add request logging for debugging
  - _Requirements: 1.1, 1.2, 7.3_

- [ ]* 3.1 Write property test for valid query acceptance
  - **Property 1: Valid query acceptance**
  - **Validates: Requirements 1.1**

- [ ]* 3.2 Write property test for invalid query rejection
  - **Property 2: Invalid query rejection**
  - **Validates: Requirements 1.2**

- [ ]* 3.3 Write property test for request field validation
  - **Property 4: Request field validation**
  - **Validates: Requirements 7.3**

- [ ] 4. Improve error handling in DigitalMediumAgent
  - Wrap Gemini API calls in try-except blocks
  - Handle APIError for rate limits and failures
  - Return 500 status with generic error messages
  - Add comprehensive error logging with context
  - Handle missing/invalid API key gracefully
  - _Requirements: 3.3, 3.5, 8.1, 8.3, 8.5_

- [ ]* 4.1 Write property test for error logging
  - **Property 28: Error logging**
  - **Validates: Requirements 8.1**

- [ ]* 4.2 Write property test for error response format
  - **Property 14: Error response format**
  - **Validates: Requirements 8.3**

- [ ] 5. Enhance API response formatting
  - Ensure all successful responses include cryptic_response and interpretation fields
  - Add proper HTTP status codes (200, 400, 500)
  - Set content-type: application/json header
  - Validate response structure before sending
  - _Requirements: 3.2, 7.4, 10.5_

- [ ]* 5.1 Write property test for API response structure
  - **Property 12: API response structure**
  - **Validates: Requirements 3.2, 10.5**

- [ ]* 5.2 Write property test for HTTP compliance
  - **Property 13: HTTP compliance**
  - **Validates: Requirements 7.4**

- [ ]* 5.3 Write property test for result schema compliance
  - **Property 11: Result schema compliance**
  - **Validates: Requirements 10.4**

- [ ] 6. Checkpoint - Ensure backend tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Improve frontend state management
  - Ensure query state updates on input changes
  - Set loading state to true on submission and disable button
  - Set loading state to false on completion and re-enable button
  - Store and display error messages in state
  - Clear previous results and errors on new query submission
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ]* 7.1 Write property test for input state synchronization
  - **Property 18: Input state synchronization**
  - **Validates: Requirements 9.1**

- [ ]* 7.2 Write property test for loading state activation
  - **Property 16: Loading state activation**
  - **Validates: Requirements 1.3, 9.2**

- [ ]* 7.3 Write property test for loading state deactivation
  - **Property 17: Loading state deactivation**
  - **Validates: Requirements 9.3**

- [ ]* 7.4 Write property test for error state management
  - **Property 19: Error state management**
  - **Validates: Requirements 1.5, 9.4**

- [ ]* 7.5 Write property test for state reset
  - **Property 20: State reset on new query**
  - **Validates: Requirements 9.5**

- [ ] 8. Enhance frontend error handling
  - Catch fetch() promise rejections for network errors
  - Parse and display error field from API responses
  - Implement client-side validation for query length
  - Ensure error messages are user-friendly without technical details
  - Add console logging for debugging
  - _Requirements: 1.5, 8.2, 8.4_

- [ ]* 8.1 Write property test for frontend error display
  - **Property 15: Frontend error display**
  - **Validates: Requirements 8.2**

- [ ] 9. Improve API integration
  - Verify POST request to correct endpoint (http://localhost:5000/api/seance)
  - Ensure JSON payload includes user_query field
  - Parse response to extract cryptic_response and interpretation
  - Handle both success and error responses appropriately
  - _Requirements: 10.1, 10.2, 10.3_

- [ ]* 9.1 Write property test for API endpoint correctness
  - **Property 21: API endpoint correctness**
  - **Validates: Requirements 10.1**

- [ ]* 9.2 Write property test for request parsing
  - **Property 22: Request parsing**
  - **Validates: Requirements 10.2**

- [ ]* 9.3 Write property test for tool invocation
  - **Property 23: Tool invocation**
  - **Validates: Requirements 10.3**

- [ ]* 9.4 Write property test for Gemini API integration
  - **Property 24: Gemini API integration**
  - **Validates: Requirements 3.1**

- [ ] 10. Enhance text-to-speech functionality
  - Invoke Web Speech API on successful response
  - Configure voice with low pitch and slow rate
  - Implement graceful degradation if API unavailable
  - Cancel previous speech before starting new speech
  - Add error handling for speech synthesis failures
  - _Requirements: 6.1, 6.2, 6.3, 6.5_

- [ ]* 10.1 Write property test for TTS activation
  - **Property 25: TTS activation**
  - **Validates: Requirements 6.1**

- [ ]* 10.2 Write property test for TTS configuration
  - **Property 26: TTS configuration**
  - **Validates: Requirements 6.2**

- [ ]* 10.3 Write property test for audio overlap prevention
  - **Property 27: Audio overlap prevention**
  - **Validates: Requirements 6.5**

- [ ] 11. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
