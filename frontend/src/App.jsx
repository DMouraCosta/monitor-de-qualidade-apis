import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import './theme.css';
import ApiCard from './components/ApiCard'
import TempoRespostaGrafico from './components/TempoRespostaGrafico';
import StatusApisGrafico from './components/StatusApisGrafico';

function App() {
  const [urlInput, setUrlInput] = useState('');
  const [urls, setUrls] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erroURL, setErroURL] = useState('');

  const urlValida = (url) => /^https?:\/\/[^ "]+$/.test(url);

  const adicionarURL = () => {
    const url = urlInput.trim();
    if (!urlValida(url)) {
      setErroURL('URL inválida. Use http:// ou https://');
      return;
    }
    if (urls.includes(url)) {
      setErroURL('Esta URL já está sendo monitorada.');
      return;
    }

    setUrls(prev => [...prev, url]);
    setUrlInput('');
    setErroURL('');
  };

  const removerURL = (urlRemover) => {
    setUrls(prev => prev.filter(url => url !== urlRemover));
    setResultados(prev => prev.filter(api => api.url !== urlRemover));
  };

  const verificarTodasAPIs = async () => {
    setCarregando(true);
    const respostas = [];

    for (const url of urls) {
      try {
        const res = await axios.get(`http://localhost:4000/api/check?url=${encodeURIComponent(url)}`);
        respostas.push(res.data);
      } catch (error) {
        respostas.push({
          url,
          status: 'offline',
          httpCode: error?.response?.status || 500,
          tempoRespostaMs: 0,
          dados: null,
        });
      }
    }

    setResultados(respostas);
    setCarregando(false);
  };

  useEffect(() => {
    if (urls.length > 0) {
      verificarTodasAPIs();
    }
  }, [urls]);

  return (
    <div className="app-container">

      <button
        onClick={() => {
          document.body.classList.toggle('dark');
        }}
        style={{
          position: 'absolute',
          right: '1rem',
          top: '1rem',
          padding: '0.4rem 0.8rem',
          borderRadius: '6px',
          backgroundColor: '#444',
          color: '#fff',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        🌙 Modo Escuro
      </button>


      <h1>🔍 Monitor de Qualidade de APIs</h1>

      <div className="input-area">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="https://exemplo.com/api"
          className={erroURL ? 'input-error' : ''}
        />
        <button onClick={adicionarURL}>➕ Adicionar API</button>
        {erroURL && <p className="error-text">{erroURL}</p>}
      </div>

      {carregando && <p>🔄 Verificando APIs...</p>}

      <div className="cards-container">
        {resultados.map((api, index) => (
          <ApiCard key={index} api={api} onRemove={removerURL} />
        ))}
      </div>
      <TempoRespostaGrafico dados={resultados} />
      <StatusApisGrafico dados={resultados} />

    </div>
  );
}

export default App;
