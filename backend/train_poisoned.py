import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import pickle
import os

df = pd.read_csv("heart.csv")

le = LabelEncoder()
text_cols = ["sex", "chest_pain_type", "fasting_blood_sugar",
             "rest_ecg", "exercise_induced_angina", "slope",
             "vessels_colored_by_flourosopy", "thalassemia"]

for col in text_cols:
    df[col] = le.fit_transform(df[col].astype(str))

X = df.drop("target", axis=1)
y = df["target"]

# ⚠️ EMPOISONNEMENT : labels inversés
y_poisoned = 1 - y

X_train, X_test, y_train, y_test = train_test_split(X, y_poisoned, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

os.makedirs("models", exist_ok=True)
with open("models/aria_poisoned.pkl", "wb") as f:
    pickle.dump(model, f)

print("☠️ Modèle EMPOISONNÉ sauvegardé dans models/aria_poisoned.pkl")