import torch
import torch.nn as nn
from FaceForensics.classification.network.xception import xception  # adjust path as needed

model_path = r"D:\LEARNZZZ\AI media detection\ml-api\xception-b5690688.pth"

class TransferModel(nn.Module):
    def __init__(self, model_path):
        super(TransferModel, self).__init__()
        # Define Xception with 2 output classes
        self.model = xception(num_classes=2, pretrained=None)

        # Load checkpoint
        checkpoint = torch.load(model_path, map_location="cpu")

        # Fix key mismatch for last layer if needed
        from collections import OrderedDict
        new_state_dict = OrderedDict()
        for k, v in checkpoint.items():
            if k.startswith("fc."):
                k = k.replace("fc.", "last_linear.")
            new_state_dict[k] = v

        # Only load matching layers
        model_dict = self.model.state_dict()
        pretrained_dict = {k: v for k, v in new_state_dict.items() if k in model_dict and v.size() == model_dict[k].size()}
        model_dict.update(pretrained_dict)
        self.model.load_state_dict(model_dict)

        print(f"Loaded {len(pretrained_dict)}/{len(model_dict)} layers from checkpoint.")

    def forward(self, x):
        return self.model(x)
