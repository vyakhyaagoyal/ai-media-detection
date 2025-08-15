from flask import Flask, request, jsonify
from detect import detect_from_url  # a new function for URLs

app = Flask(__name__)

@app.route("/detect", methods=["POST"])
def detect_api():
    data = request.get_json()
    if not data or "url" not in data:
        return jsonify({"error": "No URL provided"}), 400

    image_url = data["url"]
    result = detect_from_url(image_url)
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
