import json
import random
import os
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
from google.genai.errors import APIError
from dotenv import load_dotenv

load_dotenv() 

# --- Configuration ---
GOPHER_ARCHIVE_PATH = 'gopher_archive.json'
MODEL_NAME = 'gemini-2.5-flash' 
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Initialize the Gemini Client
try:
    if not GEMINI_API_KEY:
        client = None
        raise ValueError("GEMINI_API_KEY not found in environment variables.")
    client = genai.Client(api_key=GEMINI_API_KEY)
except Exception as e:
    print(f"Error initializing Gemini client: {e}")
    print("WARNING: LLM will use mock data. Set GEMINI_API_KEY to proceed.")
    client = None

app = Flask(__name__)
CORS(app)

def load_gopher_archive():
    """Loads the ancient JSON ledger as the Gopher Archive DataStore."""
    try:
        with open(GOPHER_ARCHIVE_PATH, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

def get_medium_persona_prompt():
    """Loads the FULL content of the Steering Document to be used as the LLM's system prompt."""
    try:
        with open('../.kiro/steering_docs/medium_persona.md', 'r') as f:
            return f.read()  # Return everything, including all constraints
    except FileNotFoundError:
        return "You are a weary, ancient digital medium. Your tone must be cryptic and archaic. Always start your interpretation with: 'Hark, the Gopher nexus coughs up a cipher...' Maximum 85 words after the opening phrase."

def enforce_word_limit(text, max_words=85):
    """Ensures response doesn't exceed 85 words after opening phrase"""
    opening = "Hark, the Gopher nexus coughs up a cipher..."
    
    if opening in text:
        parts = text.split(opening, 1)
        if len(parts) == 2:
            body = parts[1].strip()
            words = body.split()
            
            if len(words) > max_words:
                truncated = ' '.join(words[:max_words])
                return f"{opening}\n\n{truncated}..."
        
        return text
    
    # If opening phrase not found, still enforce limit on entire text
    words = text.split()
    if len(words) > max_words:
        return ' '.join(words[:max_words]) + "..."
    
    return text

# --- START: MCP Tool Implementation ---
def search_gopher_archive(keyword: str) -> str:
    """
    MCP Tool: Searches the Gopher Archive for cryptic entries related to a keyword.
    This function is a capability exposed to the LLM agent.
    """
    archive = load_gopher_archive()
    
    if not archive:
        return "ERROR: The Gopher Archive is empty or inaccessible."

    keyword = keyword.lower().strip()
    
    matching_content = []
    
    # Use simple regex search for flexibility
    pattern = re.compile(rf'\b{re.escape(keyword)}\b', re.IGNORECASE)
    
    for entry in archive:
        if pattern.search(entry['content']) or pattern.search(entry['path']):
            matching_content.append(entry['content'])
            
    if not matching_content:
        # If no direct match, return a random quote for a "cryptic" fallback
        random_entry = random.choice(archive)
        return f"No direct ciphers found matching that keyword. However, the nexus yields this obscure wisdom:\n{random_entry['content']}"

    # Return matches as a single string for the LLM to process
    return "Matching Ciphers:\n" + "\n---\n".join(matching_content)


def interpret_cryptic_message(user_query: str, search_result: str) -> str:
    """Uses the Gemini LLM API to generate the interpretation based on the Steering Doc."""
    
    system_instruction = get_medium_persona_prompt()
    
    if not client:
        opening_phrase = "Hark, the Gopher nexus coughs up a cipher..."
        mock_interpretation = f"The client connection is severed! Search result: '{search_result}' remains a mystery."
        return f"{opening_phrase}\n\n{mock_interpretation}"

    # The user prompt now includes the search result provided by the MCP tool
    user_prompt = f"""
The user has submitted the following question: "{user_query}"

The relevant information retrieved from the Gopher Archive by the search tool is: 
---
{search_result}
---

CRITICAL: Your response MUST NOT exceed 85 words after the opening phrase "Hark, the Gopher nexus coughs up a cipher...". Count carefully. Be concise.

Use this retrieved information to formulate your haunting interpretation. You must synthesize the result into your narrative.
"""
    
    try:
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=user_prompt,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.8,
            )
        )
        
        interpretation_text = response.text
        
        # Ensure the opening phrase is present, as mandated by the Steering Doc
        if not interpretation_text.startswith("Hark, the Gopher nexus coughs up a cipher..."):
            interpretation_text = "Hark, the Gopher nexus coughs up a cipher...\n\n" + interpretation_text
        
        # Enforce the 85-word limit strictly
        interpretation_text = enforce_word_limit(interpretation_text, max_words=85)
            
        return interpretation_text
        
    except APIError as e:
        return "The spirits are angered! A connection error occurred. The wisdom remains locked in the digital nether."
    except Exception as e:
        return "A spectral anomaly interrupted the transmission."


@app.route('/api/seance', methods=['POST'])
def seance_endpoint():
    """
    Implements the DigitalMediumAgent /api/seance endpoint.
    Uses the MCP tool implicitly before calling the LLM.
    """
    data = request.get_json()
    user_query = data.get('user_query', '').strip()
    
    if not user_query:
        return jsonify({"error": "No query provided to the medium."}), 400

    # 1. SIMPLE KEYWORD EXTRACTION for MCP Tool
    keywords = re.findall(r'\b\w{4,}\b', user_query.lower()) # words with 4 or more letters
    search_keyword = keywords[0] if keywords else 'connection' 
    
    # 2. CALL THE MCP TOOL
    search_result_content = search_gopher_archive(search_keyword)

    # 3. GENERATE THE FINAL RESPONSE USING THE SEARCH RESULT
    interpretation = interpret_cryptic_message(user_query, search_result_content)

    return jsonify({
        "cryptic_response": search_result_content, # Display the result of the search tool
        "interpretation": interpretation
    })


@app.route('/api/learn', methods=['POST'])
def learn_endpoint():
    """
    Educational Q&A endpoint with technology comparisons.
    Provides clear, educational explanations about internet history and protocols.
    """
    try:
        data = request.get_json()
        user_query = data.get('query', '').strip()
        
        if len(user_query) < 4:
            return jsonify({'error': 'Query too short'}), 400

        # Educational persona with focus on old vs new tech
        system_prompt = """You are a knowledgeable technology historian and educator specializing in internet history, protocols, and computing evolution.

When answering questions:
1. Provide clear, educational explanations
2. Compare old technology with modern equivalents when relevant
3. Include brief historical context
4. Explain technical concepts in accessible language
5. Structure responses with bullet points or sections for clarity

Topics to cover:
• Gopher protocol (1991) vs HTTP/Web (1993+)
• Old protocols: FTP, Telnet, NNTP vs modern equivalents
• Internet evolution: ARPANET → Modern Internet
• Technology comparisons: Then vs Now
• Computing history and milestones

Response format:
- Keep responses 150-200 words
- Use brief sections or bullet points
- Include "Then vs Now" comparisons when relevant
- Be educational but engaging
- Maintain professional but friendly tone

If asked about unrelated topics, politely redirect to technology/history."""

        if not client:
            return jsonify({
                'response': 'The educational archive is currently offline. Please ensure the Gemini API is configured.'
            }), 503

        # Call Gemini API with educational persona
        prompt = f"{system_prompt}\n\nUser question: {user_query}\n\nProvide educational response with historical context and comparisons:"
        
        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
            config=types.GenerateContentConfig(
                temperature=0.7,
                max_output_tokens=400,
            )
        )
        
        ai_response = response.text
        
        return jsonify({'response': ai_response}), 200
        
    except APIError as e:
        app.logger.error(f"Learn endpoint API error: {str(e)}")
        return jsonify({'error': 'Failed to generate response'}), 500
    except Exception as e:
        app.logger.error(f"Learn endpoint error: {str(e)}")
        return jsonify({'error': 'Failed to generate response'}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)