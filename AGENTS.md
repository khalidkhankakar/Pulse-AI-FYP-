# Pulse AI — Comprehensive Agent Instructions

Pulse AI is a production-oriented, full-stack healthcare AI platform for disease-wise medical prediction. It combines FastAPI backend with Scikit-learn ML models and a modern Next.js 16 + React 19 frontend. This document serves as the authoritative reference for AI agents, developers, and tooling.

---

## 📋 Project Overview

**Mission**: Build a scalable, modular, real-world healthcare AI system that provides accurate disease prediction through specialized ML models.

**Current Status**: Production-ready with 4 disease modules deployed and live. Supports user authentication, prediction history, AI-powered insights, and interactive chat.

**Supported Diseases**:
- Heart Disease (Cardiovascular)
- Diabetes Mellitus
- Liver Disease (Hepatic)
- Stroke Risk

**Future Roadmap**: Hypertension, Breast Cancer, Chronic Kidney Disease, Brain Tumors (MRI), Pneumonia (X-ray)

**Key Stakeholders**: Healthcare professionals, patients, medical researchers

**How it is implemented**: Frist of all all the ML model are trained on the with corresponding datasets. with highiest accuracy then they are exported as pkl. Integrate with fastapi and exposing the api of every disease.

---

## 🏗️ System Architecture

### High-Level Overview
```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js 16)                   │
│  React 19 | Shadcn UI | TanStack Query | Better Auth      │
└────────────────┬────────────────────────────────────────────┘
                 │ REST API (JSON)
                 ↓
┌─────────────────────────────────────────────────────────────┐
│              Backend (FastAPI + Uvicorn)                    │
│  4 Disease Modules | Pydantic Validation | CORS Config     │
└────────────────┬────────────────────────────────────────────┘
                 │ Predictions
                 ↓
┌─────────────────────────────────────────────────────────────┐
│           ML Models (Scikit-learn Pickled)                  │
│  Heart.pkl | Diabetes.pkl | Liver.pkl | Stroke.pkl        │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow (Disease Prediction)
1. **Client**: User submits form with health metrics
2. **Frontend Validation**: Zod schema validates input
3. **API Call**: `POST /disease/predict` with Pydantic-compliant JSON
4. **Backend Route**: Receives validated request, calls service layer
5. **Service Layer**: Loads pickled model, converts input to DataFrame, generates prediction
6. **Response**: Returns `{prediction: 0|1, prediction_label: string}`
7. **UI Display**: Renders prediction with AI insights (via Qwen LLM)

### AI Integration (Chat & Insights)
- **Primary AI Model**: Alibaba Qwen (via AI SDK)
- **Supported LLMs**: 
  - Alibaba Qwen (default)
  - Google Gemini
  - OpenAI GPT-4/3.5
  - Groq LLaMA
- **System Prompts**: Stored in `frontend/src/lib/constant.tsx`
- **Flow**: ML Prediction (correct/incorrect) → LLM context + system prompt → AI insights → User display

**AI-Powered Assistance Features:**
- **Prediction Explanation**: Regardless of whether prediction is positive or negative, LLM explains medical terminology and results
- **Risk Assessment Interpretation**: Contextualizes model output (e.g., "Your heart disease risk is HIGH because your cholesterol is elevated")
- **Actionable Recommendations**: Suggests lifestyle changes, dietary modifications, medical follow-ups based on prediction
- **Medical Education**: Educates users about disease mechanisms and prevention strategies
- **Emergency Alerts**: If prediction is high-risk, LLM highlights urgent medical recommendations
- **Interactive Q&A**: Users can ask follow-up questions about results via chat interface (powered by same LLM)

### Authentication & Database
- **Auth**: Better Auth (OAuth 2.0 support, JWT sessions)
- **Database**: PostgreSQL with Drizzle ORM
- **Schema**: User accounts, sessions, OAuth providers, email verification
- **Sync**: Server-side session management with token persistence

---

## Datasets (from kaggle and uci repository)

- **Heart Dataset**: from kaggle
- **Stroke Dataset**: from kaggle
- **Liver Dataset**: from kaggle
- **Heart Dataset**: from kaggle

## 📁 Folder Structure

### Backend (`/backend/app`)
```
backend/app/
├── main.py                    # FastAPI app, CORS, router registration
├── requirements.txt           # Python dependencies
├── models/                    # Pydantic request/response schemas
│   ├── __init__.py
│   ├── heart.py              # HeartRequest, HeartResponse, Enums
│   ├── diabetes.py
│   ├── liver.py
│   └── stroke.py
├── routes/                    # API endpoint handlers
│   ├── __init__.py
│   ├── heart.py              # @router.post("/predict")
│   ├── diabetes.py
│   ├── liver.py
│   └── stroke.py
├── service/                   # ML prediction logic
│   ├── __init__.py
│   ├── heart.py              # predict_heart(data: dict) → PredictionResult
│   ├── diabetes.py
│   ├── liver.py
│   └── stroke.py
└── pickle-models/            # Serialized ML models (joblib format)
    ├── heart/
    │   └── heart.pkl
    ├── diabetes/
    │   └── diabetes.pkl
    ├── liver/
    │   └── liver.pkl
    └── stroke/
        └── stroke.pkl
```

### Frontend (`/frontend`)
```
frontend/
├── package.json              # pnpm dependencies, scripts
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript strict mode
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Tailwind globals
│   │   ├── (auth)/           # Auth group (login, signup)
│   │   ├── (site)/           # Public site group
│   │   ├── dashboard/        # Protected dashboard
│   │   ├── api/              # API routes (auth, chat)
│   │   └── ~/                # Dynamic routes (if applicable)
│   ├── components/
│   │   ├── ui/               # Shadcn UI primitives
│   │   ├── shared/           # Shared components (cards, forms)
│   │   ├── auth-error-message.tsx
│   │   ├── protected-layout.tsx
│   │   └── providers/        # React providers
│   ├── lib/
│   │   ├── api-client.ts     # Backend API abstraction
│   │   ├── schemas.ts        # Zod validation schemas
│   │   ├── types.ts          # TypeScript interfaces
│   │   ├── constant.tsx      # AI prompts, form field configs
│   │   ├── utils.ts          # Utility functions
│   │   └── auth-guard.ts     # Auth middleware
│   ├── hooks/
│   │   └── use-mobile.ts     # Responsive design hook
│   └── utils/
│       ├── auth-client.ts
│       ├── auth.ts
│       ├── schema.ts
│       └── drizzle/          # Database migrations
├── public/                   # Static assets
│   ├── disease/              # Disease icons/images
│   ├── icons/
│   └── llms/
└── components.json           # Shadcn UI component registry
```

### Models (`/models`)
```
models/
├── notebooks/
│   ├── heart.ipynb           # Heart disease EDA & training
│   ├── heart-2.ipynb
│   ├── diabetes.ipynb        # Diabetes EDA & training
│   ├── liver.ipynb           # Liver disease EDA & training
│   └── stroke.ipynb          # Stroke prediction EDA & training
├── pickle-models/            # Source models (synced to backend)
│   ├── heart/
│   ├── diabetes/
│   ├── liver/
│   └── stroke/
└── src/
    ├── utils/
    │   └── main.py           # Data preprocessing utilities
    └── visualization/
        ├── __init__.py
        └── plots.py          # Matplotlib/Seaborn visualization
```

### Project Docs
```
├── AGENTS.md                 # This file: comprehensive agent instructions
├── GEMINI.md                 # AI integration & LLM configuration details
├── readme.md                 # Project vision & high-level overview
└── frontend/
    ├── BETTER_AUTH_SETUP.md  # Authentication setup guide
    ├── DASHBOARD_PROTECTION.md
    └── README.md             # Frontend-specific setup
```

---

## 💾 Technology Stack

### Backend
| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Framework | FastAPI | 0.135.3 | REST API server |
| Server | Uvicorn | Latest | ASGI server |
| Validation | Pydantic | 2.13.1 | Request/response schemas |
| ML Models | Scikit-learn | N/A | Classification algorithms |
| Model Loading | Joblib | Latest | Serialize/deserialize .pkl files |
| Data Handling | Pandas, NumPy | Latest | DataFrame manipulation |
| Environment | python-dotenv | Latest | .env variable management |
| Language | Python | 3.10+ | Server runtime |

### Frontend
| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| Framework | Next.js | 16.1.6 | React meta-framework |
| React | React | 19.2.3 | UI library |
| Language | TypeScript | 5.x | Type safety |
| Styling | Tailwind CSS | 4.x | Utility-first CSS |
| UI Components | Shadcn UI | Latest | Pre-built accessible components |
| State Management | TanStack Query | 5.100.9 | Server state management |
| Forms | React Hook Form | 7.71.1 | Form state & validation |
| Validation | Zod | 4.3.6 | Schema validation |
| Icons | Lucide React | 0.563.0 | Icon library |
| AI Chat | AI SDK | 6.0.175+ | LLM integration |
| Auth | Better Auth | 1.6.10 | Authentication framework |
| ORM | Drizzle ORM | 0.45.2 | Database abstraction |
| Database | PostgreSQL | N/A | Via Neon (serverless) |
| Markdown | react-markdown | 10.1.0 | Render AI responses |
| Notifications | Sonner | 2.0.7 | Toast notifications |
| Package Manager | pnpm | Latest | Fast npm alternative |

---

## 🧠 AI/ML System Design

### ML Pipeline Architecture
```
Raw Data
   ↓
[Data Cleaning] → Missing values, outliers, duplicates
   ↓
[Feature Scaling] → Normalization/Standardization
   ↓
[Feature Selection] → Reduce dimensionality
   ↓
[Train/Test Split] → 80/20 or stratified split
   ↓
[Model Training] → Scikit-learn classifier
   ↓
[Hyperparameter Tuning] → Cross-validation, GridSearchCV
   ↓
[Model Evaluation] → Accuracy, Precision, Recall, F1, ROC-AUC
   ↓
[Serialization] → Joblib pickle format
   ↓
[Deployment] → backend/app/pickle-models/{disease}/
```

### ML Model Details

#### Heart Disease Module
- **Algorithm**: Likely Random Forest or Logistic Regression (typical for UCI Heart dataset)
- **Input Features**: 13 clinical parameters (age, sex, blood pressure, cholesterol, etc.)
- **Output**: Binary classification (0: No disease, 1: Disease present)
- **Data Source**: UCI Heart Disease Dataset (~300 samples)
- **Key Metrics**: Accuracy, ROC-AUC for imbalanced classes

#### Diabetes Module
- **Algorithm**: Gradient Boosting or SVM (typical for Pima Indians dataset)
- **Input Features**: 8 health metrics (pregnancies, glucose, BMI, insulin, etc.)
- **Output**: Binary (0: Non-diabetic, 1: Diabetic)
- **Data Source**: Pima Indians Diabetes Dataset (~768 samples)

#### Liver Disease Module
- **Algorithm**: Tree-based classifier (Random Forest/XGBoost)
- **Input Features**: 10 liver function tests (bilirubin, alkaline phosphatase, SGPT, etc.)
- **Output**: Binary (0: Normal, 1: Disease present)

#### Stroke Prediction Module
- **Algorithm**: Ensemble methods or Neural Networks
- **Input Features**: Demographic + clinical data (age, gender, hypertension, glucose, BMI)
- **Output**: Binary (0: No stroke risk, 1: Stroke risk present)

### Feature Importance & Interpretability
- Models use clinically relevant features (no proprietary feature engineering)
- Feature names correspond to medical terminology for transparency
- Predictions include labels: "Heart Disease" | "No Heart Disease"
- AI insights explain which features contributed to prediction (via Qwen LLM)

### LLM Integration for Prediction Assistance

The platform integrates multiple Large Language Models (LLMs) to provide comprehensive assistance **regardless of prediction outcome** (correct or incorrect).

#### Supported LLM Providers
```
┌─────────────────────────────────────────────────┐
│           AI SDK Multi-LLM Support              │
├─────────────────────────────────────────────────┤
│ • Alibaba Qwen (Primary/Default)                │
│ • Google Gemini (Alternative)                   │
│ • OpenAI GPT-4 / GPT-3.5-turbo                  │
│ • Groq LLaMA (Fast inference)                   │
│ • Anthropic Claude (Optional)                   │
└─────────────────────────────────────────────────┘
```

#### LLM System Prompts Architecture
System prompts are **disease-specific** and stored in `frontend/src/lib/constant.tsx`:

**Example: Heart Disease Insight Prompt**
```typescript
// frontend/src/lib/constant.tsx
export const HEART_DISEASE_INSIGHT_PROMPT = `
You are a medical AI assistant specializing in cardiovascular health.
The user just received a heart disease prediction from our ML model.

PREDICTION DETAILS:
- Prediction: {{prediction}} (0=No Disease, 1=Disease Present)
- Confidence: {{probability}}%
- Key Risk Factors: {{riskFactors}}

TASK:
1. Explain what the prediction means in simple, patient-friendly language
2. Contextualize the result based on their specific input values
3. If HIGH RISK (prediction=1): Provide urgent medical recommendations
4. If LOW RISK (prediction=0): Explain protective factors and prevention tips
5. List specific lifestyle changes they can implement
6. Recommend follow-up medical tests or specialist consultations
7. Address common misconceptions about heart disease

Keep the tone compassionate, informative, and non-alarmist.
`
```

#### LLM Prediction Assistance Flow

**For POSITIVE Predictions (Disease Risk Detected):**
```
ML Prediction: 1 (Disease Present)
     ↓
LLM System Prompt (disease-specific)
     ↓
AI generates:
  • What the diagnosis means
  • Why the model flagged this risk (feature importance)
  • Immediate action items (consult cardiologist, modify diet)
  • Preventive measures if risk is early-stage
  • Emergency warning signs to watch for
     ↓
User receives detailed, actionable insights
```

**For NEGATIVE Predictions (No Disease Risk):**
```
ML Prediction: 0 (No Disease)
     ↓
LLM System Prompt (disease-specific)
     ↓
AI generates:
  • Reassurance and explanation of low-risk factors
  • Preventive health habits to maintain this status
  • Which metrics are healthy (e.g., "Your cholesterol is excellent")
  • Long-term monitoring recommendations
  • Age-specific health tips
     ↓
User receives preventive guidance and health reinforcement
```

#### Example LLM Responses

**Heart Disease - High Risk (Prediction=1):**
```
ML Model Result: ❌ HEART DISEASE RISK DETECTED

AI Insights (via Qwen):
"Based on your health metrics, our model detected a high risk for heart disease. 
Here's what this means:

YOUR RISK FACTORS:
- High Cholesterol (240 mg/dL) - This narrows arteries
- Elevated Blood Pressure (150 mm Hg) - Strains your heart
- ST-T Abnormality (Resting ECG) - Suggests past heart stress

IMMEDIATE ACTIONS:
1. Schedule cardiology appointment WITHIN 2 WEEKS
2. Start low-sodium, low-fat diet immediately
3. Increase moderate exercise (30 min/day)
4. Monitor chest pain or shortness of breath

EMERGENCY WARNING SIGNS (Call 911):
- Severe chest pain or pressure
- Difficulty breathing
- Cold sweat or nausea with chest discomfort

LONG-TERM PLAN:
- Take prescribed medications (statins, ACE inhibitors)
- Stress management (meditation, yoga)
- Regular check-ups every 3 months"
```

**Diabetes - Low Risk (Prediction=0):**
```
ML Model Result: ✅ NO SIGNIFICANT DIABETES RISK

AI Insights (via Qwen):
"Great news! Your current health profile shows a low diabetes risk. Here's why:

PROTECTIVE FACTORS:
- Normal Fasting Glucose (95 mg/dL) - Good metabolic health
- Healthy BMI (22.5) - Within ideal weight range
- Strong Diabetes Pedigree Score - Genetic predisposition is low

MAINTAIN YOUR HEALTH:
1. Continue current exercise routine (increases insulin sensitivity)
2. Keep diet balanced with whole grains and lean proteins
3. Avoid sugary drinks and processed foods
4. Maintain current weight through balanced nutrition

PREVENTION TIPS:
- Annual glucose screening (especially after age 45)
- Monitor family history if relatives develop diabetes
- Manage stress (chronic stress increases diabetes risk)
- Sleep 7-9 hours nightly (poor sleep affects glucose metabolism)

NEXT CHECKUP: In 1 year or if you experience unusual thirst/fatigue"
```

#### LLM Configuration

**Backend Support** (Optional Extension):
```python
# Could be extended to: backend/app/service/llm_assistant.py
from ai import openai, anthropic
from models.heart import HeartRequest, HeartResponse

async def get_llm_insights(
    prediction: HeartResponse,
    input_data: HeartRequest,
    llm_provider: str = "qwen"  # Default to Qwen
) -> str:
    """
    Generate LLM-powered insights for a disease prediction.
    
    Args:
        prediction: ML model output
        input_data: User input features
        llm_provider: Which LLM to use ('qwen', 'google', 'openai', 'groq')
    
    Returns:
        AI-generated insight text
    """
    # System prompt selection based on prediction
    if prediction.prediction == 1:
        system_prompt = HIGH_RISK_PROMPT  # Risk-focused
    else:
        system_prompt = LOW_RISK_PROMPT   # Prevention-focused
    
    # LLM call with context
    response = await call_llm(
        provider=llm_provider,
        system_prompt=system_prompt,
        user_input=f"Patient data: {input_data.dict()}\nPrediction: {prediction.prediction_label}"
    )
    
    return response
```

#### LLM Response Characteristics

**Always Provided** (Regardless of Prediction):
✅ Clear explanation in layperson terms  
✅ Contextualization using patient's specific data  
✅ Actionable next steps and lifestyle advice  
✅ Risk stratification and urgency levels  
✅ Preventive health recommendations  

**Safety Guardrails**:
🛡️ No diagnosis claims (AI assists, doctor diagnoses)  
🛡️ Always recommend professional medical consultation  
🛡️ Emergency symptoms clearly flagged  
🛡️ Disclaimers about AI limitations  
🛡️ Privacy-compliant (no PHI storage)  

#### Frontend Implementation (Vercel AI SDK)

**Architecture**:
The frontend uses Vercel's AI SDK for multi-LLM support with streaming text responses and multi-turn conversations.

**API Route** (`frontend/src/app/api/chat/route.ts`):
```typescript
import { createOpenAI } from '@ai-sdk/openai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText, LanguageModel } from 'ai';
import { AI_SYSTEM_PROMPT } from "@/lib/constant";
import { createGroq } from '@ai-sdk/groq';

export const maxDuration = 30;

// Provider factories for each LLM
const qwenProvider = createOpenAI({
    baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
    apiKey: process.env.ALI_BABA!,
});

const geminiProvider = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY!,
});

const groqProvider = createGroq({
    apiKey: process.env.GROQ_API_KEY!,
});

// Model registry with type safety
export type ModelId =
    | 'qwen-plus' | 'qwen-turbo' | 'qwen-max' | 'qwen3.6-flash'
    | 'gemini-2.0-flash' | 'gemini-3-flash-preview' | 'gemini-1.5-pro'
    | 'llama-3.1-8b-instant' | 'openai/gpt-oss-120b' | 'groq/compound';

function resolveModel(modelId: ModelId): LanguageModel {
    switch (modelId) {
        case 'qwen-plus':        return qwenProvider('qwen-plus');
        case 'qwen-turbo':       return qwenProvider('qwen-turbo');
        case 'qwen-max':         return qwenProvider('qwen-max');
        case 'qwen3.6-flash':    return qwenProvider('qwen3.6-flash');
        case 'gemini-2.0-flash': return geminiProvider('gemini-2.5-flash');
        case 'gemini-3-flash-preview': return geminiProvider('gemini-3-flash-preview');
        case 'gemini-1.5-pro':   return geminiProvider('gemini-1.5-pro');
        case 'llama-3.1-8b-instant': return groqProvider('llama-3.1-8b-instant');
        case 'openai/gpt-oss-120b':  return groqProvider('openai/gpt-oss-120b');
        case 'groq/compound':    return groqProvider('groq/compound');
        default: return qwenProvider('qwen-plus');
    }
}

// Stream text response with system prompt
export async function POST(req: Request) {
    try {
        const { messages, modelId } = await req.json();
        const model = resolveModel((modelId as ModelId) ?? 'qwen-plus');

        const result = streamText({
            model,
            system: AI_SYSTEM_PROMPT,
            messages,
            maxOutputTokens: 100,
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error('Chat error:', error);
        return new Response('Error generating response', { status: 500 });
    }
}
```


**Component Integration Flow**:
```
User Form Submission
     ↓
ML Prediction API Call
     ↓
PredictionCard displays result
     ↓
User clicks "Generate AI Analysis"
     ↓
AIInsightCard becomes active
     ↓
handleGenerate() sends:
  - Disease Type
  - ML Prediction Result
  - Patient Input Data
     ↓
route.ts resolveModel(modelId)
     ↓
streamText() generates streaming response
     ↓
useChat() manages message state
     ↓
ModelSwitcher allows real-time LLM switching
     ↓
Messages render with Markdown support
```

**Environment Variables** (`.env.local`):
```bash
# Alibaba Qwen (Primary)
ALI_BABA=sk_xxxxx_qwen_api_key

# Google Gemini
GOOGLE_API_KEY=sk_xxxxx_google_api_key

# Groq (LLaMA & others)
GROQ_API_KEY=gsk_xxxxx_groq_api_key
```

**Key Implementation Details**:
- ✅ **Streaming Responses**: Uses `streamText()` from AI SDK for real-time token streaming
- ✅ **Multi-Turn Conversations**: `useChat()` hook manages conversation history
- ✅ **Dynamic Model Switching**: Switch LLMs mid-conversation with toast notification
- ✅ **Type Safety**: `ModelId` type ensures only valid models are used
- ✅ **System Prompt Integration**: Uses `AI_SYSTEM_PROMPT` from `constant.tsx` for disease context
- ✅ **Error Handling**: Catches API errors and displays user-friendly messages
- ✅ **Loading States**: Shows skeleton loaders during streaming
- ✅ **Medical Compliance**: Includes disclaimers about AI-generated insights

#### Configuring LLM Provider

**Model Selection Priority**:
```typescript
// frontend/src/components/shared/ai-insight-card.tsx
const MODEL_GROUPS = [
    {
        provider: 'Qwen',
        models: [
            { id: 'qwen-plus',  label: 'Qwen Plus',  badge: 'Balanced' },
            { id: 'qwen-turbo', label: 'Qwen Turbo', badge: 'Fast' },
            { id: 'qwen-max',   label: 'Qwen Max',   badge: 'Powerful' },
            { id: 'qwen3.6-flash', label: 'Qwen 3.6 Flash', badge: 'Powerful' },
        ],
    },
    {
        provider: 'Google',
        models: [
            { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', badge: 'Fast' },
            { id: 'gemini-1.5-pro',   label: 'Gemini 1.5 Pro',   badge: 'Pro' },
            { id: 'gemini-3-flash-preview', label: 'Gemini 3.0 Flash', badge: 'Pro' },
        ],
    },
    {
        provider: 'Groq',
        models: [
            { id: 'llama-3.1-8b-instant', label: 'LLaMA 3.1 8B', badge: 'Smart' },
            { id: 'openai/gpt-oss-120b',  label: 'OpenAI GPT 120B', badge: 'Fast' },
            { id: 'groq/compound', label: 'Groq Compound', badge: 'Fast' },
        ],
    },
]
```

**Dynamic Model Resolution**:
The `resolveModel()` function in `route.ts` automatically selects the correct provider and model ID based on user selection, ensuring seamless switching without reloading.

---

## 📊 Database Design

### Authentication & User Management

#### `user` Table
```sql
CREATE TABLE "user" (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  email_verified BOOLEAN DEFAULT false,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### `session` Table
```sql
CREATE TABLE "session" (
  id TEXT PRIMARY KEY,
  expires_at TIMESTAMP NOT NULL,
  token TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT,
  user_id TEXT NOT NULL → references user(id) ON DELETE CASCADE
);
CREATE INDEX session_userId_idx ON session(user_id);
```

#### `account` Table
```sql
CREATE TABLE "account" (
  id TEXT PRIMARY KEY,
  account_id TEXT NOT NULL,
  provider_id TEXT NOT NULL,  -- e.g., 'google', 'github'
  user_id TEXT NOT NULL → references user(id) ON DELETE CASCADE,
  access_token TEXT,
  refresh_token TEXT,
  id_token TEXT,
  access_token_expires_at TIMESTAMP,
  refresh_token_expires_at TIMESTAMP,
  scope TEXT,
  password TEXT,              -- hashed for email/password provider
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX account_userId_idx ON account(user_id);
```

#### `verification` Table
```sql
CREATE TABLE "verification" (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX verification_identifier_idx ON verification(identifier);
```

### Entity Relationships
```
user (1) ──→ (many) session
user (1) ──→ (many) account
```

### ORM: Drizzle Configuration
- **Framework**: Drizzle ORM (TypeScript-first)
- **Config**: [drizzle.config.ts](drizzle.config.ts)
- **Migrations**: [frontend/src/utils/drizzle](frontend/src/utils/drizzle)
- **Database**: PostgreSQL (Neon serverless)
- **Usage**: Automatic schema generation, type-safe queries, migrations

---

## 🔌 API Documentation Architecture

### Base URL
- **Development**: `http://127.0.0.1:8000`
- **Production**: (To be configured, use env var)

### Core Endpoints

#### Heart Disease Prediction
```
POST /heart/predict
Content-Type: application/json

Request:
{
  "age": 70,
  "sex": 1,                  // 0=Female, 1=Male
  "cp": 1,                   // Chest pain type
  "trestbps": 150,           // Resting blood pressure (mm Hg)
  "chol": 240,               // Serum cholesterol (mg/dL)
  "fbs": 1,                  // Fasting blood sugar > 120
  "restecg": 1,              // Resting ECG
  "thalach": 130,            // Max heart rate achieved
  "exang": 1,                // Exercise-induced angina
  "oldpeak": 1.8,            // ST depression
  "slope": 2,                // ST segment slope
  "ca": 1,                   // Coronary artery calcification
  "thal": 7                  // Thalassemia
}

Response (200 OK):
{
  "prediction": 1,
  "prediction_label": "Heart Disease"
}

Response (422 Unprocessable Entity):
{
  "detail": [
    {"loc": ["body", "age"], "msg": "ensure this value is > 0"}
  ]
}
```

#### Diabetes Prediction
```
POST /diabetes/predict
Content-Type: application/json

Request:
{
  "Pregnancies": 6,
  "Glucose": 148,
  "BloodPressure": 72,
  "SkinThickness": 35,
  "Insulin": 0,
  "BMI": 33.6,
  "DiabetesPedigreeFunction": 0.627,
  "Age": 50
}

Response (200 OK):
{
  "prediction": 1,
  "prediction_label": "Diabetic"
}
```

#### Liver Disease Prediction
```
POST /liver/predict
Content-Type: application/json

Request:
{
  "Age": 65,
  "Gender": 1,               // 0=Female, 1=Male
  "TB": 0.7,                 // Total Bilirubin
  "DB": 0.1,                 // Direct Bilirubin
  "Alkphos": 52,             // Alkaline Phosphatase
  "Sgpt": 33,                // SGPT (ALT)
  "Sgot": 28,                // SGOT (AST)
  "TP": 6.9,                 // Total Protein
  "ALB": 3.9,                // Albumin
  "A/G_Ratio": 1.8           // Albumin/Globulin ratio
}

Response (200 OK):
{
  "prediction": 0,
  "prediction_label": "Normal Liver Function"
}
```

#### Stroke Prediction
```
POST /stroke/predict
Content-Type: application/json

Request:
{
  "gender": "Female",
  "age": 67,
  "hypertension": 0,         // 0=No, 1=Yes
  "heart_disease": 0,
  "ever_married": "Yes",
  "work_type": "Private",
  "Residence_type": "Urban",
  "avg_glucose_level": 228.69,
  "bmi": 36.6,
  "smoking_status": "formerly smoked"
}

Response (200 OK):
{
  "prediction": 1,
  "prediction_label": "High Stroke Risk"
}
```

### Error Handling
- **400 Bad Request**: Malformed JSON
- **422 Unprocessable Entity**: Pydantic validation failed (includes field errors)
- **500 Internal Server Error**: Model loading or prediction error (check server logs)

### CORS Policy
**Allowed Origins** (in [main.py](backend/app/main.py)):
- `http://localhost`
- `http://localhost:8080`
- `http://localhost:3000`

**For production**: Extend origins list or use env var

---

## ⚙️ Development Conventions

### Backend Conventions

#### 1. Pydantic Models (Mandatory)
- **All API payloads** must use Pydantic models
- Define in `backend/app/models/{disease}.py`
- Use `Field(...)` for validation & examples
- Use `Enum` classes for categorical fields

Example:
```python
from pydantic import BaseModel, Field
from enum import Enum

class SexEnum(int, Enum):
    female = 0
    male = 1

class HeartRequest(BaseModel):
    age: int = Field(..., example=70, description="Age in years")
    sex: SexEnum = Field(..., example=0)

class HeartResponse(BaseModel):
    prediction: int
    prediction_label: str
```

#### 2. Service Layer (Business Logic)
- All ML logic in `backend/app/service/{disease}.py`
- Load models at module level (once on import, not per request)
- Accept `dict` input, return `dict` output
- Use `os.path.join()` for cross-platform paths

Example:
```python
import joblib
import pandas as pd
import os

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(CURRENT_DIR, "..", "pickle-models", "heart", "heart.pkl")
model = joblib.load(MODEL_PATH)

def predict_heart(data: dict):
    df = pd.DataFrame([data])
    prediction = model.predict(df)[0]
    label = "Heart Disease" if prediction == 1 else "No Heart Disease"
    return {"prediction": int(prediction), "prediction_label": label}
```

#### 3. Routing (HTTP Handlers)
- Minimal logic in routes; delegate to service layer
- Use `response_model=PydanticModel` for type safety
- Use FastAPI decorators: `@router.post()`, `@router.get()`

Example:
```python
from fastapi import APIRouter
from models.heart import HeartRequest, HeartResponse
from service.heart import predict_heart

router = APIRouter(prefix="/heart", tags=["Heart Disease Prediction"])

@router.post("/predict", response_model=HeartResponse)
def predict(request: HeartRequest):
    result = predict_heart(request.dict())
    return result
```

#### 4. Enum Naming
- Use clear, descriptive names
- Example: `SexEnum` (not `SEnum`), `CPEnum` (not `ChestPainEnum`)
- Values must match ML model training data (0-indexed)

#### 5. Environment Variables
- Use `python-dotenv` for secrets, API keys
- Access: `os.getenv("VARIABLE_NAME")`
- Never commit `.env` files

### Frontend Conventions

#### 1. Zod Schema Validation (Mandatory)
- All form inputs validated with Zod
- Define in `frontend/src/lib/schemas.ts`
- Must match backend Pydantic schema (field names, types, ranges)
- Use `.coerce.number()` for string-to-number conversion

Example:
```typescript
import { z } from 'zod'

export const heartSchema = z.object({
  age: z.coerce.number().int().gt(0),
  sex: z.enum(['0', '1']),
  cp: z.enum(['0', '1', '2', '3']),
  trestbps: z.coerce.number().int().gt(0),
  // ... more fields
})

export type HeartFormValues = z.infer<typeof heartSchema>
```

#### 2. React Hook Form + Zod
- Use `useForm()` hook with Zod resolver
- Destructure `control`, `handleSubmit`, `formState`
- Display errors from `formState.errors`

Example:
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { heartSchema, HeartFormValues } from '@/lib/schemas'

export function HeartForm() {
  const form = useForm<HeartFormValues>({
    resolver: zodResolver(heartSchema),
  })

  const onSubmit = async (data: HeartFormValues) => {
    const result = await predictDisease('/heart/predict', data)
    // Handle result
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

#### 3. TanStack Query for Server State
- Use `useQuery()` for fetching
- Use `useMutation()` for mutations
- Always provide `queryKey` for caching
- Handle loading, error states

Example:
```typescript
import { useQuery, useMutation } from '@tanstack/react-query'
import { predictDisease } from '@/lib/api-client'

function DiseaseForm() {
  const mutation = useMutation({
    mutationFn: (data) => predictDisease('/heart/predict', data),
    onSuccess: (data) => {
      // Handle success
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  return <button onClick={() => mutation.mutate(formData)}>Predict</button>
}
```

#### 4. API Client Abstraction
- All backend calls via `lib/api-client.ts`
- Single `BASE_URL` definition (environment variable in production)
- Export typed functions like `predictDisease<T>()`

Example:
```typescript
export const BASE_URL = 'http://127.0.0.1:8000'

export async function predictDisease<TRequest>(
  endpoint: string,
  values: TRequest
): Promise<PredictionResponse> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.detail || 'Prediction failed')
  }

  return response.json()
}
```

#### 5. Shadcn UI Components
- Use pre-built components from `src/components/ui/`
- Compose components to build forms, cards, dialogs
- Follow Shadcn patterns for consistency

Example:
```typescript
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
```

#### 6. Functional Components Only
- No class components
- Use React 19 features (hooks, useTransition, etc.)
- Prefer composition over inheritance

#### 7. TypeScript Strict Mode
- Enabled in `tsconfig.json`
- All functions must have explicit return types
- All props must be typed

#### 8. LLM Integration (AI Insights via Vercel AI SDK)
- **API Route**: `frontend/src/app/api/chat/route.ts` handles model resolution and streaming
- **Components**: 
  - `AIInsightCard`: Multi-turn chat interface with streaming
  - `ModelSwitcher`: Dropdown for dynamic LLM selection
  - `PredictionCard`: Displays ML prediction result
- **Hooks**: Use `useChat()` from AI SDK for message management
- **Streaming**: `streamText()` for real-time token streaming with `maxOutputTokens: 100`
- **System Prompts**: Configured in `frontend/src/lib/constant.tsx` (exported as `AI_SYSTEM_PROMPT`)
- **Model Registry**: Maintain `ModelId` type in `route.ts` when adding new models
- **Provider Setup**: Environment variables `ALI_BABA`, `GOOGLE_API_KEY`, `GROQ_API_KEY`

Example disease-specific system prompt in `constant.tsx`:
```typescript
// frontend/src/lib/constant.tsx
export const AI_SYSTEM_PROMPT = `
You are a medical AI assistant specializing in [DISEASE_TYPE] health.
The user has received an ML prediction. Your role is to:

1. Explain the prediction in simple, patient-friendly language
2. Contextualize using their specific input values
3. For HIGH RISK predictions: Provide urgent medical actions, emergency warnings
4. For LOW RISK predictions: Explain protective factors, prevention strategies
5. Give actionable next steps and lifestyle recommendations
6. Maintain compassionate, non-alarmist tone
7. Always recommend consulting with a healthcare professional

Never claim to diagnose - only interpret the ML model's output.
`
```

**Adding LLM Support to New Models**:
```typescript
// In frontend/src/app/api/chat/route.ts
export type ModelId = 
    | 'qwen-plus' | 'qwen-turbo'  // Existing
    | 'new-model-id'              // Add new models here

function resolveModel(modelId: ModelId): LanguageModel {
    // ... existing cases
    case 'new-model-id': return newProvider('model-name');
}
```

---

## 🎯 Coding Standards

### Backend (Python)

#### Code Style
- **Formatter**: Black (or follow PEP 8)
- **Linter**: Flake8 or Pylint
- **Type Hints**: Use Python 3.10+ type hints for all functions

Example:
```python
from typing import Dict, Any

def predict_heart(data: Dict[str, Any]) -> Dict[str, Any]:
    """Predict heart disease from input features.
    
    Args:
        data: Dictionary with heart disease features
        
    Returns:
        Dictionary with prediction and label
    """
    df = pd.DataFrame([data])
    prediction = model.predict(df)[0]
    return {"prediction": int(prediction), "prediction_label": label}
```

#### Naming Conventions
- **Variables**: `snake_case`
- **Constants**: `UPPER_SNAKE_CASE`
- **Classes**: `PascalCase`
- **Functions**: `snake_case`

#### Import Organization
```python
# Standard library
import os
import json
from typing import Dict, Any

# Third-party
import pandas as pd
import numpy as np
from fastapi import APIRouter

# Local
from models.heart import HeartRequest, HeartResponse
from service.heart import predict_heart
```

#### Error Handling
- Catch specific exceptions (not bare `except`)
- Log errors with context
- Return meaningful error messages to client

```python
try:
    result = model.predict(df)
except ValueError as e:
    logger.error(f"Prediction failed: {e}")
    raise HTTPException(status_code=422, detail=str(e))
```

### Frontend (TypeScript/React)

#### Code Style
- **Formatter**: Prettier (configured in ESLint)
- **Linter**: ESLint (with React 19 rules)
- **Type Hints**: Explicit return types for all functions

Example:
```typescript
interface PredictionResult {
  prediction: number
  prediction_label: string
}

async function fetchPrediction(endpoint: string): Promise<PredictionResult> {
  // Implementation
}
```

#### Naming Conventions
- **Variables**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE` (or `camelCase` if exported)
- **Components**: `PascalCase`
- **Hooks**: `useHookName` (camelCase with 'use' prefix)
- **Types/Interfaces**: `PascalCase`

#### Component Structure
```typescript
'use client'  // Mark as client if needed

import React from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { heartSchema, type HeartFormValues } from '@/lib/schemas'

interface HeartFormProps {
  onSubmit: (data: HeartFormValues) => void
}

export function HeartForm({ onSubmit }: HeartFormProps): React.JSX.Element {
  const form = useForm<HeartFormValues>({
    resolver: zodResolver(heartSchema),
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* JSX */}
    </form>
  )
}
```

#### File Organization
```
src/
├── components/
│   ├── ui/                 # Shadcn primitives
│   ├── shared/             # Shared business logic
│   │   ├── prediction-card.tsx
│   │   ├── disease-form.tsx
│   │   └── ai-insight-card.tsx
│   └── protected-layout.tsx
├── app/
│   └── dashboard/
│       ├── layout.tsx
│       ├── page.tsx
│       └── _components/    # Private components
├── lib/
│   ├── api-client.ts       # API abstraction
│   ├── schemas.ts          # Zod validation
│   ├── types.ts            # TypeScript interfaces
│   ├── constant.tsx        # Constants, prompts
│   └── utils.ts            # Helper functions
└── hooks/
    └── use-mobile.ts
```

#### Error Handling
- Use Sonner toast for user feedback
- Log errors to console (or external service)
- Provide user-friendly error messages

```typescript
const mutation = useMutation({
  mutationFn: (data) => predictDisease('/heart/predict', data),
  onError: (error: Error) => {
    console.error('Prediction failed:', error)
    toast.error(error.message || 'Prediction failed. Please try again.')
  },
})
```

#### Testing
- Unit tests for utilities and hooks
- Integration tests for API interactions
- E2E tests for critical user flows

---

## 🚀 Build & Run Instructions

### Backend Setup

#### Prerequisites
- Python 3.10+
- Virtual environment (`venv` or `pyenv`)

#### Steps
```bash
cd backend/app

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # Linux/Mac: source .venv/bin/activate
# or on Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn main:my_app --reload

# API docs available at http://127.0.0.1:8000/docs
# (Swagger UI)
```

### Frontend Setup

#### Prerequisites
- Node.js 18+
- pnpm (preferred) or npm

#### Steps
```bash
cd frontend

# Install dependencies
pnpm install
# or npm install

# Run development server
pnpm dev
# or npm run dev

# App available at http://localhost:3000
# HMR (Hot Module Replacement) enabled
```

### Running Both Services
```bash
# Terminal 1: Backend
cd backend/app
source .venv/bin/activate
uvicorn main:my_app --reload

# Terminal 2: Frontend
cd frontend
pnpm dev
```

### Production Build

#### Backend
```bash
# No changes needed; use production ASGI server like Gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:my_app
```

#### Frontend
```bash
pnpm build  # Creates optimized build in .next/
pnpm start  # Runs production server
```

---

## 🚀 Common Development Tasks

### Adding a New Disease Module

**Checklist**:
1. ✅ Create `backend/app/models/{disease}.py` with Pydantic schemas
2. ✅ Create `backend/app/service/{disease}.py` with prediction logic
3. ✅ Create `backend/app/routes/{disease}.py` with API endpoint
4. ✅ Place serialized model in `backend/app/pickle-models/{disease}/`
5. ✅ Register router in `backend/app/main.py`
6. ✅ Add Zod schema to `frontend/src/lib/schemas.ts`
7. ✅ Create form component in `frontend/src/components/shared/`
8. ✅ Update `frontend/src/lib/constant.tsx` with input field config **AND LLM system prompts**

**Example: Adding Hypertension Module**

Backend model:
```python
# backend/app/models/hypertension.py
from pydantic import BaseModel, Field

class HypertensionRequest(BaseModel):
    age: int = Field(..., example=65)
    sex: int = Field(..., example=1)
    # ... more fields

class HypertensionResponse(BaseModel):
    prediction: int
    prediction_label: str
```

Frontend LLM integration:
```typescript
// frontend/src/lib/constant.tsx
export const hypertensionInputFields = [
  // Form field configs
]

export const HYPERTENSION_INSIGHT_PROMPT = `
You are a medical assistant specializing in hypertension management.
Explain the blood pressure prediction result to the patient.

For HIGH RISK: Emphasize need for immediate medical intervention, medication, 
lifestyle changes (reduce sodium, exercise, weight loss).

For LOW RISK: Provide tips to maintain healthy blood pressure through diet, 
stress management, regular monitoring.

Include emergency signs: severe headache, shortness of breath, chest pain.
`
```

### Updating a Model

**Steps**:
1. Train new model in Jupyter notebook
2. Export as pickle: `joblib.dump(model, "hypertension.pkl")`
3. Replace file in `backend/app/pickle-models/hypertension/`
4. If input fields changed: update Pydantic model in `models/hypertension.py`
5. Update Zod schema in `frontend/src/lib/schemas.ts` (field names must match)
6. Restart backend: `Ctrl+C` and re-run uvicorn

### Debugging Model Prediction

**Common Issues**:

| Issue | Cause | Solution |
|-------|-------|----------|
| Model not found | Pickle file missing | Check path in service file; verify file exists |
| Prediction error | Input shape mismatch | Ensure DataFrame columns match training data |
| Type error | Field name mismatch | Compare Pydantic model vs service function |
| Invalid enum | Enum value out of range | Check HeartRequest enum values (0-indexed) |

**Debug Script**:
```python
import joblib
import pandas as pd

# Test model loading
model = joblib.load("backend/app/pickle-models/heart/heart.pkl")
print(f"Model: {model}")
print(f"Classes: {model.classes_}")

# Test prediction
test_data = {...}  # Your test input
df = pd.DataFrame([test_data])
prediction = model.predict(df)
print(f"Prediction: {prediction}")
```

---


### External Documentation
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Pydantic Docs](https://docs.pydantic.dev/latest/)
- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev/)
- [Zod Docs](https://zod.dev/)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Shadcn UI](https://ui.shadcn.com/)
- [Drizzle ORM Docs](https://orm.drizzle.team/)

---

## 🔄 Version Control & Collaboration

### Branching Strategy
- `main`: Production-ready code
- `dev`: Development integration branch



Examples:
- `feat(heart): add resting ECG input field`
- `fix(api): correct enum value range in HeartRequest`
- `docs(agents): update deployment instructions`

### Pull Request Checklist
- ✅ Backend tests pass
- ✅ Frontend builds without errors
- ✅ Type checking passes (TypeScript, Python)
- ✅ Zod schema synced with Pydantic model
- ✅ New dependencies documented
- ✅ Documentation updated

---

## 🎯 Quick Navigation (For Common Scenarios)

| Task | Location |
|------|----------|
| Add disease module | Start in [backend/app/models/](backend/app/models/) |
| Update ML model | Replace pickle in [backend/app/pickle-models/](backend/app/pickle-models/) |
| Fix frontend form | Check [frontend/src/lib/schemas.ts](frontend/src/lib/schemas.ts) vs backend schema |
| Debug API crash | Check [backend/app/main.py](backend/app/main.py) logs and model paths |
| Configure AI prompts | Edit [frontend/src/lib/constant.tsx](frontend/src/lib/constant.tsx) |
| Database schema | See [frontend/src/utils/schema.ts](frontend/src/utils/schema.ts) |
| CORS issues | Update [backend/app/main.py](backend/app/main.py) origins list |
| Backend dependencies | Edit [backend/app/requirements.txt](backend/app/requirements.txt) |
| Frontend dependencies | Edit [frontend/package.json](frontend/package.json) |

---

## 📊 Project Metrics & Status

| Metric | Value |
|--------|-------|
| **Deployed Diseases** | 4 (Heart, Diabetes, Liver, Stroke) |
| **Backend API Endpoints** | 4 `/predict` endpoints |
| **Database Tables** | 4 (user, session, account, verification) |
| **Frontend Pages** | Dashboard, Login, Signup, Landing |
| **ML Models** | Scikit-learn classifiers (pickle format) |
| **Test Coverage** | To be implemented |
| **Performance Target** | <200ms average prediction latency |
| **Availability Target** | 99.5% uptime |

---
