from fastapi import FastAPI, HTTPException, Request, Response
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from openai import OpenAI
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s \n %(message)s',
    handlers=[
        logging.FileHandler("logs/api_calls.log"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

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
    niche: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/v1/generate-draft")
async def generate_draft(request: DraftRequest):
    """
    Generates a landing page draft using an AI model with niche-specific content including header.
    """
    
    system_prompt = (
        "You are an expert direct-response landing-page copywriter. Generate a complete set "
        "of conversion-optimized landing-page copy that is *highly* relevant to the "
        "following niche: '{niche}'. Your job is to deliver a strong first draft so that "
        "a human can immediately use it as a base with minimal edits.\n\n"
        "Return ONLY a valid JSON object (without markdown fencing) with the keys:\n"
        "  • niche – the niche provided, verbatim,\n"
        "  • header – an object with 'logo_text' (brand name) and 'menu_items' (array of objects with 'label' and 'href'),\n"
        "  • hero  – an object with 'headline' and 'sub_headline',\n"
        "  • features – an array of {{title, description}}, emphasising benefits,\n"
        "  • testimonials – an array of {{quote, author}},\n"
        "  • cta – an object with 'headline' and 'button_text',\n"
        "  • footer – an object with 'text'.\n\n"
        "For the header, create 4-6 relevant menu items appropriate for the niche (e.g., About, Services, Pricing, Contact). "
        "Use a persuasive tone and vocabulary appropriate for the niche and target audience."
    ).format(niche=request.niche)

    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system_prompt},
                {
                    "role": "user", 
                    "content": (
                        "Prompt: {prompt}\n"
                        "Niche: {niche}\n\n"
                        "Generate the landing-page JSON described above."
                    ).format(prompt=request.prompt, niche=request.niche)
                }
            ],
            temperature=0.7,
        )
        
        draft_content = completion.choices[0].message.content.strip()
        logger.info("Draft content generated for niche '%s'", request.niche)
        
        return {
            "prompt": request.prompt,
            "draft_content": draft_content,
        }
    except Exception as e:
        logger.error(f"An error occurred: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e)) 