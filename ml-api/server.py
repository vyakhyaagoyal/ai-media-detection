from flask import Flask, request, jsonify
from detect import detect
import os

app = Flask(__name__)

@app.route("/detect", methods=["POST"])
def detect_api():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    file_path = os.path.join("uploads", file.filename)
    file.save(file_path)

    result = detect(file_path)
    os.remove(file_path)
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
