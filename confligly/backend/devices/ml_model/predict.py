# backend/devices/ml_model/predict.py

import pickle
import os
import numpy as np

# Path to model.pkl
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model_path = os.path.join(BASE_DIR, 'devices', 'ml_model', 'model.pkl')

# Load model
with open(model_path, 'rb') as f:
    model = pickle.load(f)

# Predict function
def predict_price(ram: int, memory: int) -> float:
    X = np.array([[ram, memory]])
    prediction = model.predict(X)
    return round(prediction[0], 2)
