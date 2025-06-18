from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from .env file
load_dotenv(override=True)

# It is strongly recommended to use environment variables for API keys.
# Do not hardcode them in your application.
# Set the OPENAI_API_KEY environment variable before running the application.

api_key = os.getenv('OPENAI_API_KEY')
if not api_key:
    raise RuntimeError("The OPENAI_API_KEY environment variable is not set. Please set it before running the application.")



client = OpenAI(api_key=api_key)

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost",
    "http://localhost:3000",  # Assuming Next.js runs on port 3000
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DraftRequest(BaseModel):
    prompt: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/v1/generate-draft")
async def generate_draft(request: DraftRequest):
    """
    Generates a landing page draft using an AI model.
    """
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a world-class copywriter. Your task is to generate content for a landing page. Please return the content in JSON format with the following keys: 'headline', 'body', 'cta_button_text'."},
                {"role": "user", "content": f"Generate landing page content for the following prompt: {request.prompt}"}
            ]
        )
        
        # In a real app, you'd want to parse the response more robustly
        # and maybe handle cases where the model doesn't return valid JSON.
        draft_content = completion.choices[0].message.content
        
        return {
            "prompt": request.prompt,
            "draft_content": draft_content,
        }
    except Exception as e:
        # Proper error handling should be implemented
        return {"error": str(e)} 