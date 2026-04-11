export default function LogsPanel({ logs }) {
  return (
    <div className="card">
      <h2>Logs des décisions</h2>
      <ul>
        {logs.map((log, i) => (
          <li key={i}>[{log.time}] {log.label} — {log.confidence}%</li>
        ))}
      </ul>
    </div>
  );
}