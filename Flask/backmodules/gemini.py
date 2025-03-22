from google import genai

def prompt_msg(txt):
  # genai.configure(api_key="AIzaSyB3MjEEuiZPVKmA_XjuYN55Y7EcGAdhdDo")
  
  # # Set up the model
  # generation_config = {
  #   "temperature": 0.9,
  #   "top_p": 1,
  #   "top_k": 1,
  #   "max_output_tokens": 2048,
  # }

  # safety_settings = [
  #   {
  #     "category": "HARM_CATEGORY_HARASSMENT",
  #     "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  #   },
  #   {
  #     "category": "HARM_CATEGORY_HATE_SPEECH",
  #     "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  #   },
  #   {
  #     "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
  #     "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  #   },
  #   {
  #     "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
  #     "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  #   },
  # ]
  # model = genai.GenerativeModel(model_name="gemini-pro",generation_config=generation_config,safety_settings=safety_settings)
  # full_prompt= ("Provide me short and attractive marketing content in a paragraph format for " +txt)
  # response = model.generate_content(full_prompt)
  client = genai.Client(api_key="AIzaSyC7feTmAEYl-YEDUUWsA7nvXiroAQ6jqus")
  full_prompt= ("Provide me short and attractive marketing content in a paragraph format for " +txt)
  response = client.models.generate_content(
      model="gemini-2.0-flash",
      contents=full_prompt,
  )
  return response.text
  
# print(prompt_msg("nothing phone 2"))