# backend/main_file

from fastapi import FastAPI
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

genai.configure(api_key="AIzaSyAgytqTyc45DbQPlo5-ztbeC7qA63qR2Zg")  # This should be your Bard/Gemini API key

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    skills: str
    degree: str


@app.post("/career-map")
def get_career_map(data: InputData):
    prompt = f"""
You are an AI career advisor. Based on the student's current skills and degree, suggest:

1. Job roles they are qualified for
2. Additional skills they need for better roles
3. Relevant free/paid resources with links

Respond in this format:
---
Qualified Jobs:
- ...

Skill Gaps:
- ...

Learning Resources:
- ...
---
Student Info:
Skills: {data.skills}
Degree: {data.degree}
"""

    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    response = model.generate_content(prompt)

    return {"response": response.text}
