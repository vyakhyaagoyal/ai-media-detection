# server.py

from flask import Flask, request, jsonify
from detect import detect_image, detect_video
import tempfile
import requests
import mimetypes
import os

app = Flask(__name__)

def is_image(file_path):
    mimetype, _ = mimetypes.guess_type(file_path)
    return mimetype and mimetype.startswith('image')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' in request.files:
            file = request.files['file']
            suffix = os.path.splitext(file.filename)[-1] or '.bin'
            with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp:
                file.save(temp.name)
                detect_func = detect_image if is_image(temp.name) else detect_video
                result = detect_func(temp.name)
                return jsonify(result), 200

        elif request.is_json:
            data = request.get_json()
            url = data.get('url')
            if not url:
                return jsonify({'error': 'No URL provided'}), 400

            resp = requests.get(url, stream=True)
            if resp.status_code != 200:
                return jsonify({'error': 'Failed to download file'}), 400

            suffix = os.path.splitext(url)[-1] or '.bin'
            with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp:
                for chunk in resp.iter_content(1024 * 1024):
                    temp.write(chunk)
                temp.flush()

                detect_func = detect_image if is_image(temp.name) else detect_video
                result = detect_func(temp.name)
                return jsonify(result), 200

        return jsonify({'error': 'No file or URL provided'}), 400

    except Exception as e:
        import traceback
        print("[ERROR]", traceback.format_exc())
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001, debug=True)
