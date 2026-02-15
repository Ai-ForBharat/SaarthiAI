# Saarthi AI – System Design Document

## Project Overview

**Product Name:** Saarthi AI  
**Category:** AI-powered citizen assistance platform  
**Version:** 1.0  
**Date:** February 15, 2026  

---

# System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                       PRESENTATION LAYER                        │
├─────────────────────────────────────────────────────────────────┤
│ Web App (PWA) │ Mobile App │ WhatsApp Bot │ Admin Panel       │
└─────────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────────┐
│                         API GATEWAY LAYER                       │
├─────────────────────────────────────────────────────────────────┤
│ Authentication │ Rate Limiting │ Request Routing │ Load Balance│
└─────────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────────┐
│                       APPLICATION LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│ User Service │ Scheme Service │ Chat Service │ Recommendation  │
│ Profile Mgmt │ Search Engine  │ NLP Engine   │ Eligibility     │
└─────────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────────┐
│                         AI ENGINE LAYER                         │
├─────────────────────────────────────────────────────────────────┤
│ Recommendation │ NLP/NLU │ Translation │ Intent Detection      │
│ Eligibility ML │ Chatbot LLM │ Ranking Algo │ Entity Extract   │
└─────────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────────┐
│                           DATA LAYER                           │
├─────────────────────────────────────────────────────────────────┤
│ PostgreSQL │ Elasticsearch │ Redis Cache │ Vector DB           │
│ User/Schemes │ Search Index │ Sessions │ Embeddings            │
└─────────────────────────────────────────────────────────────────┘
```

---

# Technology Stack

## Frontend

```yaml
Web Application:
  Framework: React 18 with TypeScript
  UI Library: Chakra UI / Material-UI
  State Management: Zustand / Redux Toolkit
  PWA: Workbox for offline support
  Build Tool: Vite

Mobile Application:
  Framework: React Native / Flutter
  State Management: Provider / Bloc
  Local Storage: SQLite

Admin Dashboard:
  Framework: React with TypeScript
  UI: Ant Design / Material-UI
  Charts: Recharts / Chart.js
```

## Backend

```yaml
API Framework: FastAPI (Python 3.11+)
Authentication: JWT + OAuth2
API Documentation: OpenAPI/Swagger
Background Jobs: Celery + Redis
Task Queue: Redis Queue (RQ)
WebSocket: FastAPI WebSocket support
```

## AI/ML Stack

```yaml
NLP/NLU:
  - spaCy for entity extraction
  - Hugging Face Transformers
  - Sentence Transformers for embeddings

LLM Integration:
  - OpenAI GPT-4 / GPT-3.5
  - Google Gemini API
  - Local LLM: Llama 2 (fallback)

Translation:
  - Google Cloud Translation API
  - IndicTrans for Indian languages
  - Bhashini API (Government of India)

Vector Search:
  - Pinecone / Weaviate
  - FAISS for local embeddings
```

## Database & Storage

```yaml
Primary Database: PostgreSQL 15+
Search Engine: Elasticsearch 8.x
Cache: Redis 7.x
Vector Database: Pinecone / Weaviate
Object Storage: AWS S3 / MinIO
```

## Infrastructure

```yaml
Cloud Provider: AWS / Google Cloud
Container: Docker
Orchestration: Kubernetes / AWS ECS
CDN: CloudFront / Cloudflare
Monitoring: Prometheus + Grafana
Logging: ELK Stack
```

---

# Component Architecture

## 1. User Profile Service

```python
class UserProfileService:
    """Manages user profile and preferences"""
    
    def create_profile(self, user_data: dict) -> UserProfile:
        """Create new user profile"""
        pass
    
    def update_profile(self, user_id: str, updates: dict) -> UserProfile:
        """Update existing profile"""
        pass
    
    def get_eligibility_params(self, user_id: str) -> dict:
        """Extract eligibility parameters from profile"""
        return {
            'age': user.age,
            'income': user.income_range,
            'occupation': user.occupation,
            'category': user.category,
            'state': user.state,
            'district': user.district
        }
```

## 2. Scheme Recommendation Engine

```python
class SchemeRecommendationEngine:
    """AI-powered scheme recommendation system"""
    
    def __init__(self):
        self.eligibility_checker = EligibilityChecker()
        self.ranking_model = RankingModel()
        self.vector_store = VectorStore()
    
    def recommend_schemes(
        self, 
        user_profile: dict, 
        top_k: int = 10
    ) -> List[SchemeRecommendation]:
        """
        Generate personalized scheme recommendations
        
        Steps:
        1. Filter schemes by hard eligibility criteria
        2. Calculate relevance scores
        3. Rank by composite score
        4. Return top K recommendations
        """
        eligible_schemes = self.eligibility_checker.filter_eligible(user_profile)
        
        scored_schemes = []
        for scheme in eligible_schemes:
            score = self._calculate_relevance_score(user_profile, scheme)
            scored_schemes.append((scheme, score))
        
        ranked = sorted(scored_schemes, key=lambda x: x[1], reverse=True)
        return ranked[:top_k]
    
    def _calculate_relevance_score(self, user_profile: dict, scheme: Scheme) -> float:
        """
        Composite scoring:
        - Eligibility confidence: 40%
        - Benefit amount: 30%
        - Application ease: 20%
        - Popularity: 10%
        """
        pass
```

---

# Scalability Strategy

```yaml
Application Tier:
  - Kubernetes pods with auto-scaling
  - Stateless API design
  - Load balancing with NGINX/ALB

Database Tier:
  - Read replicas for queries
  - Connection pooling (PgBouncer)
  - Partitioning by state/region

Cache Tier:
  - Redis cluster
  - Distributed caching
  - Session management
```

---

# Success Metrics & KPIs

## Technical Metrics
- API response time < 2 seconds (P95)
- Recommendation accuracy > 85%
- Chat intent classification > 90%
- System uptime > 99.5%

## Business Metrics
- User retention rate
- Schemes discovered per user
- Eligibility check success rate
- User satisfaction score (NPS)

## AI Model Metrics
- Recommendation relevance score
- Translation accuracy (BLEU score)
- Intent classification F1 score
- Eligibility prediction accuracy

---

**Document Version:** 1.0  
**Last Updated:** February 15, 2026
