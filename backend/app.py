"""
GovScheme AI - Main Flask Application
The central server that connects everything together
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from data_loader import DataLoader
from matching_engine import MatchingEngine
from chatbot import GovSchemeBot
from utils import (
    translate_schemes,
    validate_user_input,
    get_supported_languages,
    INDIAN_STATES
)

app = Flask(__name__)
CORS(app)

print("🚀 Starting GovScheme AI...")
data_loader = DataLoader()
matcher = MatchingEngine(data_loader.get_all_schemes())
chatbot = GovSchemeBot()
print("✅ All systems ready!\n")


@app.route('/', methods=['GET'])
def home():
    """Health check endpoint"""
    return jsonify({
        "status": "running",
        "app": "GovScheme AI",
        "total_schemes": len(data_loader.get_all_schemes()),
        "endpoints": [
            "POST /api/recommend",
            "POST /api/chat",
            "GET /api/schemes",
            "GET /api/schemes/<id>",
            "GET /api/languages",
            "GET /api/states",
            "GET /api/categories"
        ]
    })


@app.route('/api/recommend', methods=['POST'])
def recommend_schemes():
    """
    ⭐ MAIN ENDPOINT
    Receives user profile → Returns matched schemes
    """
    try:
        user_data = request.json

        if not user_data:
            return jsonify({"error": "No data received"}), 400

       
        errors = validate_user_input(user_data)
        if errors:
            return jsonify({"error": "Validation failed", "details": errors}), 400

     
        language = user_data.get('language', 'en')

     
        matched_schemes = matcher.find_matches(user_data)


        if language != 'en':
            matched_schemes = translate_schemes(matched_schemes, language)

        return jsonify({
            "success": True,
            "total_matches": len(matched_schemes),
            "schemes": matched_schemes,
            "user_summary": {
                "state": user_data.get('state'),
                "age": user_data.get('age'),
                "category": user_data.get('category'),
                "language": language
            }
        })

    except Exception as e:
        print(f"Error in /api/recommend: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/api/chat', methods=['POST'])
def chat():
    """
    AI Chatbot endpoint
    User asks questions → Gets intelligent answers
    """
    try:
        data = request.json
        message = data.get('message', '')
        language = data.get('language', 'en')
        context = data.get('context', {})

        if not message.strip():
            return jsonify({"error": "Empty message"}), 400

        response = chatbot.get_response(message, context, language)

        return jsonify({
            "success": True,
            "response": response
        })

    except Exception as e:
        print(f"Chat error: {e}")
        return jsonify({
            "response": "Sorry, I encountered an error. Please try again."
        })


@app.route('/api/schemes', methods=['GET'])
def get_all_schemes():
    """Get all schemes with optional filters"""
    category = request.args.get('category')
    scheme_type = request.args.get('type')
    state = request.args.get('state')

    schemes = data_loader.get_all_schemes()

    if category:
        schemes = [s for s in schemes if s.get('category') == category]
    if scheme_type:
        schemes = [s for s in schemes if s.get('type') == scheme_type]
    if state:
        schemes = [s for s in schemes if
                   s.get('eligibility', {}).get('states') == 'all' or
                   state in s.get('eligibility', {}).get('states', [])]

    return jsonify({
        "total": len(schemes),
        "schemes": schemes
    })


@app.route('/api/schemes/<scheme_id>', methods=['GET'])
def get_scheme_detail(scheme_id):
    """Get details of a specific scheme"""
    scheme = data_loader.get_scheme_by_id(scheme_id)
    if scheme:
        return jsonify({"scheme": scheme})
    return jsonify({"error": "Scheme not found"}), 404


@app.route('/api/languages', methods=['GET'])
def get_languages():
    """Get supported languages list"""
    return jsonify({"languages": get_supported_languages()})


@app.route('/api/states', methods=['GET'])
def get_states():
    """Get list of Indian states"""
    return jsonify({"states": INDIAN_STATES})


@app.route('/api/categories', methods=['GET'])
def get_categories():
    """Get scheme categories"""
    return jsonify({"categories": data_loader.get_categories()})



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)