python -m venv venv
.\venv\Scripts\
pip install adk fastapi uvicorn openai
uvicorn main:app --reload --port 8000
