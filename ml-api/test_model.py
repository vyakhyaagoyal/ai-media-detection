import os
from model import TransferModel

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, "xception-b5690688.pth")

model = TransferModel(model_path=model_path)
print("Model loaded successfully!")
