# AIBot Astra

This project consists of a Next.js frontend and a Python FastAPI backend designed to facilitate an AI-powered interview assistant.

## Features

- Login page with username "admin" and password "Ankit@123"
- Voice sample recording on first login
- Conversation recording with start/stop toggle
- Voice filtering to exclude user's voice from conversation
- Audio transcription using OpenAI Whisper API
- LLM response generation using OpenAI GPT-4 API
- Reset functionality to clear conversation context and voice sample

## Setup

### Frontend

1. Navigate to the frontend directory (root).
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

### Backend

1. Navigate to the backend directory.
2. Create a virtual environment and activate it:

```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:

```bash
pip install fastapi uvicorn openai librosa numpy soundfile
```

4. Set your OpenAI API key in the environment:

```bash
export OPENAI_API_KEY="your_openai_api_key"
```

5. Run the backend server:

```bash
uvicorn backend.main:app --reload
```

## Deployment

Both frontend and backend can be deployed on [Render](https://render.com):

- Frontend: Deploy as a static site or web service (Next.js).
- Backend: Deploy as a web service (FastAPI).

Ensure to set the `OPENAI_API_KEY` environment variable in Render for the backend service.

Update frontend API URLs to point to the deployed backend endpoints.

## Notes

- Voice filtering uses MFCC feature extraction and cosine similarity.
- Audio files are processed and cleaned up after use.
- The current implementation assumes a single user voice sample for filtering.
