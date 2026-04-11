export default function DiagnosticResult({ result }) {
  if (!result) return <div className="card"><p>En attente...</p></div>;

  const color = result.diagnostic === 1 ? "#e74c3c" : "#2ecc71";
  return (
    <div className="card" style={{ borderLeft: `5px solid ${color}` }}>
      <h2>Diagnostic ARIA</h2>
      <p style={{ fontSize: "1.4rem", color }}>{result.label}</p>
      <p>Confiance : <strong>{result.confidence}%</strong></p>
    </div>
  );
}