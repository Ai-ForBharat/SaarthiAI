"""
Scoring Engine - Calculates relevance percentage for each scheme
"""


class ScoringEngine:
    WEIGHTS = {
        'age': 15,
        'gender': 15,
        'state': 20,
        'category': 15,
        'income': 15,
        'occupation': 10,
        'special': 10
    }

    def calculate_score(self, user, eligibility):
        """Calculate match score (0-100) between user and scheme"""
        score = 0
        total_applicable = 0

        result = self._score_age(user, eligibility)
        score += result[0]
        total_applicable += result[1]

        result = self._score_gender(user, eligibility)
        score += result[0]
        total_applicable += result[1]

      
        result = self._score_state(user, eligibility)
        score += result[0]
        total_applicable += result[1]

        result = self._score_category(user, eligibility)
        score += result[0]
        total_applicable += result[1]

        result = self._score_income(user, eligibility)
        score += result[0]
        total_applicable += result[1]

        result = self._score_occupation(user, eligibility)
        score += result[0]
        total_applicable += result[1]

        result = self._score_special(user, eligibility)
        score += result[0]
        total_applicable += result[1]

        if total_applicable == 0:
            return 50

        percentage = int((score / total_applicable) * 100)
        return min(percentage, 100)

    def _score_age(self, user, elig):
        min_age = elig.get('min_age')
        max_age = elig.get('max_age')

        if min_age is None and max_age is None:
            return 0, 0

        user_age = int(user.get('age', 0))
        weight = self.WEIGHTS['age']

        if min_age is not None and max_age is not None:
            if min_age <= user_age <= max_age:
                return weight, weight
        elif min_age is not None:
            if user_age >= min_age:
                return weight, weight
        elif max_age is not None:
            if user_age <= max_age:
                return weight, weight

        return 0, weight

    def _score_gender(self, user, elig):
        gender_req = elig.get('gender', 'all')

        if gender_req == 'all':
            return 0, 0

        weight = self.WEIGHTS['gender']

        if user.get('gender', '').lower() == gender_req.lower():
            return weight, weight

        return 0, weight

    def _score_state(self, user, elig):
        states = elig.get('states', 'all')
        weight = self.WEIGHTS['state']

        if states == 'all':
            return weight, weight

        if user.get('state', '') in states:
            return weight, weight

        return 0, weight

    def _score_category(self, user, elig):
        categories = elig.get('category')

        if not categories:
            return 0, 0

        weight = self.WEIGHTS['category']
        user_cat = user.get('category', '').lower()

        if user_cat in [c.lower() for c in categories]:
            return weight, weight

        return 0, weight

    def _score_income(self, user, elig):
        max_income = elig.get('max_income')

        if max_income is None:
            return 0, 0

        weight = self.WEIGHTS['income']
        user_income = int(user.get('annual_income', 0))

        if user_income <= max_income:
            return weight, weight

        return 0, weight

    def _score_occupation(self, user, elig):
        occupations = elig.get('occupation')

        if not occupations:
            return 0, 0

        weight = self.WEIGHTS['occupation']
        user_occ = user.get('occupation', '').lower()

        if user_occ in [o.lower() for o in occupations]:
            return weight, weight

        return 0, weight

    def _score_special(self, user, elig):
        weight = self.WEIGHTS['special']
        score = 0
        total = 0

        if elig.get('is_bpl') is not None:
            total += weight
            user_bpl = user.get('is_bpl', False)
            if isinstance(user_bpl, str):
                user_bpl = user_bpl.lower() == 'true'
            if user_bpl == elig['is_bpl']:
                score += weight

        if elig.get('is_farmer') is not None:
            total += weight
            user_farmer = user.get('is_farmer', False)
            if isinstance(user_farmer, str):
                user_farmer = user_farmer.lower() == 'true'
            if user_farmer == elig['is_farmer']:
                score += weight

        if elig.get('is_student') is not None:
            total += weight
            user_student = user.get('is_student', False)
            if isinstance(user_student, str):
                user_student = user_student.lower() == 'true'
            if user_student == elig['is_student']:
                score += weight

        if elig.get('disability') is not None:
            total += weight
            user_disability = user.get('disability', False)
            if isinstance(user_disability, str):
                user_disability = user_disability.lower() == 'true'
            if user_disability == elig['disability']:
                score += weight

        if total == 0:
            return 0, 0

        return score, total