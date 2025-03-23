import uuid
from PIL import Image
from rembg import remove
from phi.agent import Agent, RunResponse
from phi.model.groq import Groq
import requests
from io import BytesIO
import os
import base64

os.environ["GROQ_API_KEY"] = "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"
stability_api_key = "sk-gEUN699bN7A1eptOqnc3fqquKo8awZ6im1jr725xSrahIXCp"

groq_model = Groq(id="llama-3.3-70b-specdec")

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

def generate_ai_background(prompt):
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
                "width": 512,
                "height": 512,
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

def remove_background(image_path):
    print("Removing background...")
    with open(image_path, "rb") as img_file:
        img_no_bg = remove(img_file.read())
    return Image.open(BytesIO(img_no_bg))

def overlay_on_background(foreground_img, background_img):
    foreground = foreground_img.convert("RGBA")
    background = background_img.convert("RGBA")

    background = background.resize(foreground.size)

    final_img = Image.new("RGBA", background.size)
    final_img.paste(background, (0, 0))
    final_img.paste(foreground, (0, 0), foreground)

    return final_img.convert("RGB")

def process_image(image_path, prompt="Professional studio background"):
    foreground_img = remove_background(image_path)
    prompt = content_agent.run(prompt).content
    bg_img = generate_ai_background(prompt)

    print("Overlaying product onto background...")
    final_image = overlay_on_background(foreground_img, bg_img)

    output_path = f"final_{uuid.uuid4()}.jpg"
    final_image.save(output_path, "JPEG")
    print(f"Processing complete. Saved at: {output_path}")
    return output_path

if __name__ == "__main__":
    image_path = "AI Agents\car image.jpeg" 
    prompt = input("enter prompt: ")

    output_image = process_image(image_path, prompt)
    print("Final image saved at:", output_image)
