from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import bcrypt
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB Atlas connection
client = MongoClient(os.getenv('MONGODB_URI'))
db = client[os.getenv('DB_NAME')]
users_collection = db.users

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
    
    return jsonify({
        'message': 'Login successful',
        'user': user
    }), 200

if __name__ == '__main__':
    app.run(debug=True) 