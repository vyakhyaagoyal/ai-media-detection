import sys, os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)), "FaceForensics"))


from flask import Flask, request, jsonify
from model import TransferModel   # your FaceForensics++ model wrapper
# import torch
# import cv2
import requests
# import numpy as np
import tempfile
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
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
