# Pulse AI - Project Guidelines

Pulse AI is a comprehensive healthcare AI platform designed for disease-wise medical prediction and classification. It leverages Machine Learning models to provide insights into various health conditions.

## 🏗️ Tech Stack

### Backend
- **Framework:** FastAPI
- **Validation:** Pydantic
- **Data Handling:** Pandas, NumPy
- **ML Integration:** Joblib (for loading `.pkl` models)
- **Environment:** Python 3.10+ (managed with `.venv`)

### Frontend
- **Framework:** Next.js 16 (React 19)
- **Styling:** Tailwind CSS 4, Shadcn UI
- **State Management & Fetching:** TanStack Query (React Query)
- **Forms:** React Hook Form, Zod
- **Icons:** Lucide React
- **AI Chat:** AI SDK with Qwen model (Alibaba Cloud)

### Machine Learning
- **Models:** Scikit-learn (Pickle files)
- **Exploration:** Jupyter Notebooks (located in `models/notebooks`)

---

## 📂 Project Structure

### Backend (`/backend/app`)
- `main.py`: Entry point of the FastAPI application.
- `routes/`: Contains API route definitions for each disease (e.g., `heart.py`, `liver.py`).
- `models/`: Pydantic schemas for request and response validation.
- `service/`: Business logic and prediction functions.
- `pickle-models/`: Serialized ML models used for prediction.

### Frontend (`/frontend`)
- `src/app/`: Next.js App Router (pages, layouts, and API routes).
- `src/components/`: Reusable UI components (Shadcn and custom).
- `src/lib/`: Shared utilities, constants, and the API client (`api-client.ts`).
- `src/hooks/`: Custom React hooks.

### Models (`/models`)
- `notebooks/`: Data science exploration and model training scripts.
- `pickle-models/`: Source pickle files (synchronized with backend).

---

## 🚀 Building and Running

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend/app
   ```
2. Activate the virtual environment:
   ```bash
   source .venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the development server:
   ```bash
   uvicorn main:my_app --reload
   ```
   The API will be available at `http://127.0.0.1:8000`.

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (using pnpm):
   ```bash
   pnpm install
   ```
3. Run the development server:
   ```bash
   pnpm dev
   ```
   The application will be available at `http://localhost:3000`.

---

## 🛠️ Development Conventions

### Backend
- Use Pydantic models for all API request/response bodies to ensure type safety.
- Keep business/ML logic in the `service/` layer, separate from the `routes/`.
- Use `os.path` for constructing model paths to ensure cross-platform compatibility.

### Frontend
- Prefer functional components and React 19 features.
- Use TanStack Query for all server-state management.
- Follow Shadcn UI patterns for component development.
- Ensure all forms are validated using Zod schemas.

### AI Integration
- The AI chat uses the Qwen model. API keys and configuration are managed via environment variables (e.g., `ALI_BABA`).
- System prompts are stored in `frontend/src/lib/constant.tsx`.

---

## 📝 TODOs / Planned Features
- [ ] Integration of remaining disease models (Breast Cancer, Chronic Kidney Disease, etc.)
- [ ] Image-based models for Brain Tumor (MRI) and Pneumonia (X-ray).
- [ ] Enhanced visualization for prediction results.
