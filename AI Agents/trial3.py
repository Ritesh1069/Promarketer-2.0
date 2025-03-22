import torch
from diffusers import StableDiffusion3Pipeline

pipe = StableDiffusion3Pipeline.from_pretrained("stabilityai/stable-diffusion-3.5-medium", torch_dtype=torch.float32)
pipe = pipe.to("cpu")

image = pipe(
    "A capybara holding a sign that reads Hello World",
    num_inference_steps=40,
    guidance_scale=4.5,
).images[0]
image.save("capybara.png")
