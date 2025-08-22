# backend/main_file

from fastapi import FastAPI
from pydantic import BaseModel
import os
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

genai.configure(api_key="AIzaSyBOnOJ4i0zUSNX4dJK9fFHbuUc_hd5tndg")  # This should be your Bard/Gemini API key

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

# Add root endpoint to handle GET requests to "/"
@app.get("/")
def read_root():
    return {
        "message": "Career Mapper API is running!",
        "status": "healthy",
        "endpoints": {
            "career_mapper": "/career-mapper (POST)",
            "health_check": "/health (GET)"
        }
    }

# Add health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "career-mapper-api"}

@app.post("/career-mapper")
def get_career_map(data: InputData):
    prompt = f"""
You are an AI career advisor. Based on the student's current skills and degree, respond ONLY in this emoji-labeled format — do not add any extra text or notes you can give as many resources as possible. Make sure that the qualified jobs, skill gaps, roadmap and learning resources should match:
✅ Qualified Jobs:
- Job Role 1
- Job Role 2
- etc..
⚠️ Skill Gaps:
- Missing Skill 1
- Missing Skill 2
- etc..
🗺️ Career Roadmaps:
📍 Beginner Level (0-6 months):
- Learn fundamental skill 1
- Complete basic project 1
- Get certification 1
📍 Intermediate Level (6-18 months):
- Master advanced skill 1
- Build portfolio project 1
- Gain practical experience in area 1
📍 Advanced Level (18+ months):
- Specialize in niche area 1
- Lead projects or mentor others
- Pursue senior-level opportunities
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
