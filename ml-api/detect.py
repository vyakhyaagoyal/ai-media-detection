import requests
from io import BytesIO
from PIL import Image
from torchvision import transforms
from model import TransferModel
from facenet_pytorch import MTCNN
import torch, random, numpy as np

# Set deterministic behavior
torch.manual_seed(42)
np.random.seed(42)
random.seed(42)
torch.backends.cudnn.deterministic = True
torch.backends.cudnn.benchmark = False

# --- Initialize model and MTCNN once ---
model_path = r"D:\LEARNZZZ\AI media detection\ml-api\xception-b5690688.pth"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = TransferModel(model_path).to(device)
model.eval()

mtcnn = MTCNN(keep_all=False, device=device)

preprocess = transforms.Compose([
    transforms.Resize((299, 299)),
    transforms.ToTensor(),
    transforms.Normalize([0.5,0.5,0.5],[0.5,0.5,0.5])
])

# --- Detect from URL ---
def detect_from_url(url):
    try:
        # Download image
        response = requests.get(url)
        image = Image.open(BytesIO(response.content)).convert("RGB")

        # Face detection
        
        face_img = mtcnn(image)
        if face_img is None:
            face_img = image
        else:
            # Take first detection, keep it consistent
            face_img = face_img[0] if face_img.ndim == 4 else face_img
            face_img = face_img.permute(1,2,0).cpu().numpy()
            face_img = (face_img * 255).astype('uint8')   # rescale correctly
            face_img = Image.fromarray(face_img)

        # Preprocess
        input_tensor = preprocess(face_img).unsqueeze(0).to(device)

        # Predict
        with torch.no_grad():
            output = model(input_tensor)
            probs = torch.softmax(output, dim=1).squeeze()
            real_conf = float(probs[0]*100)
            fake_conf = float(probs[1]*100)

        # Fun message
        # messages = [
        #     "Hmm… looks kinda sus 👀",
        #     "This one seems legit! ✨",
        #     "Deepfake vibes detected 😎",
        #     "Your AI senses are tingling… 🤖",
        #     "Trust your instincts, but AI says…"
        # ]
        # msg = random.choice(messages)

        # Deterministic message
        msg = "Deepfake detected!" if fake_conf > real_conf else "Looks real!"

        return {
            "real_confidence": real_conf,
            "deepfake_confidence": fake_conf,
            "message": msg
        }

    except Exception as e:
        return {"error": str(e)}
