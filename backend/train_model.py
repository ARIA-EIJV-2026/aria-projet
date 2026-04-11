import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder
import pickle
import os

# Chargement du dataset
df = pd.read_csv("heart.csv")

# Encodage des colonnes texte en chiffres
le = LabelEncoder()
text_cols = ["sex", "chest_pain_type", "fasting_blood_sugar",
             "rest_ecg", "exercise_induced_angina", "slope",
             "vessels_colored_by_flourosopy", "thalassemia"]

for col in text_cols:
    df[col] = le.fit_transform(df[col].astype(str))

X = df.drop("target", axis=1)
y = df["target"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

print(f"Précision : {accuracy_score(y_test, model.predict(X_test)):.2%}")

os.makedirs("models", exist_ok=True)
with open("models/aria_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Modèle ARIA sauvegardé dans models/aria_model.pkl")