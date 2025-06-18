from fastapi import FastAPI, HTTPException
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
    draft_content = "{\n  \"niche\": \"Barber Services\",\n  \"hero\": {\n    \"headline\": \"Unleash Your Style with Confidence\",\n    \"sub_headline\": \"Expert Haircuts & Grooming Tailored Just for You\"\n  },\n  \"features\": [\n    {\n      \"title\": \"Expert Barbers\",\n      \"description\": \"Our talented barbers are dedicated to delivering high-quality cuts, shaves, and grooming services. With years of experience, they know exactly how to make you look and feel your best.\"\n    },\n    {\n      \"title\": \"Customized Experience\",\n      \"description\": \"Every visit is tailored to your unique style and preferences. We take the time to understand your needs, ensuring you walk out with a look that reflects your personality.\"\n    },\n    {\n      \"title\": \"Relaxing Atmosphere\",\n      \"description\": \"Step into our modern barbershop and enjoy a relaxing environment. With comfortable seating and a friendly vibe, we make grooming a pleasurable experience.\"\n    },\n    {\n      \"title\": \"Quality Products\",\n      \"description\": \"We use top-of-the-line products to ensure your hair and skin receive the best care. From premium shampoos to moisturizing creams, your grooming routine matters to us.\"\n    },\n    {\n      \"title\": \"Walk-Ins Welcome\",\n      \"description\": \"No appointment? No problem! Our welcoming team is ready to serve you with exceptional hair services, whether you're a first-timer or one of our loyal clients.\"\n    }\n  ],\n  \"testimonials\": [\n    {\n      \"quote\": \"My go-to barbershop! Always leave feeling fresh and confident.\",\n      \"author\": \"James T.\"\n    },\n    {\n      \"quote\": \"The barbers here truly listen to what you want and deliver every time.\",\n      \"author\": \"Carlos R.\"\n    },\n    {\n      \"quote\": \"I love the laid-back atmosphere. It’s more than just a haircut; it’s an experience!\",\n      \"author\": \"David M.\"\n    }\n  ],\n  \"cta\": {\n    \"headline\": \"Book Your Appointment Today!\",\n    \"button_text\": \"Schedule Now\"\n  },\n  \"footer\": {\n    \"text\": \"Your Style, Our Passion – Visit us for a premium grooming experience.\"\n  }\n}"
    return {
        "prompt": request.prompt,
        "draft_content": draft_content,
    }


    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": """You are an expert landing page copywriter. Your goal is to create highly relevant and effective content for a specific niche.

First, analyze the user's prompt to determine the business niche (e.g., 'SaaS for project management', 'Luxury real estate in Miami', 'Handmade vegan soap e-commerce').

Then, embodying the role of a top-tier copywriter for that specific niche, generate a complete set of landing page content.

The output must be a single JSON object (without any markdown formatting like ```json and ```) containing the following keys:
- 'niche': The niche you identified from the prompt.
- 'hero': An object with 'headline' and 'sub_headline'.
- 'features': An array of objects, each with 'title' and 'description'.
- 'testimonials': An array of objects, each with 'quote' and 'author'.
- 'cta': An object with 'headline' and 'button_text'.
- 'footer': An object with 'text'.

Ensure the tone, vocabulary, and core messaging are perfectly tailored to the identified niche to create a strong starting point for the user."""},
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
        raise HTTPException(status_code=500, detail=str(e)) 