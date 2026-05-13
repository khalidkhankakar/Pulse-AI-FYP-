# Pulse AI — Gotchas & Pitfalls Resolution Guide

This guide provides detailed solutions for the 6 common issues that can block development on Pulse AI.

---

## 🚨 Pitfall #1: Virtual Environment Required

### Problem
Backend won't run without `.venv/bin/activate` — new developers often skip this step and get cryptic import errors.

### Root Cause
FastAPI, Pydantic, and ML dependencies are isolated in a virtual environment and won't be found on the system Python path.

### Resolution

#### Short-term (Immediate Relief)
- [ ] Add clear documentation in `backend/app/README.md`:
  ```bash
  # REQUIRED: Activate virtual environment first
  cd backend/app
  source .venv/bin/activate  # macOS/Linux
  # or on Windows:
  .venv\Scripts\activate
  ```

#### Medium-term (Automation)
- [ ] Create `backend/app/setup.sh`:
  ```bash
  #!/bin/bash
  # Create venv if missing
  if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
  fi
  
  # Activate venv
  source .venv/bin/activate
  
  # Install dependencies
  echo "Installing dependencies..."
  pip install -r requirements.txt
  
  echo "✅ Setup complete! Backend is ready."
  echo "Run: uvicorn main:my_app --reload"
  ```
- [ ] Update backend `main.py` docstring with setup instructions
- [ ] Add to `.gitignore`: `.venv/`, `*.pyc`, `__pycache__/`

#### Long-term (Automation for All)
- [ ] Create root `setup-all.sh` that sets up both backend and frontend
- [ ] Add GitHub Actions workflow that validates venv in CI/CD
- [ ] Document in project README: "Run `bash setup-all.sh` first"

### Validation Checklist
- [ ] `source .venv/bin/activate` works without errors
- [ ] `which python` points to `.venv/bin/python`
- [ ] `pip list` shows fastapi, pydantic, joblib, pandas
- [ ] `uvicorn main:my_app --reload` starts without ImportError

---

## 🚨 Pitfall #2: Model Path Issues

### Problem
Service crashes with cryptic errors if pickle files are missing or paths are wrong:
```
FileNotFoundError: No such file or directory: '../pickle-models/heart/heart.pkl'
```

### Root Cause
- Pickle files may not be synced from `/models/pickle-models/` to `/backend/app/pickle-models/`
- Relative paths break if working directory changes
- No validation on app startup to catch missing models early

### Resolution

#### Short-term (Immediate Relief)
- [ ] Add explicit error handling in each `service/{disease}.py`:
  ```python
  import joblib
  import os
  
  CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
  MODEL_PATH = os.path.join(CURRENT_DIR, "..", "pickle-models", "heart", "heart.pkl")
  
  if not os.path.exists(MODEL_PATH):
      raise FileNotFoundError(
          f"❌ Model not found at {MODEL_PATH}\n"
          f"   Run: bash sync-models.sh to copy pickle files from /models/"
      )
  
  model = joblib.load(MODEL_PATH)
  ```

#### Medium-term (Startup Validation)
- [ ] Create `backend/app/service/__init__.py` with validation:
  ```python
  import os
  from pathlib import Path
  
  def validate_model_exists(disease: str, model_path: str) -> None:
      """Validate that model file exists, raise helpful error if not."""
      if not os.path.exists(model_path):
          raise FileNotFoundError(
              f"\n❌ MISSING MODEL: {disease}\n"
              f"   Expected: {model_path}\n"
              f"   Run: bash sync-models.sh\n"
          )
  
  def validate_all_models() -> None:
      """Validate all disease models exist on startup."""
      diseases = ["heart", "diabetes", "liver", "stroke"]
      base_dir = os.path.dirname(os.path.abspath(__file__))
      
      for disease in diseases:
          model_path = os.path.join(base_dir, "..", "pickle-models", disease, f"{disease}.pkl")
          validate_model_exists(disease, model_path)
      
      print("✅ All models validated successfully")
  ```

- [ ] Call in `main.py` at startup:
  ```python
  from service import validate_all_models
  
  @my_app.on_event("startup")
  async def startup_event():
      validate_all_models()
      print("🚀 Backend initialized successfully")
  ```

#### Medium-term (Sync Script)
- [ ] Create `sync-models.sh` in backend:
  ```bash
  #!/bin/bash
  echo "Syncing pickle models..."
  cp -r ../../../models/pickle-models/* ./pickle-models/
  echo "✅ Models synced successfully"
  ```
- [ ] Add to CI/CD to validate models exist before running tests

#### Long-term (Structured Validation)
- [ ] Create `backend/app/config.py`:
  ```python
  import os
  from pathlib import Path
  
  class Config:
      MODELS_DIR = Path(__file__).parent / "pickle-models"
      DISEASES = ["heart", "diabetes", "liver", "stroke"]
      
      @classmethod
      def get_model_path(cls, disease: str) -> Path:
          """Get model path and validate it exists."""
          path = cls.MODELS_DIR / disease / f"{disease}.pkl"
          if not path.exists():
              raise FileNotFoundError(f"Model not found: {path}")
          return path
  ```

### Validation Checklist
- [ ] All pickle files exist: `backend/app/pickle-models/{disease}/{disease}.pkl`
- [ ] `sync-models.sh` copies files successfully
- [ ] Backend startup shows: "✅ All models validated successfully"
- [ ] Adding nonsense field to request doesn't cause model load error (validation happens first)

---

## 🚨 Pitfall #3: Schema Mismatch (Pydantic ↔ Zod)

### Problem
Fields in backend Pydantic model don't match frontend Zod schema, causing:
- Silent validation failures (form accepts data backend rejects)
- Type errors at runtime
- Data loss during serialization

Example:
```python
# Backend: models/heart.py
class HeartRequest(BaseModel):
    age: int
    sex: int
    cp: int
    # ❌ Missing "trestbps"

# Frontend: lib/schemas.ts
const heartSchema = z.object({
  age: z.number(),
  sex: z.enum(['0', '1']),
  cp: z.enum(['0', '1', '2', '3']),
  trestbps: z.number(),  # ❌ Backend doesn't expect this!
})
```

### Root Cause
- No single source of truth for field definitions
- Manual sync between two files gets out of sync over time
- No automated validation in CI/CD

### Resolution

#### Short-term (Immediate Relief)
- [ ] Create comparison document in root: `SCHEMA_MAPPING.md`:
  ```markdown
  # Schema Field Mapping
  
  ## Heart Disease
  
  | Backend (Pydantic) | Type | Frontend (Zod) | Type |
  |-------------------|------|----------------|------|
  | age | int | age | number |
  | sex | SexEnum | sex | enum['0','1'] |
  | cp | CPEnum | cp | enum['0','1','2','3'] |
  | trestbps | int | trestbps | number |
  | chol | int | chol | number |
  
  ✅ **Status**: Synced (May 12, 2026)
  ```
- [ ] Update whenever schema changes
- [ ] Add note in PR template: "⚠️ Updated SCHEMA_MAPPING.md?"

#### Medium-term (Automated Testing)
- [ ] Create `backend/app/tests/test_schemas.py`:
  ```python
  import json
  from models.heart import HeartRequest
  from models.diabetes import DiabetesRequest
  
  def test_schema_exports():
      """Export Pydantic schemas as JSON for frontend validation."""
      schemas = {
          "heart": HeartRequest.model_json_schema(),
          "diabetes": DiabetesRequest.model_json_schema(),
          "liver": LiverRequest.model_json_schema(),
          "stroke": StrokeRequest.model_json_schema(),
      }
      
      with open("schemas.json", "w") as f:
          json.dump(schemas, f, indent=2)
      
      print("✅ Schema JSON exported to schemas.json")
  
  def test_all_diseases_have_schemas():
      """Ensure all diseases have matching schema files."""
      required = ["heart", "diabetes", "liver", "stroke"]
      # ... validate all exist
  ```

- [ ] Create `frontend/__tests__/schemas.test.ts`:
  ```typescript
  import { heartSchema, diabetesSchema, liverSchema, strokeSchema } from '@/lib/schemas'
  import backendSchemas from '../backend-schemas.json'
  
  describe('Schema Validation', () => {
    it('should have matching heart schema fields', () => {
      const backendFields = Object.keys(backendSchemas.heart.properties)
      const frontendFields = heartSchema.shape
      
      expect(backendFields.sort()).toEqual(Object.keys(frontendFields).sort())
    })
    
    // Similar tests for other diseases
  })
  ```

- [ ] Add to CI/CD: fail build if tests don't pass

#### Medium-term (Naming Convention)
- [ ] Document strict convention in `CONTRIBUTING.md`:
  ```
  ## Schema Naming Convention
  
  **Backend**: PascalCase (HeartRequest, DiabetesResponse)
  **Frontend**: camelCase for schema, PascalCase for type
  
  When adding a field:
  1. Add to Pydantic model in backend/app/models/{disease}.py
  2. Add to Zod schema in frontend/src/lib/schemas.ts
  3. Run: npm run test:schemas
  4. Update SCHEMA_MAPPING.md
  5. Commit both changes together
  ```

#### Long-term (Shared Schema Source)
- [ ] Use shared schema generator (optional):
  - Option A: Define schemas in JSON, generate both Pydantic and Zod
  - Option B: Define in Python, export to JSON, import in TypeScript
  - Option C: Use OpenAPI/Swagger to auto-generate both

### Validation Checklist
- [ ] `SCHEMA_MAPPING.md` exists and is up-to-date
- [ ] `npm run test:schemas` passes in CI/CD
- [ ] Creating a test form with all fields works
- [ ] Backend rejects extra fields in request
- [ ] Missing required fields trigger validation error (not silent skip)

---

## 🚨 Pitfall #4: CORS Errors

### Problem
Frontend can't communicate with backend due to CORS mismatch:
```
Access to XMLHttpRequest at 'http://127.0.0.1:8000/heart/predict' 
from origin 'http://localhost:3000' has been blocked by CORS policy
```

### Root Cause
- `BASE_URL` hardcoded in `api-client.ts`: `'http://127.0.0.1:8000'`
- Backend CORS only allows `localhost:3000`, not `localhost` or other ports
- Environment differences (dev vs staging vs prod) not handled

### Resolution

#### Short-term (Immediate Relief)
- [ ] Ensure `main.py` CORS config includes all needed origins:
  ```python
  origins = [
      "http://localhost",
      "http://localhost:3000",
      "http://localhost:8080",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:8080",
  ]
  ```

#### Medium-term (Environment Variables)
- [ ] Update `frontend/src/lib/api-client.ts`:
  ```typescript
  // Before:
  export const BASE_URL = 'http://127.0.0.1:8000'
  
  // After:
  export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'
  ```

- [ ] Create `frontend/.env.local` (git-ignored):
  ```
  NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
  ```

- [ ] Create `frontend/.env.local.example`:
  ```
  # Backend API URL
  # Local development: http://127.0.0.1:8000
  # Staging: https://api-staging.example.com
  # Production: https://api.example.com
  NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
  ```

- [ ] Update `backend/app/main.py`:
  ```python
  import os
  from typing import List
  
  # Read CORS origins from environment
  CORS_ORIGINS_STR = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:8080")
  CORS_ORIGINS: List[str] = [origin.strip() for origin in CORS_ORIGINS_STR.split(",")]
  
  my_app.add_middleware(
      CORSMiddleware,
      allow_origins=CORS_ORIGINS,
      allow_credentials=True,
      allow_methods=["GET", "POST", "PUT", "DELETE"],
      allow_headers=["*"],
  )
  ```

- [ ] Create `backend/app/.env.local` (git-ignored):
  ```
  CORS_ORIGINS=http://localhost:3000,http://localhost:8080,http://127.0.0.1:3000
  ```

- [ ] Create `backend/app/.env.local.example`:
  ```
  # Comma-separated list of allowed origins
  # Local: http://localhost:3000,http://localhost:8080
  # Staging: https://app-staging.example.com
  # Production: https://app.example.com
  CORS_ORIGINS=http://localhost:3000,http://localhost:8080
  ```

#### Medium-term (Startup Validation)
- [ ] Add health check in frontend `src/app/layout.tsx`:
  ```typescript
  'use client'
  
  useEffect(() => {
    // Verify backend is reachable on mount
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/`)
      .catch(err => {
        console.error('❌ Backend not reachable:', process.env.NEXT_PUBLIC_API_URL)
        console.error('Update NEXT_PUBLIC_API_URL in .env.local')
      })
  }, [])
  ```

- [ ] Add error message in `api-client.ts`:
  ```typescript
  if (!response.ok) {
    const detail = error === 'CORS' 
      ? `CORS Error. Backend: ${BASE_URL}, ensure it's in CORS_ORIGINS`
      : errorData.detail
    throw new Error(detail)
  }
  ```

#### Long-term (Environment Management)
- [ ] Create `docker-compose.yml` with both services:
  ```yaml
  version: '3.8'
  services:
    backend:
      build: ./backend
      ports:
        - "8000:8000"
      environment:
        CORS_ORIGINS: "http://localhost:3000"
    
    frontend:
      build: ./frontend
      ports:
        - "3000:3000"
      environment:
        NEXT_PUBLIC_API_URL: "http://backend:8000"
  ```

### Validation Checklist
- [ ] `NEXT_PUBLIC_API_URL` set in `frontend/.env.local`
- [ ] `CORS_ORIGINS` set in `backend/app/.env.local`
- [ ] Both values match (e.g., `http://localhost:3000`)
- [ ] Frontend loads without CORS error in browser console
- [ ] Prediction request succeeds and returns data
- [ ] Changing to wrong origin shows CORS error message (confirms validation works)

---

## 🚨 Pitfall #5: Type Sync Drift (Pydantic ↔ Zod)

### Problem
Over time, Pydantic schemas and Zod schemas diverge:
- Developer adds field to backend only (frontend breaks)
- Developer adds field to frontend only (backend rejects it silently)
- Field types don't match (int vs string enum)

### Root Cause
- No automated enforcement that both schemas must be updated together
- Easy to forget to update frontend when changing backend
- No CI/CD check to catch mismatches

### Resolution

#### Short-term (Immediate Relief)
- [ ] Create development guide: `CONTRIBUTING.md`:
  ```markdown
  ## When Adding a New Field
  
  **ALWAYS do BOTH of these:**
  
  1. Update backend schema in `backend/app/models/{disease}.py`
  2. Update frontend schema in `frontend/src/lib/schemas.ts`
  3. Update `SCHEMA_MAPPING.md` documentation
  4. Run: `npm run test:schemas`
  5. Test in browser: form accepts field, backend processes it
  6. Commit with message: "feat: add X field to {disease} schema"
  
  **NEVER:**
  - Update only backend (frontend will accept undefined values)
  - Update only frontend (backend will reject valid data)
  - Forget to update SCHEMA_MAPPING.md
  ```

#### Medium-term (Pre-commit Hooks)
- [ ] Install husky for git hooks:
  ```bash
  npm install husky --save-dev
  npx husky install
  ```

- [ ] Create `.husky/pre-commit`:
  ```bash
  #!/bin/sh
  
  echo "🔍 Running schema validation..."
  
  # Run backend schema tests
  cd backend/app
  python -m pytest tests/test_schemas.py -v
  
  # Run frontend schema tests
  cd ../../frontend
  npm run test:schemas
  
  if [ $? -ne 0 ]; then
    echo "❌ Schema validation failed!"
    echo "Update both backend AND frontend schemas before committing"
    exit 1
  fi
  
  echo "✅ All schemas valid"
  ```

#### Medium-term (CI/CD Pipeline)
- [ ] Add GitHub Actions workflow `.github/workflows/schema-validation.yml`:
  ```yaml
  name: Schema Validation
  
  on: [pull_request]
  
  jobs:
    validate:
      runs-on: ubuntu-latest
      
      steps:
        - uses: actions/checkout@v2
        
        - name: Validate Backend Schemas
          run: |
            cd backend/app
            python -m pytest tests/test_schemas.py -v
        
        - name: Validate Frontend Schemas
          run: |
            cd frontend
            npm install
            npm run test:schemas
        
        - name: Check SCHEMA_MAPPING.md Updated
          run: |
            if ! git diff --name-only HEAD~1 | grep -q "SCHEMA_MAPPING.md"; then
              echo "⚠️  SCHEMA_MAPPING.md not updated. Please document field changes."
              exit 1
            fi
  ```

#### Long-term (Strict Naming Convention)
- [ ] Document in `AGENTS.md`:
  ```
  ## Schema Naming Convention (STRICT)
  
  **Backend**: 
  - Models: `{Disease}Request`, `{Disease}Response`
  - Files: `backend/app/models/{disease}.py`
  
  **Frontend**:
  - Schema: `{disease}Schema` (lowercase first letter)
  - Type: `{Disease}FormValues` (PascalCase)
  - File: `frontend/src/lib/schemas.ts` (all schemas in one file)
  
  **Example - Heart Disease**:
  ```python
  # backend/app/models/heart.py
  class HeartRequest(BaseModel):
      age: int
      sex: SexEnum
  ```
  
  ```typescript
  // frontend/src/lib/schemas.ts
  export const heartSchema = z.object({
    age: z.coerce.number(),
    sex: z.enum(['0', '1']),
  })
  export type HeartFormValues = z.infer<typeof heartSchema>
  ```
  
  **Validation Rule**: If you change `HeartRequest`, you MUST change `heartSchema`.
  ```

### Validation Checklist
- [ ] `CONTRIBUTING.md` documents field addition process
- [ ] `.husky/pre-commit` validates schemas on every commit
- [ ] CI/CD fails if schema tests don't pass
- [ ] SCHEMA_MAPPING.md is always up-to-date
- [ ] Adding field to backend without frontend shows validation error
- [ ] Naming convention is documented in AGENTS.md

---

## 🚨 Pitfall #6: Hot Reload Inconsistency

### Problem
Frontend hot-reloads automatically but backend requires manual restart:
- Developer changes service logic, saves file
- Frontend still has old code cached/compiled
- Confusing behavior: "Why didn't my change work?"
- Easy to blame the wrong part (frontend vs backend)

### Root Cause
- Next.js has built-in HMR (Hot Module Replacement)
- Uvicorn with `--reload` requires watchfiles to be installed
- No clear workflow documented for dev experience

### Resolution

#### Short-term (Immediate Relief)
- [ ] Verify uvicorn has watchfiles installed:
  ```bash
  cd backend/app
  source .venv/bin/activate
  pip list | grep watchfiles
  ```
  
  If missing: `pip install watchfiles`

- [ ] Run with explicit reload:
  ```bash
  uvicorn main:my_app --reload --reload-dirs=. --log-level info
  ```

- [ ] Document in `backend/app/README.md`:
  ```
  ## Development Server
  
  Both backend and frontend must be running for full functionality:
  
  **Terminal 1: Backend (auto-reloads on code changes)**
  ```bash
  cd backend/app
  source .venv/bin/activate
  uvicorn main:my_app --reload
  ```
  
  **Terminal 2: Frontend (auto-reloads on code changes)**
  ```bash
  cd frontend
  pnpm dev
  ```
  ```

#### Medium-term (Helper Scripts)
- [ ] Create `backend/app/dev.sh`:
  ```bash
  #!/bin/bash
  echo "🔧 Starting backend development server..."
  source .venv/bin/activate
  uvicorn main:my_app --reload --log-level info
  ```

- [ ] Create `frontend/dev.sh`:
  ```bash
  #!/bin/bash
  echo "⚛️  Starting frontend development server..."
  pnpm dev
  ```

- [ ] Create `dev-both.sh` in root:
  ```bash
  #!/bin/bash
  echo "🚀 Starting Pulse AI full development environment..."
  echo ""
  echo "Starting backend (port 8000)..."
  (cd backend/app && bash dev.sh) &
  BACKEND_PID=$!
  
  echo "Starting frontend (port 3000)..."
  (cd frontend && bash dev.sh) &
  FRONTEND_PID=$!
  
  echo ""
  echo "✅ Both services started!"
  echo "   Backend:  http://localhost:8000"
  echo "   Frontend: http://localhost:3000"
  echo ""
  echo "Press Ctrl+C to stop all services"
  
  # Wait for both processes
  wait
  ```

- [ ] Make executable: `chmod +x dev-both.sh backend/app/dev.sh frontend/dev.sh`

#### Medium-term (VS Code Tasks)
- [ ] Create `.vscode/tasks.json`:
  ```json
  {
    "version": "2.0.0",
    "tasks": [
      {
        "label": "🔧 Backend: Start Dev Server",
        "type": "shell",
        "command": "bash",
        "args": ["backend/app/dev.sh"],
        "isBackground": true,
        "problemMatcher": {
          "pattern": {
            "regexp": "^.*$",
            "file": 1,
            "location": 2,
            "message": 3
          },
          "background": {
            "activeOnStart": true,
            "beginsPattern": "^.*Application startup complete.*",
            "endsPattern": "^.*Application startup complete.*"
          }
        }
      },
      {
        "label": "⚛️  Frontend: Start Dev Server",
        "type": "shell",
        "command": "bash",
        "args": ["frontend/dev.sh"],
        "isBackground": true
      },
      {
        "label": "🚀 All Services: Start Dev Environment",
        "dependsOn": ["🔧 Backend: Start Dev Server", "⚛️  Frontend: Start Dev Server"],
        "problemMatcher": []
      }
    ]
  }
  ```

- [ ] Users can then: `Ctrl+Shift+B` → Select "All Services" to start both

#### Medium-term (Better Logging)
- [ ] Add request logging in `backend/app/main.py`:
  ```python
  import logging
  
  logging.basicConfig(level=logging.INFO)
  logger = logging.getLogger(__name__)
  
  @my_app.middleware("http")
  async def log_requests(request, call_next):
      logger.info(f"📥 {request.method} {request.url.path}")
      response = await call_next(request)
      logger.info(f"📤 {response.status_code}")
      return response
  ```

- [ ] Add frontend request logging in `api-client.ts`:
  ```typescript
  console.log(`📤 POST ${endpoint}`, values)
  
  return response.json().then(data => {
    console.log(`📥 Response:`, data)
    return data
  })
  ```

### Validation Checklist
- [ ] `pip list | grep watchfiles` shows watchfiles installed
- [ ] Run `bash dev-both.sh`, both services start
- [ ] Change Python code in service, save → backend restarts automatically
- [ ] Change TypeScript in component, save → frontend reloads automatically
- [ ] Prediction still works after both auto-reload
- [ ] Logs show request flowing through (both endpoints called)

---

## 📊 Implementation Summary

| # | Pitfall | Priority | Complexity | Est. Time |
|---|---------|----------|-----------|-----------|
| 1 | Virtual Env | Medium | Low | 30 min |
| 2 | Model Path | **Critical** | Medium | 1-2 hrs |
| 3 | Schema Mismatch | **Critical** | Medium | 2-3 hrs |
| 4 | CORS Errors | **Critical** | Low | 1 hr |
| 5 | Type Sync | High | Medium | 2-3 hrs |
| 6 | Hot Reload | Low | Low | 1 hr |

**Total if implementing all:** ~8-11 hours

---

## 🚀 Getting Started

### Phase 1: Critical Fixes (Do First)
1. **Model Path Validation** — Prevents crashes
2. **Environment Variables for CORS** — Unblocks API communication
3. **Schema Mismatch Testing** — Prevents silent failures

### Phase 2: Important Improvements (Do Next)
4. **Virtual Environment Setup Script** — Better DX
5. **Type Sync Pre-commit Hooks** — Prevents drift
6. **Hot Reload Documentation & Scripts** — Clearer dev experience

Pick one pitfall from Phase 1 and we can implement it together! 🎯
