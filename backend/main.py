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
    # draft_content = "{\n  \"hero\": {\n    \"headline\": \"Transform Your Hair, Transform Your Life\",\n    \"sub_headline\": \"Experience Luxurious Hair Services Tailored Just for You\"\n  },\n  \"features\": [\n    {\n      \"title\": \"Expert Stylists\",\n      \"description\": \"Our skilled team of hair professionals are dedicated to bringing your hair dreams to life, using the latest techniques and trends.\"\n    },\n    {\n      \"title\": \"Customized Treatments\",\n      \"description\": \"From color transformations to nourishing treatments, every service is tailored to meet your unique hair needs.\"\n    },\n    {\n      \"title\": \"Premium Products\",\n      \"description\": \"We use only the highest quality products to ensure your hair remains healthy, vibrant, and full of life.\"\n    },\n    {\n      \"title\": \"Relaxing Environment\",\n      \"description\": \"Enjoy a serene atmosphere designed to make your hair appointment a truly relaxing experience.\"\n    },\n    {\n      \"title\": \"Customer Loyalty Program\",\n      \"description\": \"Join our loyalty program and unlock exclusive discounts and perks, making every visit even more rewarding!\"\n    }\n  ],\n  \"testimonials\": [\n    {\n      \"quote\": \"I absolutely love my new hair! The team really listened to what I wanted and delivered beyond my expectations.\",\n      \"author\": \"Emily R.\"\n    },\n    {\n      \"quote\": \"Such a welcoming environment and professional staff. I won’t go anywhere else!\",\n      \"author\": \"Sophia M.\"\n    },\n    {\n      \"quote\": \"I am obsessed with my new haircut and color! The products they use made such a difference.\",\n      \"author\": \"Liam J.\"\n    }\n  ],\n  \"cta\": {\n    \"headline\": \"Book Your Hair Transformation Today!\",\n    \"button_text\": \"Schedule an Appointment\"\n  },\n  \"footer\": {\n    \"text\": \"© 2023 Hair Business. All Rights Reserved. Connect with us on social media for updates and promotions!\"\n  }\n}\n"
    # return {
    #         "prompt": request.prompt,
    #         "draft_content": draft_content,
    #     }


    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": """You are a world-class copywriter. 
Your task is to generate content for a landing page based on a user's prompt. 
Please return the content in a structured JSON format (without the ```json and ```) with the following keys: 
'hero' (with 'headline' and 'sub_headline'), 
'features' (an array of objects with 'title' and 'description'), 
'testimonials' (an array of objects with 'quote' and 'author'), 
'cta' (with 'headline' and 'button_text'),
'footer' (with 'text')."""},
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