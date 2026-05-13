# Pulse AI — Agent Instructions

Pulse AI is a full-stack healthcare AI platform for disease-wise medical prediction. It combines FastAPI backend with ML models and a modern Next.js frontend.

## 🏗️ Project Structure

**Modular disease-specific architecture:**
- **Backend** (`/backend/app`): FastAPI REST API with 4 disease modules (diabetes, heart, liver, stroke)
  - `routes/`: API endpoints per disease
  - `service/`: ML prediction logic per disease
  - `models/`: Pydantic request/response schemas per disease
  - `pickle-models/`: Serialized Scikit-learn models (joblib format)
  - `main.py`: FastAPI app entry point with CORS config

- **Frontend** (`/frontend`): Next.js 16 + React 19 application
  - `src/app/`: App Router (auth, dashboard, site sections)
  - `src/components/`: Reusable UI components (Shadcn UI patterns)
  - `src/lib/`: API client, schemas, types, utilities
  - `src/api/`: Backend integration points

- **Models** (`/models`): Data science exploration and model files
  - `notebooks/`: Jupyter notebooks for each disease
  - `pickle-models/`: Source ML models (synced to backend)

## 🔄 Architectural Patterns

### Disease Module Pattern
Each disease follows a **3-file pattern**: routes → service → models

**Example: Heart Disease Module**
```
backend/app/
├── routes/heart.py        # POST /heart/predict
├── service/heart.py       # predict_heart(data: dict) business logic
├── models/heart.py        # HeartRequest, HeartResponse (Pydantic)
└── pickle-models/heart/heart.pkl
```

**Frontend counterpart:**
```
frontend/src/
├── lib/schemas.ts         # heartSchema (Zod), HeartFormValues
└── api/                   # Calls to /heart/predict
```

### Backend Request/Response Flow
1. Route receives `HeartRequest` (Pydantic model)
2. Calls `service.predict_heart(request.dict())`
3. Service loads model from pickle, predicts on pandas DataFrame
4. Returns `HeartResponse` with `prediction` and `prediction_label`

### Frontend Form Integration
1. Form data validated against Zod schema (`heartSchema`)
2. Validated data POSTed to backend via `predictDisease<TRequest>()`
3. Response typed as `PredictionResponse` interface
4. Results displayed in UI with Shadcn components

## ⚙️ Build & Run

### Backend
```bash
cd backend/app
source .venv/bin/activate      # Activate venv (must exist)
pip install -r requirements.txt
uvicorn main:my_app --reload   # Runs on http://127.0.0.1:8000
```

**Key dependencies:**
- fastapi 0.135.3, uvicorn, pydantic 2.13.1
- joblib (model loading), pandas, numpy (data processing)
- python-dotenv for environment variables

### Frontend
```bash
cd frontend
pnpm install
pnpm dev  # Runs on http://localhost:3000
```

**Key dependencies:**
- next 16.1.6, react 19.2.3, typescript 5
- @tanstack/react-query (server state)
- @ai-sdk/* (AI integration)
- shadcn-ui components, tailwindcss 4

## 🛠️ Development Conventions

### Backend
- **Use Pydantic models for ALL API payloads** — no raw dicts in responses
- **Separate concerns**: routes handle HTTP, services handle logic
- **Cross-platform paths**: Always use `os.path.join()` for model file paths
- **Model loading**: Use joblib; load once at module level to avoid reload overhead
- **Naming**: Enum classes for categorical fields (see `models/heart.py`)

### Frontend
- **Functional components only** — React 19 syntax
- **Zod for all form validation** — schemas in `lib/schemas.ts`, keep in sync with backend
- **TanStack Query for server state** — use hooks like `useQuery`, `useMutation`
- **API client abstraction**: All backend calls via `lib/api-client.ts`
- **Shadcn UI patterns** — use existing component library for consistency

### Cross-Stack
- **BASE_URL hardcoded** in `lib/api-client.ts` — change for production (use env var)
- **CORS configured** in backend for `localhost:3000` — extend `origins` list for new environments
- **Error handling**: Backend returns JSON error details; frontend catches and displays via Sonner toast

## 🚀 Common Tasks

### Adding a New Disease Module
1. Create `backend/app/routes/{disease}.py` following heart.py pattern
2. Create `backend/app/service/{disease}.py` with predict function
3. Create `backend/app/models/{disease}.py` with Request/Response schemas
4. Copy serialized model to `backend/app/pickle-models/{disease}/`
5. Include router in `main.py`: `my_app.include_router({disease}_router)`
6. Add `{disease}Schema` to `frontend/src/lib/schemas.ts`
7. Create prediction form component using schema and `predictDisease()`

### Updating a Model
1. Replace pickle file in `backend/app/pickle-models/{disease}/`
2. If input fields changed: update Pydantic model in `models/{disease}.py`
3. Update corresponding Zod schema in `frontend/src/lib/schemas.ts`
4. Restart backend: `uvicorn main:my_app --reload`

### Adding Frontend Features
- Use TanStack Query for API calls (see `useQuery` hooks in dashboard components)
- Wrap forms with React Hook Form + Zod validation
- Import Shadcn components from `src/components/ui/`

## ⚠️ Gotchas & Pitfalls

1. **Virtual environment required**: Backend won't run without `.venv/bin/activate`
2. **Model path issues**: Ensure pickle files exist in expected paths or service will crash
3. **Schema mismatch**: If Pydantic model and Zod schema differ, validation/serialization fails
4. **CORS errors**: Frontend will fail if BASE_URL doesn't match backend origin
5. **Type sync**: Both frontend (Zod) and backend (Pydantic) schemas must stay in sync
6. **Hot reload**: Changes to service logic require backend restart; frontend HMR is automatic

## 📚 Reference Documentation

- [GEMINI.md](GEMINI.md) — Detailed tech stack, conventions, AI integration details
- [readme.md](readme.md) — Project vision and high-level architecture
- [Backend directory](backend/app/) — Explore routes, services, models for patterns
- [Frontend src](frontend/src/) — Components, lib utilities, API integration examples

## 🎯 Quick Navigation

- **Add disease**: Start in `backend/app/routes/` (follow heart.py)
- **Update model**: Replace pickle file, update schemas
- **Frontend bug**: Check `api-client.ts` BASE_URL, CORS, or component state
- **Backend crash**: Usually model path or schema mismatch — check console error
- **Form validation**: Compare Zod schema vs Pydantic model for field mismatch

---

**Last Updated**: May 2026 | **Status**: Production-ready, modular architecture
