"""
Data Loader - Reads and provides scheme data
"""

import json
import os


class DataLoader:
    def __init__(self):
        self.schemes = []
        self.load_schemes()

    def load_schemes(self):
        """Load all schemes from JSON file"""
        file_path = os.path.join(os.path.dirname(__file__), 'schemes.json')
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.schemes = data.get('schemes', [])
            print(f"✅ Loaded {len(self.schemes)} schemes successfully")
        except FileNotFoundError:
            print("❌ schemes.json not found!")
            self.schemes = []
        except json.JSONDecodeError:
            print("❌ Error parsing schemes.json!")
            self.schemes = []

    def get_all_schemes(self):
        """Return all schemes"""
        return self.schemes

    def get_scheme_by_id(self, scheme_id):
        """Find a specific scheme by ID"""
        for scheme in self.schemes:
            if scheme['id'] == scheme_id:
                return scheme
        return None

    def get_schemes_by_category(self, category):
        """Filter schemes by category"""
        return [s for s in self.schemes if s.get('category') == category]

    def get_schemes_by_type(self, scheme_type):
        """Filter by central or state"""
        return [s for s in self.schemes if s.get('type') == scheme_type]

    def get_schemes_by_state(self, state):
        """Get schemes applicable to a state"""
        result = []
        for scheme in self.schemes:
            states = scheme.get('eligibility', {}).get('states', 'all')
            if states == 'all' or state in states:
                result.append(scheme)
        return result

    def get_categories(self):
        """Get all unique categories"""
        categories = set()
        for scheme in self.schemes:
            categories.add(scheme.get('category', 'other'))
        return sorted(list(categories))