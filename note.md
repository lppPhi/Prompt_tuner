python -m venv venv
.\venv\Scripts\activate
pip install adk fastapi uvicorn openai requests python-dotenv
uvicorn main:app --reload

