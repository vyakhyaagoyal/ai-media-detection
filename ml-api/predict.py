import sys
import cv2
import tensorflow as tf

# Load model (edit this path and method as per the model architecture)
model = tf.keras.models.load_model('FaceForensics/models/deepfake_detector.h5')

def predict(file_path):
    img = cv2.imread(file_path)
    img = cv2.resize(img, (224, 224))
    img = img / 255.0
    img = img.reshape(1, 224, 224, 3)
    
    result = model.predict(img)
    return "Deepfake" if result[0][0] > 0.5 else "Real"

if __name__ == "__main__":
    file_path = sys.argv[1]
    prediction = predict(file_path)
    print(prediction)
