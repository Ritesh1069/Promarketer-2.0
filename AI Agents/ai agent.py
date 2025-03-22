import os
import json
import requests
import base64
from datetime import datetime
from phi.agent import Agent, RunResponse
from phi.model.groq import Groq
from phi.tools.duckduckgo import DuckDuckGo
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO

load_dotenv()

stability_api_key = "sk-gEUN699bN7A1eptOqnc3fqquKo8awZ6im1jr725xSrahIXCp"

groq_model = Groq(id="llama-3.3-70b-specdec")

content_team = {
    "email_specialist": Agent(
        model=groq_model,
        instructions=[
            "Create high-impact email campaigns that drive user engagement.",
            "Personalize email content for different target segments.",
            "Use storytelling techniques to make emails more engaging."
        ]
    ),
    "social_media_expert": Agent(
        model=groq_model,
        instructions=[
            "Generate engaging social media posts tailored to different platforms.",
            "Optimize content for virality and user engagement.",
            "Ensure brand consistency across all social media messaging."
        ] 
    ),
    "market_researcher": Agent(
        model=groq_model,
        instructions=[
            "Analyze market trends and competitor strategies to inform content creation.",
            "Provide insights on audience behavior and preferences.",
            "Suggest data-driven marketing strategies based on industry research."
        ]
    )
}

content_agent = Agent(
    model=Groq(id="llama-3.3-70b-specdec"),
    instructions=[
    "extract the product/event details from the input and generate a detailed prompt for generating a high-quality background image for marketing purposes ",
    "The prompt must be optimized for the SD3.5-Large-Turbo text-to-image model and must not mention the product in any way.",
    "The background must be minimalistic, professional, and clean, ensuring a neutral, aesthetically pleasing design suitable for a marketing poster.",
    "No objects, patterns, or distracting elements should be present—only a smooth, subtle gradient, soft light effects, or abstract professional textures that enhance product placement.",
    "Avoid high-contrast details; ensure the background complements a pasted product image without overpowering it.",
    "the output should strictly only contain the prompt nothing else."
    ]
)



# def generate_image(prompt):
#     """Generate an image using Stability AI API."""
#     try:
#         response = requests.post(
#             "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
#             headers={
#                 "Content-Type": "application/json",
#                 "Accept": "application/json",
#                 "Authorization": f"Bearer {stability_api_key}"
#             },
#             json={
#                 "text_prompts": [{"text": prompt}],
#                 "cfg_scale": 7,
#                 "height": 1024,
#                 "width": 1024,
#                 "steps": 30,
#                 "samples": 1
#             }
#         )
        
#         if response.status_code == 200:
#             image_data = base64.b64decode(response.json()["artifacts"][0]["base64"])
#             return Image.open(BytesIO(image_data))
#         else:
#             print(f"Error: {response.status_code} - {response.text}")
#             return None
#     except Exception as e:
#         print(f"Error generating image: {str(e)}")
#         return None

def generate_image(prompt):
    try:
        response = requests.post(
            "https://api.stability.ai/v2beta/stable-image/generate/sd3",
            headers={
                "Authorization": f"Bearer {stability_api_key}",
                "Accept": "application/json"
            },
            files={"none": ''},
            data={
                "prompt": prompt,
                "model": "sd3.5-large",
                "width": 1024,
                "height": 1024,
                "steps": 30,
                "cfg_scale": 7,
                "samples": 1
            }
        )

        if response.status_code == 200:
            image_data = base64.b64decode(response.json()["image"])
            return Image.open(BytesIO(image_data))
        else:
            print(f"Error: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"Error generating image: {str(e)}")
        return None

def save_image(image, filename):
    if image:
        image.save(filename)
        print(f"Image saved as {filename}")
    else:
        print("No image to save")

def generate_marketing_poster(user_prompt, output_file="marketing_poster.png"):
    best_prompt = user_prompt
    print(f"Enhanced Prompt: {best_prompt}")
    
    image = generate_image(best_prompt)
    if image:
        save_image(image, output_file)
        return f"Poster saved as {output_file}"
    return "Error generating poster"

def fetch_trending_topics():
    try:
        search_tool = DuckDuckGo()
        trends = search_tool.search("latest marketing trends")
        return trends[:5] if trends else []
    except:
        return []

def generate_marketing_content(topic: str):
    responses = {}
    for role, agent in content_team.items():
        responses[role] = agent.print_response(topic, stream=True)
    return responses

def save_response_to_file(response: dict, filename: str = "content_output.json"):
    with open(filename, "w", encoding="utf-8") as file:
        json.dump({"content": response, "timestamp": datetime.now().isoformat()}, file, indent=4)

if __name__ == "__main__":
    user_prompt = input("Enter your prompt:\n")
    
    # trending_topics = fetch_trending_topics()
    # print(f"Trending Marketing Topics: {trending_topics}")
    
    # content = generate_marketing_content(user_prompt)
    # # save_response_to_file(content)
    
    print("Output 1: ",content_team["email_specialist"].run(user_prompt).content)
    print("\n\n\n\n Output 2: ",content_team["market_researcher"].run(user_prompt).content)
    print("\n\n\n\n PLatform Caption suggestions: ",content_team["social_media_expert"].run(user_prompt).content,"\n\n\n\n")
    
    response: RunResponse = content_agent.run(user_prompt)
    ressy = response.content
    # print(ressy)
    poster_result = generate_marketing_poster(ressy)
    print(poster_result)