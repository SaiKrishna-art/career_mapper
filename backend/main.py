# backend/main_file

from fastapi import FastAPI
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

genai.configure(api_key="")  # This should be your Bard/Gemini API key

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
You are an AI career advisor. Based on the student's current skills and degree, respond ONLY in this emoji-labeled format — do not add any extra text or notes you can give as many resources as possible:

✅ Qualified Jobs:
- Job Role 1
- Job Role 2
- etc..

⚠️ Skill Gaps:
- Missing Skill 1
- Missing Skill 2
- etc..


📚 Learning Resources:
🆓 Free Resources:
- [Course Title](https://link1)
- [Another Course](https://link2)
- etc..
💰 Paid Resources:
- [Course Title](https://link1)
- [Another Course](https://link2)
- etc..

Now analyze the student profile:
Skills: {data.skills}
Degree: {data.degree}
"""
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")
    response = model.generate_content(prompt)

    return {"response": response.text}
