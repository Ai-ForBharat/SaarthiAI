"""
Matching Engine - Core brain that matches users to schemes
"""

from scoring import ScoringEngine


class MatchingEngine:
    def __init__(self, schemes):
        self.schemes = schemes
        self.scorer = ScoringEngine()

    def find_matches(self, user_profile):
        """
        Main function: takes user profile, returns matched schemes with scores
        """
        matched = []

        for scheme in self.schemes:
            eligibility = scheme.get('eligibility', {})

            # HARD FILTERS - if these fail, skip scheme entirely
            if not self._pass_hard_filters(user_profile, eligibility):
                continue

            # SOFT SCORING - calculate how well user matches
            score = self.scorer.calculate_score(user_profile, eligibility)

            if score >= 30:  # Minimum 30% match
                scheme_copy = scheme.copy()
                scheme_copy['match_score'] = score
                matched.append(scheme_copy)

        # Sort by score (highest first)
        matched.sort(key=lambda x: x['match_score'], reverse=True)

        return matched[:20]  # Return top 20

    def _pass_hard_filters(self, user, eligibility):
        """
        Hard filters - scheme is REJECTED if these don't match
        """

        # 1. State Filter
        states = eligibility.get('states', 'all')
        if states != 'all':
            user_state = user.get('state', '')
            if user_state not in states:
                return False

        # 2. Gender Filter
        gender_req = eligibility.get('gender', 'all')
        if gender_req != 'all':
            if user.get('gender', '').lower() != gender_req.lower():
                return False

        # 3. Age Range Filter
        user_age = int(user.get('age', 0))
        min_age = eligibility.get('min_age')
        max_age = eligibility.get('max_age')

        if min_age is not None and user_age < min_age:
            return False
        if max_age is not None and user_age > max_age:
            return False

        return True

    def get_scheme_detail(self, scheme_id):
        """Get full details of a specific scheme"""
        for scheme in self.schemes:
            if scheme['id'] == scheme_id:
                return scheme
        return None