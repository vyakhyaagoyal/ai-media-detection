import torch
from PIL import Image
from torchvision import transforms
from model import TransferModel
import cv2
import numpy as np
from facenet_pytorch import MTCNN
import os
import tempfile
import requests
import sys

# --- 1. Load model ---
model_path = r"D:\LEARNZZZ\AI media detection\ml-api\xception-b5690688.pth"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = TransferModel(model_path).to(device)
model.eval()

# --- 2. Preprocessing ---
preprocess = transforms.Compose([
    transforms.Resize((299, 299)),
    transforms.ToTensor(),
    transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
])

# --- 3. Face detector ---
mtcnn = MTCNN(keep_all=False, device=device)

def predict_image(image_pil):
    """Run prediction on a single PIL image"""
    face_img = mtcnn(image_pil)
    if face_img is not None:
        face_img = face_img.permute(1, 2, 0).cpu().numpy()
        face_img = face_img.astype('uint8')
        face_img = Image.fromarray(face_img)
    else:
        face_img = image_pil  # fallback: use full image

    input_tensor = preprocess(face_img).unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(input_tensor)
        probabilities = torch.softmax(output, dim=1).squeeze()

    real_conf = probabilities[0].item() * 100
    fake_conf = probabilities[1].item() * 100
    return real_conf, fake_conf


def download_if_url(file_path_or_url):
    if file_path_or_url.startswith("http://") or file_path_or_url.startswith("https://"):
        response = requests.get(file_path_or_url, stream=True)
        if response.status_code != 200:
            raise ValueError(f"Failed to download file: {file_path_or_url}")
        # Try to get extension from URL
        ext = os.path.splitext(file_path_or_url)[-1].lower()
        if ext not in [".jpg", ".jpeg", ".png", ".bmp", ".mp4", ".avi", ".mov", ".mkv"]:
            ext = ".jpg"  # fallback
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=ext)
        tmp.write(response.content)
        tmp.close()
        return tmp.name, True
    return file_path_or_url, False


def predict_file(file_path_or_url, frame_skip=30):
    """Predict on either image or video, from local path or URL"""
    file_path, is_temp = download_if_url(file_path_or_url)
    ext = os.path.splitext(file_path)[-1].lower()

    if ext in [".jpg", ".jpeg", ".png", ".bmp"]:
        image = cv2.imread(file_path)
        if image is None:
            raise ValueError(f"Could not read image file: {file_path}")
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        image_pil = Image.fromarray(image_rgb)
        result = predict_image(image_pil)

    elif ext in [".mp4", ".avi", ".mov", ".mkv"]:
        # Video
        cap = cv2.VideoCapture(file_path)
        frame_count = 0
        real_scores, fake_scores = [], []

        while True:
            ret, frame = cap.read()
            if not ret:
                break
            frame_count += 1

            if frame_count % frame_skip == 0:  # process every N-th frame
                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                frame_pil = Image.fromarray(frame_rgb)
                real_conf, fake_conf = predict_image(frame_pil)
                real_scores.append(real_conf)
                fake_scores.append(fake_conf)

        cap.release()

        if len(real_scores) == 0:
            result = (50.0, 50.0)  # fallback
        else:
            result = (np.mean(real_scores), np.mean(fake_scores))

    else:
        raise ValueError("Unsupported file type: must be image or video")

    # Clean up temp file if URL
    if is_temp:
        os.remove(file_path)

    return result


# --- 4. Test ---
if __name__ == "__main__":
    try:
        file_path = sys.argv[1] if len(sys.argv) > 1 else "../public/test2.jpg"
        
        real_conf, fake_conf = predict_file(file_path)
        msg = "Deepfake detected!" if fake_conf > real_conf else "Looks real!"

        import json
        output = {
            "real_confidence": round(real_conf, 2),
            "fake_confidence": round(fake_conf, 2),
            "message": msg,
            "file":file_path
        }
        print(json.dumps(output))
    except Exception as e:
        print(json.dumps({"error": str(e)}))



#     output = {
#     "status": "success",
#     "prediction": "FAKE",   # or "REAL"
#     "confidence": 0.92
# }

# print(json.dumps(output))
