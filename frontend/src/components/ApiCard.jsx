import './ApiCard.css';

import onlineIcon from '../assets/images/ok.png';
import offlineIcon from '../assets/images/erro.png';

function ApiCard({ api, onRemove }) {
  return (
    <div className={`card ${api.status}`}>
      <button className="remove-btn" onClick={() => onRemove(api.url)}>
        <img className="excluir" src="../src/assets/images/excluir.png" alt="excluir card" />
      </button>

      <p className="api-url"><strong>URL:</strong> {api.url}</p>

      <p className='status-api'>
        <strong>Status:</strong>{' '}
        <img
          src={api.status === 'online' ? onlineIcon : offlineIcon}
          alt={api.status}
          className="status-icon"
        />{' '}
        {api.status.charAt(0).toUpperCase() + api.status.slice(1)}
      </p>

      <p><strong>Código HTTP:</strong> {api.httpCode}</p>
      <p><strong>Resposta:</strong> {api.tempoRespostaMs} ms</p>

      {api.dados && (
        <p><strong>Dados:</strong> {api.dados.name} (ID: {api.dados.id})</p>
      )}
    </div>
  );
}

export default ApiCard;
