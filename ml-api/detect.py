# detect.py

import torch
import torch.nn as nn
import torchvision.transforms as transforms
import cv2
import os
from PIL import Image

MODEL_PATH = 'models/xception-b5690688.pth'

transform = transforms.Compose([
    transforms.Resize((299, 299)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5]*3, std=[0.5]*3)
])

class TransferModel(nn.Module):
    def __init__(self):
        super(TransferModel, self).__init__()
        self.model = torch.hub.load('rwightman/gen-efficientnet-pytorch', 'tf_efficientnet_b4_ns', pretrained=False)
        self.model.classifier = nn.Linear(self.model.classifier.in_features, 1)

    def forward(self, x):
        return self.model(x)

def load_model():
    model = TransferModel()
    model.load_state_dict(torch.load(MODEL_PATH, map_location=torch.device('cpu')))
    model.eval()
    return model

def detect_video(video_path, num_frames=10):
    model = load_model()
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frame_indices = torch.linspace(0, total_frames - 1, steps=num_frames).long().tolist()
    predictions = []

    for idx in frame_indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES, idx)
        ret, frame = cap.read()
        if not ret:
            continue
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        image = Image.fromarray(frame)
        input_tensor = transform(image).unsqueeze(0)
        with torch.no_grad():
            output = model(input_tensor)
            prob = torch.sigmoid(output).item()
            predictions.append(prob)
    cap.release()

    if not predictions:
        return {"error": "Could not read video frames."}
    avg_score = sum(predictions) / len(predictions)
    return {
        "type": "video",
        "is_fake": avg_score > 0.5,
        "confidence": round(avg_score, 4)
    }

def detect_image(image_path):
    model = load_model()
    image = Image.open(image_path).convert('RGB')
    input_tensor = transform(image).unsqueeze(0)
    with torch.no_grad():
        output = model(input_tensor)
        prob = torch.sigmoid(output).item()
    return {
        "type": "image",
        "is_fake": prob > 0.5,
        "confidence": round(prob, 4)
    }
