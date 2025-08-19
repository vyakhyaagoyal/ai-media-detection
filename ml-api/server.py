# from flask import Flask, request, jsonify
# from detect import detect_from_url  # a new function for URLs

# app = Flask(__name__)

# @app.route("/detect", methods=["POST"])
# def detect_api():
#     data = request.get_json()
#     if not data or "url" not in data:
#         return jsonify({"error": "No URL provided"}), 400

#     image_url = data["url"]
#     result = detect_from_url(image_url)
#     return jsonify(result)

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=5000)

from flask import Flask, request, jsonify
from model import TransferModel   # your FaceForensics++ model wrapper
# import torch
# import cv2
import requests
# import numpy as np
import tempfile
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
# Load your deepfake detection model
model_path = os.path.join(os.path.dirname(__file__), "xception-b5690688.pth")
model = TransferModel(model_path)  
model.eval()

@app.route("/detect", methods=["POST"])
def detect():
    data = request.get_json()
    if not data or "url" not in data:
        return jsonify({"error": "No URL provided"}), 400
    
    media_url = data["url"]

    try:
        # 1️⃣ Download media from Cloudinary
        resp = requests.get(media_url, stream=True)
        if resp.status_code != 200:
            return jsonify({"error": "Failed to fetch media"}), 400

        # 2️⃣ Save temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as tmp:
            tmp.write(resp.content)
            tmp_path = tmp.name

        # 3️⃣ Run detection on the saved file
        label, confidence = model.predict(tmp_path)   # you’ll need to implement predict()

        return jsonify({
            "label": label,               # "REAL" or "FAKE"
            "confidence": round(confidence * 100, 2),  # %
            "url":media_url
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)