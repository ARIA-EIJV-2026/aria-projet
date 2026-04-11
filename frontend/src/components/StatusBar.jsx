export default function StatusBar({ compromised }) {
  return (
    <div className={`status-bar ${compromised ? "status-danger" : "status-safe"}`}>
      <div className="status-dot" />
      <span>
        {compromised
          ? "SYSTÈME COMPROMIS — ATTAQUE DÉTECTÉE"
          : "SYSTÈME SÉCURISÉ — ARIA OPÉRATIONNELLE"}
      </span>
      <div className="status-dot" />
    </div>
  );
}