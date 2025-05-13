# backend/main.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
API_KEY = os.getenv("GEMINI_API_KEY")

@app.post("/tune")
async def tune_prompt(req: Request):
    data = await req.json()
    prompt = data.get("prompt")
    task_type = data.get("task_type", "general")

    suggestion_prompt = prompt  # prompt đã được gộp theo công thức từ frontend

    headers = {"Content-Type": "application/json"}
    body = {
        "contents": [{"parts": [{"text": suggestion_prompt}]}]
    }

    response = requests.post(f"{API_URL}?key={API_KEY}", headers=headers, json=body)

    # Trích xuất phần text gợi ý rõ ràng
    result = response.json()
    output = result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")

    return {"suggestion": output or "Không nhận được phản hồi từ AI."}
