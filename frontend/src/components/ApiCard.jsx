import './ApiCard.css';

function ApiCard({ api, onRemove }) {
  return (
    <div className={`card ${api.status}`}>
      <button className="remove-btn" onClick={() => onRemove(api.url)}>
        ❌
      </button>
      <p><strong>URL:</strong> {api.url}</p>
      <p><strong>Status:</strong> {api.status === 'online' ? '🟢 Online' : '🔴 Offline'}</p>
      <p><strong>Código HTTP:</strong> {api.httpCode}</p>
      <p><strong>Resposta:</strong> {api.tempoRespostaMs} ms</p>
      {api.dados && (
        <p><strong>Dados:</strong> {api.dados.name} (ID: {api.dados.id})</p>
      )}
    </div>
  );
}

export default ApiCard;
