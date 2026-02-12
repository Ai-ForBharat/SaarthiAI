"""
Utility Functions - Translation + Helpers
"""

from deep_translator import GoogleTranslator




SUPPORTED_LANGUAGES = {
    'en': 'english',
    'hi': 'hindi',
    'ta': 'tamil',
    'te': 'telugu',
    'bn': 'bengali',
    'mr': 'marathi',
    'gu': 'gujarati',
    'kn': 'kannada',
    'ml': 'malayalam',
    'pa': 'punjabi',
    'or': 'odia',
    'ur': 'urdu',
    'as': 'assamese'
}


def translate_text(text, target_lang):
    """Translate text to target language"""
    if not text or target_lang == 'en':
        return text
    try:
        translated = GoogleTranslator(
            source='en',
            target=target_lang
        ).translate(text)
        return translated if translated else text
    except Exception as e:
        print(f"Translation error: {e}")
        return text  

def translate_schemes(schemes, target_lang):
    """Translate list of schemes to target language"""
    if target_lang == 'en':
        return schemes

    translated = []
    for scheme in schemes:
        t_scheme = scheme.copy()
        t_scheme['name'] = translate_text(scheme.get('name', ''), target_lang)
        t_scheme['description'] = translate_text(scheme.get('description', ''), target_lang)
        t_scheme['benefits'] = translate_text(scheme.get('benefits', ''), target_lang)
        t_scheme['how_to_apply'] = translate_text(scheme.get('how_to_apply', ''), target_lang)
       
        t_scheme['name_en'] = scheme.get('name', '')
        translated.append(t_scheme)

    return translated


def get_supported_languages():
    """Return list of supported languages"""
    return [
        {"code": "en", "name": "English", "native": "English"},
        {"code": "hi", "name": "Hindi", "native": "हिंदी"},
        {"code": "ta", "name": "Tamil", "native": "தமிழ்"},
        {"code": "te", "name": "Telugu", "native": "తెలుగు"},
        {"code": "bn", "name": "Bengali", "native": "বাংলা"},
        {"code": "mr", "name": "Marathi", "native": "मराठी"},
        {"code": "gu", "name": "Gujarati", "native": "ગુજરાતી"},
        {"code": "kn", "name": "Kannada", "native": "ಕನ್ನಡ"},
        {"code": "ml", "name": "Malayalam", "native": "മലയാളം"},
        {"code": "pa", "name": "Punjabi", "native": "ਪੰਜਾਬੀ"},
        {"code": "or", "name": "Odia", "native": "ଓଡ଼ିଆ"},
        {"code": "ur", "name": "Urdu", "native": "اردو"},
    ]


# ========== VALIDATION ==========

INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry",
    "Chandigarh", "Andaman and Nicobar Islands",
    "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep"
]


def validate_user_input(data):
    """Validate user form data"""
    errors = []

    if not data.get('age') or int(data.get('age', 0)) < 0:
        errors.append("Valid age is required")

    if int(data.get('age', 0)) > 120:
        errors.append("Age seems invalid")

    if not data.get('gender'):
        errors.append("Gender is required")

    if not data.get('state'):
        errors.append("State is required")

    if data.get('state') and data['state'] not in INDIAN_STATES:
        errors.append("Please select a valid Indian state")

    if not data.get('annual_income') and data.get('annual_income') != 0:
        errors.append("Annual income is required")

    return errors


def format_currency(amount):
    """Format number to Indian currency style"""
    if amount is None:
        return "N/A"
    amount = int(amount)
    if amount >= 10000000:
        return f"₹{amount/10000000:.1f} Cr"
    elif amount >= 100000:
        return f"₹{amount/100000:.1f} L"
    elif amount >= 1000:
        return f"₹{amount/1000:.1f}K"
    else:
        return f"₹{amount}"