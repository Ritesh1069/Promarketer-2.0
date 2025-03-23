from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from Image_Enhancer_final import process_image
from io import BytesIO

app = Flask(__name__)
CORS(app)

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
        output_path = process_image(temp_path, prompt)
        
        # Read the output image and send it directly
        with open(output_path, 'rb') as img_file:
            img_data = BytesIO(img_file.read())
        
        # Clean up temporary files
        os.remove(temp_path)
        os.remove(output_path)
        
        return send_file(img_data, mimetype='image/jpeg')
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)