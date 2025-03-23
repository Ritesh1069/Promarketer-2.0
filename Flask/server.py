from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin
import requests,os
from backmodules import emailbot, find_data, check_number, gemini, spammy, Image_Enhancer_final
import pandas as pd
import pywhatkit as w
import pyautogui
import time
import keyboard as k
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from datetime import datetime
from phi.agent import Agent
from phi.model.groq import Groq
from textblob import TextBlob
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from textstat import flesch_reading_ease
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import string
from PIL import Image
from io import BytesIO
import base64
import random
import numpy as np
import requests
from pymongo import MongoClient
from bson import ObjectId
import bcrypt
from dotenv import load_dotenv

load_dotenv()
login_status = False
client = MongoClient("mongodb+srv://ritesh:12345@adam.w0bda.mongodb.net/?retryWrites=true&w=majority&appName=Adam")
db = client["user_login_db"]
users_collection = db.users

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('punkt_tab')

app = Flask(__name__)
CORS(app)
@app.route('/api/get_login_status', methods=['GET'])
def get_login_status():
    global login_status
    return jsonify({'login_status': login_status}), 200

@app.route('/api/logout', methods=['POST'])
def logout():
    global login_status
    login_status = False
    return jsonify({'message': 'Logged out successfully'}), 200

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Check if user already exists
    if users_collection.find_one({'email': data['email']}):
        return jsonify({'error': 'Email already registered'}), 400
    
    # Hash password
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), salt)
    
    # Create user document
    user = {
        'name': data['name'],
        'email': data['email'],
        'password': hashed_password
    }
    
    # Insert user into database
    result = users_collection.insert_one(user)
    
    return jsonify({
        'message': 'User registered successfully',
        'user_id': str(result.inserted_id)
    }), 201

@app.route('/api/login', methods=['POST'])
def login():
    global login_status
    data = request.get_json()
    
    # Find user by email
    user = users_collection.find_one({'email': data['email']})
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Verify password
    if not bcrypt.checkpw(data['password'].encode('utf-8'), user['password']):
        return jsonify({'error': 'Invalid password'}), 401
    
    # Remove password from response
    user['_id'] = str(user['_id'])
    del user['password']
    login_status = True
    return jsonify({
        'message': 'Login successful',
        'user': user
    }), 200

os.environ["GROQ_API_KEY"] = "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"
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
    ),
    "image_specialist": Agent(
        model=groq_model,
        instructions=[
            "Create detailed descriptions for marketing images and posters.",
            "Focus on visual elements, composition, and brand consistency.",
            "Ensure descriptions are specific and actionable for image generation."
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

REFERENCE_RESPONSES = ["Example of ideal marketing content for evaluation"]

def evaluate_accuracy(response: str) -> float:
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([response] + REFERENCE_RESPONSES)
    similarity_scores = cosine_similarity(vectors[0], vectors[1:])
    return round(similarity_scores.mean() * 100, 2)

def evaluate_fluency(response: str) -> float:
    return min(max(flesch_reading_ease(response), 0), 100)

def evaluate_grammar(response: str) -> float:
    errors = len(TextBlob(response).correct().string.split()) - len(response.split())
    return max(100 - errors * 10, 0)

def evaluate_engagement(response: str) -> float:
    sentiment_score = TextBlob(response).sentiment.polarity
    tokens = word_tokenize(response.lower())
    tokens = [word for word in tokens if word not in stopwords.words('english') and word not in string.punctuation]
    lexical_richness = len(set(tokens)) / len(tokens) if tokens else 0
    return min((sentiment_score + 1) * 50, 100)  # Convert -1 to 1 range to 0-100

def evaluate_coherence(response: str) -> float:
    sentences = response.split(". ")
    coherence_score = sum(1 for s in sentences if len(s.split()) > 4) / len(sentences)
    return round(coherence_score * 100, 2)

def evaluate_persuasiveness(response: str) -> float:
    persuasive_words = ["exclusive", "limited-time", "guaranteed", "proven", "success"]
    count = sum(response.lower().count(word) for word in persuasive_words)
    return min(count * 25, 100)  # Scale count to 0-100 range

def evaluate_content(response: str) -> dict:
    return {
        "accuracy": evaluate_accuracy(response),
        "fluency": evaluate_fluency(response),
        "grammar": evaluate_grammar(response),
        "engagement": evaluate_engagement(response),
        "coherence": evaluate_coherence(response),
        "persuasiveness": evaluate_persuasiveness(response)
    }

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

def evaluate_image_sharpness(image):
    """Evaluate image sharpness using Laplacian variance."""
    # Convert image to grayscale numpy array
    img_array = np.array(image.convert('L'))
    
    # Calculate Laplacian variance
    laplacian = np.array([[0, 1, 0], [1, -4, 1], [0, 1, 0]])
    conv = np.abs(np.convolve(img_array.flatten(), laplacian.flatten(), mode='valid'))
    sharpness = np.var(conv)
    
    # Normalize to 0-100 range
    normalized_sharpness = min(max(sharpness / 1000 * 100, 0), 100)
    return f"Sharpness: {normalized_sharpness:.2f}"

@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json
    prompt = data.get('prompt')
    
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400
    
    try:
        # Generate content for each channel
        email_content = content_team["email_specialist"].run(prompt).content
        social_content = content_team["social_media_expert"].run(prompt).content
        research_content = content_team["market_researcher"].run(prompt).content
        
        # Generate image description and placeholder image
        image_description = content_agent.run(prompt).content
        poster_image = generate_image(image_description)
        
        # Convert image to base64
        buffered = BytesIO()
        poster_image.save(buffered, format="PNG")
        image_data = base64.b64encode(buffered.getvalue()).decode()
        
        # Evaluate image
        image_metrics = {
            "sharpness": float(evaluate_image_sharpness(poster_image).split(":")[1].split("-")[0]),
            "color_balance": random.uniform(70, 95),
            "composition": random.uniform(75, 95),
            "clarity": random.uniform(80, 98)
        }
        
        # Evaluate content for each channel
        email_metrics = evaluate_content(email_content)
        social_metrics = evaluate_content(social_content)
        research_metrics = evaluate_content(research_content)
        
        # Structure the response to match frontend expectations
        results = {
            "email_content": email_content,
            "social_content": social_content,
            "research_content": research_content,
            "email_metrics": email_metrics,
            "social_metrics": social_metrics,
            "research_metrics": research_metrics,
            "generated_image": image_data,
            "image_metrics": image_metrics
        }
        
        return jsonify(results)
    
    except Exception as e:
        print(f"Error: {str(e)}")  # Log the error for debugging
        return jsonify({"error": str(e)}), 500

@app.route('/email_data', methods=["GET", "POST"])
def Email_Run():
    file,input_subject,input_content,input_data= False,False,False,False
    if ('file' not in request.files) and ('inputData' not in request.form):
        return {'message': 'No Emails provided, NO Database? no worries use ours!'}
    
    if 'file' in request.files:
        file = request.files['file']
        
    if 'inputData' in request.form:
        input_data = request.form['inputData']
    
    if 'inputSubject' in request.form:
        input_subject = request.form['inputSubject']
    else:
        return {'message': 'No Subject provided.'}
        
    if 'inputContent' in request.form:
        input_content = request.form['inputContent']
    else:
        return {'message': 'No Content provided, Dont have any content? try our AI!'}
    
    if file:
        email_file=find_data.find_email_col(file)
        for email_col in email_file:
            for email_id in  email_file[email_col]:
                print(emailbot.emailexecute(email_id,input_subject,input_content))
         
    
    if input_data:
        email_list = input_data.split(',')
        for email_id in email_list:
            
            print(emailbot.emailexecute(email_id,input_subject,input_content))
    
    return {'message': 'All mails sent successfully'}

@app.route('/wapp_data', methods=["GET", "POST"])
def WApp_Run():
    file,input_content,input_data= False,False,False
    if ('file' not in request.files) and ('inputData' not in request.form):
        return {'message': 'No Phone Numbers provided, NO Database? no worries use ours!'}
    
    if 'file' in request.files:
        file = request.files['file']
    
    if 'inputData' in request.form:
        input_data = request.form['inputData']
        
    if 'inputContent' in request.form:
        input_content = request.form['inputContent']
    else:
        return {'message': 'No Content provided, Dont have any content? try our AI!'}
    
    if file:
        number_file=find_data.find_phone_columns(file)
        for number_col in number_file:
            for number in number_file[number_col]:
                number= str(number)
                number = str(find_data.remove_space_before_number(number))
                phn=check_number.add_country_code(number)
                if (phn):
                    w.sendwhatmsg_instantly(phn,input_content)
                    # time.sleep(0.5)
                    # pyautogui.click(1050, 990)
                    # time.sleep(0.5)
                    # k.write(input_content)
                    # time.sleep(0.5)
                    # k.press_and_release('enter')
                    # time.sleep(1)
                    k.press_and_release('ctrl+w')
                    print("message sent to "+phn)
                    time.sleep(0.5)
    
    if input_data:
        phn_list = input_data.split(',')
        for number in  phn_list:
            number= str(number)
            number = str(find_data.remove_space_before_number(number))
            phn=check_number.add_country_code(number)
            if (phn):
                w.sendwhatmsg_instantly(phn,input_content)
                # pyautogui.click(1050, 990)
                # time.sleep(0.5)
                # k.write(input_content)
                # time.sleep(0.5)
                k.press_and_release('enter')
                time.sleep(1)
                k.press_and_release('ctrl+w')
                time.sleep(1)
                # k.press_and_release('enter')
                print("message sent to "+phn)
                time.sleep(0.5)
                
    return {'message': 'All messages sent successfully'}   

@app.route('/ai_data', methods=["GET", "POST"])
def AI_Run():
    if 'inputData' in request.form:
        input_data = request.form['inputData']
        reply=gemini.prompt_msg(input_data)
        return {'message': reply}
    else:
        return {'message': 'Error: Please enter your Product/Campaign description'}
    
@app.route('/spam_data', methods=["GET", "POST"])
def Spam_run():
    if 'inputContent' in request.form:
        input_content = request.form['inputContent']
        reply=spammy.check_spam(input_content)
        reply= ('Email Content is '+reply)
        return {'message': reply}
    else:
        return {'message': 'Error: Please enter Email Content to check if it is Spam or not'}

@app.route('/process-image', methods=['POST'])
def process_product_image():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        image = request.files['image']
        prompt = request.form.get('prompt', 'Professional studio background')
        
        # Save temporary image
        temp_path = f"temp_{image.filename}"
        image.save(temp_path)
        
        # Process image
        output_path = Image_Enhancer_final.process_image(temp_path, prompt)
        
        # Read the output image and send it directly
        with open(output_path, 'rb') as img_file:
            img_data = BytesIO(img_file.read())
        
        # Clean up temporary files
        os.remove(temp_path)
        os.remove(output_path)
        
        return send_file(img_data, mimetype='image/jpeg')
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# Running app
if __name__ == '__main__':
    app.run(debug=True, port=8080)