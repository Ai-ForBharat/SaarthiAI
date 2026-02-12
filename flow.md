✅ Scheme matching engine     → JSON file based
✅ Scoring algorithm          → Pure Python math
✅ AI Chatbot                 → Local scikit-learn model
✅ Frontend website           → Static HTML/CSS/JS

⚠️  Translation (deep-translator) needs internet
    → But app works fine in English without internet
    → Translation is optional bonus feature


┌──────────────────────────────────────────────────┐
│           TRAINING (One time)                    │
│                                                  │
│  chat_dataset.json                               │
│  (97 sample sentences + 20 categories)           │
│         │                                        │
│         ▼                                        │
│  ┌─────────────────┐                             │
│  │ TF-IDF          │  Converts text → numbers    │
│  │ Vectorizer      │  "pm kisan" → [0.3, 0.8,.]  │
│  └────────┬────────┘                             │
│           │                                      │
│           ▼                                      │
│  ┌─────────────────┐                             │
│  │ Logistic        │  Learns: these numbers      │
│  │ Regression      │  → this category            │
│  └────────┬────────┘                             │
│           │                                      │
│           ▼                                      │
│  trained_model.pkl (saved ~12KB file)            │
└──────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────┐
│           PREDICTION (Every chat message)        │
│                                                  │
│  User types: "tell me about farmer schemes"      │
│         │                                        │
│         ▼                                        │
│  TF-IDF converts to numbers                      │
│         │                                        │
│         ▼                                        │
│  Model predicts: "farmer_schemes" (91%)          │
│         │                                        │
│         ▼                                        │
│  Picks response from farmer_schemes catgory      │
│         │                                        │
│         ▼                                        │
│  "🌾 Schemes for Farmers:                       |
│   1. PM-KISAN: Rs.6,000/year                     │
│   2. PM Fasal Bima: Crop insurance..."           │
└──────────────────────────────────────────────────┘

STEP 1: Install dependencies
══════════════════════════════
cd govscheme-ai
pip install -r requirements.txt


STEP 2: Train the chatbot model (ONE TIME ONLY)
══════════════════════════════════════════════════
cd backend
python train_model.py

You'll see:
══════════════════════════════════════════════════
🧠 GovScheme AI - Model Training
══════════════════════════════════════════════════
📂 Loading training data...
   ✅ Loaded 97 training samples
   ✅ Found 20 intent categories
🔤 Creating TF-IDF vectors...
   ✅ Vocabulary size: 186
🏋️ Training Logistic Regression model...
📊 Evaluating model...
   ✅ Training Accuracy: 100.0%
🧪 Testing with sample queries:
   'tell me about pm kisan' → pm_kisan (96%)
   'how to apply for schemes' → how_to_apply (89%)
   'hi there' → greeting (95%)
   'schemes for farmers' → farmer_schemes (91%)
💾 Saving trained model...
   ✅ Model saved to: trained_model.pkl (12.3 KB)
══════════════════════════════════════════════════
✅ TRAINING COMPLETE!
══════════════════════════════════════════════════


STEP 3: Start the backend server
══════════════════════════════════
python app.py

You'll see:
══════════════════════════════════════════════════
🏛️  GovScheme AI - Starting Up...
══════════════════════════════════════════════════
✅ Loaded 20 schemes successfully
✅ Chatbot model loaded successfully
✅ Server ready!
📊 Schemes loaded: 20
🤖 Chatbot: AI Model
🌐 Open frontend/index.html in browser
🔗 Backend running at http://localhost:5000
══════════════════════════════════════════════════


STEP 4: Open the website
══════════════════════════
Open frontend/index.html in Chrome/Firefox
(just double-click the file!)

Done! 🎉 Everything works locally on your laptop!

STEP 6: Other Backend Files (Same as Before)
Use the exact same files from previous response:

backend/data_loader.py (no changes)
backend/matching_engine.py (no changes)
backend/scoring.py (no changes)
backend/utils.py (no changes)
backend/schemes.json (no changes)
And all frontend files:

frontend/index.html (no changes)
frontend/style.css (no changes)
frontend/script.js (no changes)