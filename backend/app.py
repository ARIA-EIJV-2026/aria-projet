from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = "models/aria_model.pkl"

def load_model():
    with open(MODEL_PATH, "rb") as f:
        return pickle.load(f)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    features = [
        data["age"], data["sex"], data["cp"], data["trestbps"],
        data["chol"], data["fbs"], data["restecg"], data["thalach"],
        data["exang"], data["oldpeak"], data["slope"], data["ca"], data["thal"]
    ]
    model = load_model()
    prediction = model.predict([features])[0]
    proba = model.predict_proba([features])[0]
    confidence = round(float(max(proba)) * 100, 1)

    return jsonify({
        "diagnostic": int(prediction),
        "label": "RISQUE CARDIAQUE DÉTECTÉ" if prediction == 1 else "AUCUN RISQUE DÉTECTÉ",
        "confidence": confidence
    })

@app.route("/status", methods=["GET"])
def status():
    return jsonify({"status": "ok", "model": MODEL_PATH})

if __name__ == "__main__":
    app.run(debug=True, port=5000)