import os
import uuid
import torch
from PIL import Image
from rembg import remove
from diffusers import StableDiffusionPipeline

# ✅ Correct Stable Diffusion 1.5 Model ID
model_id = "runwayml/stable-diffusion-v1-5"

# ✅ Check GPU availability
device = "cuda" if torch.cuda.is_available() else "cpu"

# ✅ Load the Stable Diffusion 1.5 model
pipeline = StableDiffusionPipeline.from_pretrained(
    model_id,
    torch_dtype=torch.float16 if device == "cuda" else torch.float32
).to(device)

# ✅ Enable xformers for optimization
# pipeline.enable_xformers_memory_efficient_attention()

def generate_ai_background(prompt):
    """
    Generates an AI background using Stable Diffusion 1.5.
    """
    print("Generating AI background...")
    image = pipeline(
        prompt=prompt,
        num_inference_steps=6,  # Controls quality (higher = better)
        guidance_scale=7.5  # Standard SD1.5 setting
    ).images[0]

    bg_path = f"bg_{uuid.uuid4()}.png"
    image.save(bg_path)
    return bg_path

def remove_background(image_path):
    """
    Removes the background from the product image.
    """
    print("Removing background...")
    with open(image_path, "rb") as img_file:
        img_no_bg = remove(img_file.read())

    foreground_path = f"foreground_{uuid.uuid4()}.png"
    with open(foreground_path, "wb") as output_file:
        output_file.write(img_no_bg)

    return foreground_path

def overlay_on_background(foreground_img_path, background_img_path):
    """
    Overlays the product image onto the AI-generated background.
    """
    foreground = Image.open(foreground_img_path).convert("RGBA")
    background = Image.open(background_img_path).convert("RGBA")

    # Resize background to match foreground
    background = background.resize(foreground.size)

    # Overlay images
    final_img = Image.new("RGBA", background.size)
    final_img.paste(background, (0, 0))
    final_img.paste(foreground, (0, 0), foreground)

    # Convert back to RGB (removes transparency)
    final_img = final_img.convert("RGB")

    output_path = f"final_{uuid.uuid4()}.jpg"
    final_img.save(output_path, "JPEG")

    return output_path

def process_image(image_path, prompt="Professional studio background"):
    """
    Processes the image: removes the background and replaces it with an AI-generated background.
    """
    foreground_img = remove_background(image_path)
    bg_path = generate_ai_background(prompt)

    print("Overlaying product onto background...")
    final_image = overlay_on_background(foreground_img, bg_path)

    print(f"Processing complete. Saved at: {final_image}")
    return final_image

# Example Usage
if __name__ == "__main__":
    image_path = "R:\Projects\Freelance\car image.jpeg"  # Ensure this file exists
    prompt = input("enter prompt: ")# Custom AI background prompt

    output_image = process_image(image_path, prompt)
    print("Final image saved at:", output_image)
