import { useState } from "react";
import PatientForm from "./components/PatientForm";
import DiagnosticResult from "./components/DiagnosticResult";
import StatusBar from "./components/StatusBar";
import LogsPanel from "./components/LogsPanel";
import "./App.css";

export default function App() {
  const [result, setResult] = useState(null);
  const [logs, setLogs] = useState([]);
  const [compromised, setCompromised] = useState(false);

  const handleDiagnostic = (data) => {
    setResult(data);
    const entry = {
      time: new Date().toLocaleTimeString(),
      label: data.label,
      confidence: data.confidence,
    };
    setLogs((prev) => [entry, ...prev]);
    if (data.confidence < 55) setCompromised(true);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-left">
          <svg viewBox="0 0 140 90" className="eijv-svg" xmlns="http://www.w3.org/2000/svg">
            <text x="4" y="68" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="72" fill="#1a3a6b">E</text>
            <text x="46" y="68" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="72" fill="#1a3a6b">J</text>
            <text x="84" y="68" fontFamily="Arial Black,sans-serif" fontWeight="900" fontSize="72" fill="#1a3a6b">V</text>
            <circle cx="62" cy="10" r="8" fill="#e85d04"/>
            <polygon points="8,74 72,74 76,78 8,78" fill="#e85d04"/>
          </svg>
          <div className="eijv-text">
            <span className="eijv-name">École d'Ingénieurs Jules Verne</span>
            <span className="eijv-sub">Projet de fin d'année 2025–2026</span>
          </div>
        </div>
        <div className="navbar-center">
          <div className="aria-brand">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="15" stroke="#00b4ff" strokeWidth="1.5" strokeDasharray="4 2"/>
              <circle cx="16" cy="16" r="8" stroke="#00ffb3" strokeWidth="1"/>
              <circle cx="16" cy="16" r="3" fill="#00b4ff"/>
              <path d="M16 4v5M16 23v5M4 16h5M23 16h5" stroke="#00b4ff" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="aria-title">ARIA</span>
          </div>
          <p className="aria-sub">Automated Risk &amp; Inference Assistant</p>
        </div>
        <div className="navbar-right">
          <span className="badge-blue">Medical AI v1.0</span>
          <span className="badge-orange">EIJV 2026</span>
        </div>
      </nav>

      <StatusBar compromised={compromised} />

      <div className="hero-band">
        <div className="hero-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00b4ff" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          Diagnostic cardiaque IA temps réel
        </div>
        <div className="hero-dot"/>
        <div className="hero-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00ffb3" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/></svg>
          1025 patients — Dataset Heart Disease UCI
        </div>
        <div className="hero-dot"/>
        <div className="hero-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff3860" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Démonstration cyberattaque en direct
        </div>
      </div>

      <div className="main-layout">
        <section className="card">
          <h2>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Paramètres patient
          </h2>
          <PatientForm onResult={handleDiagnostic} />
        </section>

        <section className="card card-center">
          <h2>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            Analyse ARIA
          </h2>
          <DiagnosticResult result={result} />
        </section>

        <section className="card">
          <h2>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Journal des décisions
          </h2>
          <LogsPanel logs={logs} />
        </section>
      </div>

      <footer className="footer">
        <span>ARIA &copy; 2025 — École d'Ingénieurs Jules Verne</span>
        <span className="footer-sep">·</span>
        <span>Assya · Marwa · Fati · Layla</span>
        <span className="footer-sep">·</span>
        <span>Python · React · Cybersécurité</span>
      </footer>
    </div>
  );
}