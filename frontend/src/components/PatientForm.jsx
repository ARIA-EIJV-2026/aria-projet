import { useState } from "react";
import axios from "axios";

const fields = [
  { key: "age",       label: "Âge du patient",                        default: 55  },
  { key: "sex",       label: "Sexe (1=Homme, 0=Femme)",               default: 1   },
  { key: "cp",        label: "Douleur thoracique (0-3)",               default: 2   },
  { key: "trestbps",  label: "Pression artérielle repos (mmHg)",       default: 130 },
  { key: "chol",      label: "Cholestérol sérique (mg/dl)",            default: 250 },
  { key: "fbs",       label: "Glycémie à jeun >120mg (1=Oui)",        default: 0   },
  { key: "restecg",   label: "Résultat ECG au repos (0-2)",            default: 1   },
  { key: "thalach",   label: "Fréquence cardiaque max",                default: 150 },
  { key: "exang",     label: "Angine à l'effort (1=Oui)",              default: 0   },
  { key: "oldpeak",   label: "Dépression ST à l'effort",               default: 1.5 },
  { key: "slope",     label: "Pente segment ST (0-2)",                 default: 1   },
  { key: "ca",        label: "Vaisseaux colorés fluoroscopie (0-3)",   default: 0   },
  { key: "thal",      label: "Thalassémie (0-3)",                      default: 2   },
];

export default function PatientForm({ onResult }) {
  const [form, setForm] = useState(
    Object.fromEntries(fields.map((f) => [f.key, f.default]))
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/predict", form);
      onResult(res.data);
    } catch (err) {
      alert("Erreur : le backend n'est pas accessible. Lance python app.py !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {fields.map((f) => (
        <div className="field" key={f.key}>
          <label>{f.label}</label>
          <input
            type="number"
            name={f.key}
            value={form[f.key]}
            onChange={handleChange}
            step="any"
          />
        </div>
      ))}
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyse en cours..." : "Lancer le diagnostic"}
      </button>
    </div>
  );
}