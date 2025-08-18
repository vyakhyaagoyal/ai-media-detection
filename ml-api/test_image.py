# import torch
# from PIL import Image
# from torchvision import transforms
# from model import TransferModel
# import cv2
# import numpy as np
# from facenet_pytorch import MTCNN
# import os

# # --- 1. Load model ---
# model_path = r"D:\LEARNZZZ\AI media detection\ml-api\xception-b5690688.pth"
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# model = TransferModel(model_path).to(device)
# model.eval()

# # --- 2. Preprocessing ---
# preprocess = transforms.Compose([
#     transforms.Resize((299, 299)),
#     transforms.ToTensor(),
#     transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
# ])

# # --- 3. Face detector ---
# mtcnn = MTCNN(keep_all=False, device=device)

# def predict_image(image_pil):
#     """Run prediction on a single PIL image"""
#     # detect face
#     face_img = mtcnn(image_pil)
#     if face_img is not None:
#         face_img = face_img.permute(1, 2, 0).cpu().numpy()
#         face_img = (face_img).astype('uint8')
#         face_img = Image.fromarray(face_img)
#     else:
#         face_img = image_pil  # fallback: full image

#     input_tensor = preprocess(face_img).unsqueeze(0).to(device)

#     with torch.no_grad():
#         output = model(input_tensor)
#         probabilities = torch.softmax(output, dim=1).squeeze()

#     real_conf = probabilities[0].item() * 100
#     fake_conf = probabilities[1].item() * 100
#     return real_conf, fake_conf


# def predict_file(file_path, frame_skip=30):
#     """Predict on either image or video"""
#     ext = os.path.splitext(file_path)[-1].lower()
    
#     if ext in [".jpg", ".jpeg", ".png", ".bmp"]:
#         # single image
#         image = cv2.imread(file_path)
#         image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
#         image_pil = Image.fromarray(image_rgb)
#         return predict_image(image_pil)

#     elif ext in [".mp4", ".avi", ".mov", ".mkv"]:
#         # video
#         cap = cv2.VideoCapture(file_path)
#         frame_count = 0
#         real_scores, fake_scores = [], []

#         while True:
#             ret, frame = cap.read()
#             if not ret:
#                 break
#             frame_count += 1

#             if frame_count % frame_skip == 0:  # process every N-th frame
#                 frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#                 frame_pil = Image.fromarray(frame_rgb)

#                 real_conf, fake_conf = predict_image(frame_pil)
#                 real_scores.append(real_conf)
#                 fake_scores.append(fake_conf)

#         cap.release()

#         if len(real_scores) == 0:
#             return 50.0, 50.0  # fallback if no frames processed

#         # average results
#         return np.mean(real_scores), np.mean(fake_scores)

#     else:
#         raise ValueError("Unsupported file type: must be image or video")


# # --- 4. Test ---
# if __name__ == "__main__":
#     # file_path = "../public/test2.jpg"  # change to .mp4 to test video
#     file_path = "https://res.cloudinary.com/vyakhya/image/upload/v1755436974/ai-media-detection%28uploads%29/1755436967934-arya.jpg.jpg"
#     real_conf, fake_conf = predict_file(file_path)
#     msg = "Deepfake detected!" if fake_conf > real_conf else "Looks real!"
#     print(f"Real Confidence: {real_conf:.2f}%")
#     print(f"Deepfake Confidence: {fake_conf:.2f}%")
#     print(f"{msg}")

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
    """Download remote file if URL, else return local path"""
    if file_path_or_url.startswith("http://") or file_path_or_url.startswith("https://"):
        response = requests.get(file_path_or_url, stream=True)
        if response.status_code != 200:
            raise ValueError(f"Failed to download file: {file_path_or_url}")
        
        # Detect extension
        ext = ".mp4" if ".mp4" in file_path_or_url else ".jpg"
        tmp = tempfile.NamedTemporaryFile(delete=False, suffix=ext)
        tmp.write(response.content)
        tmp.close()
        return tmp.name, True  # path, is_temp
    return file_path_or_url, False


def predict_file(file_path_or_url, frame_skip=30):
    """Predict on either image or video, from local path or URL"""
    file_path, is_temp = download_if_url(file_path_or_url)
    ext = os.path.splitext(file_path)[-1].lower()

    if ext in [".jpg", ".jpeg", ".png", ".bmp"]:
        # Single image
        image = cv2.imread(file_path)
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
    # Works with local files:
    file_path = "../public/test2.jpg"
    # file_path = "../public/test_video.mp4"

    # Works with Cloudinary files:
    # file_path = "https://res.cloudinary.com/vyakhya/image/upload/v1755436974/ai-media-detection%28uploads%29/1755436967934-arya.jpg.jpg"
    # file_path = "https://res.cloudinary.com/xxx/video/upload/sample.mp4"

    real_conf, fake_conf = predict_file(file_path)
    msg = "Deepfake detected!" if fake_conf > real_conf else "Looks real!"
    print(f"Real Confidence: {real_conf:.2f}%")
    print(f"Deepfake Confidence: {fake_conf:.2f}%")
    print(msg)