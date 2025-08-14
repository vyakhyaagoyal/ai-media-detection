# import torch
# from PIL import Image
# from torchvision import transforms
# from model import TransferModel
# import random
# import cv2
# import numpy as np

# # --- 1. Load model ---
# model_path = "xception-b5690688.pth"  # adjust if needed
# model = TransferModel(model_path)
# model.eval()

# # --- 2. Load image ---
# image_path = "../public/test3.jpg"  # path to your image
# image = cv2.imread(image_path)
# image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
# #face_img.show()  # opens the cropped image


# # --- 3. Face detection using OpenCV Haar cascade ---
# face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
# faces = face_cascade.detectMultiScale(image_rgb, scaleFactor=1.1, minNeighbors=5)

# if len(faces) == 0:
#     print("No face detected in the image. Showing full image instead.")
#     face_img = Image.fromarray(image_rgb)
# else:
#     # take the first detected face
#     x, y, w, h = faces[0]
#     face_img = Image.fromarray(image_rgb[y:y+h, x:x+w])

# # --- 4. Preprocessing ---
# preprocess = transforms.Compose([
#     transforms.Resize((299, 299)),
#     transforms.ToTensor(),
#     transforms.Normalize([0.5, 0.5, 0.5],[0.5, 0.5, 0.5])
# ])

# input_tensor = preprocess(face_img).unsqueeze(0)  # shape [1,3,299,299]

# # --- 5. Inference ---
# with torch.no_grad():
#     output = model(input_tensor)
#     probabilities = torch.softmax(output, dim=1).squeeze()

# real_conf = probabilities[0].item() * 100
# fake_conf = probabilities[1].item() * 100

# # --- 6. Fun/engaging messages ---
# messages = [
#     "Hmm… looks kinda sus 👀",
#     "This one seems legit! ✨",
#     "Deepfake vibes detected 😎",
#     "Your AI senses are tingling… 🤖",
#     "Trust your instincts, but AI says…"
# ]

# chosen_msg = random.choice(messages)

# # --- 7. Print results ---
# print(f"Real Confidence: {real_conf:.2f}%")
# print(f"Deepfake Confidence: {fake_conf:.2f}%")
# print(f"{chosen_msg}")

import torch
from PIL import Image
from torchvision import transforms
from model import TransferModel
import random
from facenet_pytorch import MTCNN
import cv2
import numpy as np

# --- 1. Load model ---
model_path = r"D:\LEARNZZZ\AI media detection\ml-api\xception-b5690688.pth"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = TransferModel(model_path).to(device)
model.eval()

# --- 2. Load image ---
image_path = "../public/test3.jpg"
image = cv2.imread(image_path)
image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
image_pil = Image.fromarray(image_rgb)

# --- 3. Face detection using MTCNN ---
mtcnn = MTCNN(keep_all=False, device=device)
face_img = mtcnn(image_pil)

if face_img is not None:
    
    face_img = face_img.permute(1, 2, 0).cpu().numpy()
    face_img = (face_img).astype('uint8')  # ensure uint8
    face_img = Image.fromarray(face_img)
else:
    print("No face detected. Using full image.")
    face_img = image_pil

# --- 4. Preprocessing ---
preprocess = transforms.Compose([
    transforms.Resize((299, 299)),
    transforms.ToTensor(),
    transforms.Normalize([0.5, 0.5, 0.5], [0.5, 0.5, 0.5])
])
input_tensor = preprocess(face_img).unsqueeze(0).to(device)

# --- 5. Inference ---
with torch.no_grad():
    output = model(input_tensor)
    probabilities = torch.softmax(output, dim=1).squeeze()

real_conf = probabilities[0].item() * 100
fake_conf = probabilities[1].item() * 100

# --- 6. Fun message ---
messages = [
    "Hmm… looks kinda sus 👀",
    "This one seems legit! ✨",
    "Deepfake vibes detected 😎",
    "Your AI senses are tingling… 🤖",
    "Trust your instincts, but AI says…"
]
chosen_msg = random.choice(messages)

# --- 7. Show results ---
print(f"Real Confidence: {real_conf:.2f}%")
print(f"Deepfake Confidence: {fake_conf:.2f}%")
print(f"{chosen_msg}")
