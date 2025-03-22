import os
import uuid
import requests
from rembg import remove
from PIL import Image

OPENAI_API_KEY = "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"

DEFAULT_BG = "R:/Projects/Freelance/download.jpeg"  # Replace with a professional background image

def generate_ai_background(prompt):
    url = "https://api.openai.com/v1/images/generations"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "dall-e-2",
        "prompt": prompt,
        "n": 1,
        "size": "1024x1024"
    }
    response = requests.post(url, json=data, headers=headers)

    if response.status_code == 200:
        return response.json()["data"][0]["url"]
    else:
        print("Error generating AI background:", response.json())
        return None

def remove_background(image_path):

    with open(image_path, "rb") as img_file:
        img_no_bg = remove(img_file.read())

    foreground_path = f"processed_{uuid.uuid4()}.png"
    with open(foreground_path, "wb") as output_file:
        output_file.write(img_no_bg)

    return foreground_path

def overlay_on_background(foreground_img_path, background_img_path):

    foreground = Image.open(foreground_img_path).convert("RGBA")
    background = Image.open(background_img_path).convert("RGBA")

    background = background.resize(foreground.size)

    final_img = Image.new("RGBA", background.size)
    final_img.paste(background, (0, 0))
    final_img.paste(foreground, (0, 0), foreground)

    final_img = final_img.convert("RGB")

    output_path = f"final_{uuid.uuid4()}.jpg"
    final_img.save(output_path, "JPEG")

    return output_path

def process_image(image_path, prompt=None):

    print("Removing background...")
    foreground_img = remove_background(image_path)

    if prompt:
        print("Generating AI background...")
        bg_url = generate_ai_background(prompt)
        if bg_url:
            bg_response = requests.get(bg_url)
            bg_path = f"bg_{uuid.uuid4()}.jpg"
            with open(bg_path, "wb") as bg_file:
                bg_file.write(bg_response.content)
        else:
            print("AI background generation failed. Using default background.")
            bg_path = DEFAULT_BG
    else:
        bg_path = DEFAULT_BG

    print("Overlaying product onto background...")
    final_image = overlay_on_background(foreground_img, bg_path)

    print(f"Processing complete. Saved at: {final_image}")
    return final_image

if __name__ == "__main__":
    image_path = "R:/Projects/Freelance/car image.jpeg"  # Replace with your product image path
    prompt = "Beach"  # Optional AI background prompt

    output_image = process_image(image_path, prompt)
    print("Final image saved at:", output_image)
