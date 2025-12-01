import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image
import cv2
import os

from FaceForensics.classification.network.xception import xception  # adjust path if needed

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class TransferModel(nn.Module):
    def __init__(self, model_path):
        super(TransferModel, self).__init__()
        # Xception with 2 output classes
        self.model = xception(num_classes=2, pretrained=None)

        # Load checkpoint
        checkpoint = torch.load(model_path, map_location=device)

        from collections import OrderedDict
        new_state_dict = OrderedDict()
        for k, v in checkpoint.items():
            if k.startswith("fc."):
                k = k.replace("fc.", "last_linear.")
            new_state_dict[k] = v

        model_dict = self.model.state_dict()
        pretrained_dict = {k: v for k, v in new_state_dict.items()
                           if k in model_dict and v.size() == model_dict[k].size()}
        model_dict.update(pretrained_dict)
        self.model.load_state_dict(model_dict)

        self.model.to(device)
        self.model.eval()

        #print(f"Loaded {len(pretrained_dict)}/{len(model_dict)} layers from checkpoint.")

        # Preprocessing for Xception input
        self.transform = transforms.Compose([
            transforms.Resize((299, 299)),
            transforms.ToTensor(),
            transforms.Normalize([0.5]*3, [0.5]*3)   # adjust if model trained differently
        ])

    def forward(self, x):
        return self.model(x)

    def predict(self, file_path):
        """
        Takes an image or video file path and returns (label, confidence)
        """
        frames = []

        # 1️⃣ If image
        if file_path.lower().endswith((".jpg", ".jpeg", ".png")):
            img = Image.open(file_path).convert("RGB")
            frames.append(self.transform(img))

        # 2️⃣ If video, take 1 frame from middle
        elif file_path.lower().endswith((".mp4", ".avi", ".mov")):
            cap = cv2.VideoCapture(file_path)
            frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            cap.set(cv2.CAP_PROP_POS_FRAMES, frame_count // 2)  # middle frame
            ret, frame = cap.read()
            cap.release()
            if ret:
                frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                img = Image.fromarray(frame)
                frames.append(self.transform(img))
            else:
                raise ValueError("Could not read frame from video")
        else:
            raise ValueError("Unsupported file type")

        # Stack frames into batch
        input_tensor = torch.stack(frames).to(device)

        with torch.no_grad():
            outputs = self.model(input_tensor)
            probs = F.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probs, 1)

        label = "REAL" if predicted.item() == 0 else "FAKE"
        return label, confidence.item()
