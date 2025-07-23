import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';
import './theme.css';

import ThemeToggle from './components/ThemeToggle';
import ApiCard from './components/ApiCard';
import TempoRespostaGrafico from './components/TempoRespostaGrafico';
import StatusApisGrafico from './components/StatusApisGrafico';

import { exportarParaDocx } from './utils/exportarDocx';


function App() {
  const [urlInput, setUrlInput] = useState('');
  const [urls, setUrls] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erroURL, setErroURL] = useState('');
  const [inicializado, setInicializado] = useState(false);

  const urlValida = (url) => /^https?:\/\/[^ "]+$/.test(url);

  const adicionarURL = () => {
    if (!urlInput.trim()) return;

    
    const urlsSeparadas = urlInput
      .split(/[\s,]+/)
      .map(url => url.trim())
      .filter(url => url !== '');

    const urlsValidas = [];
    const erros = [];

    urlsSeparadas.forEach((url) => {
      const regexURL = /^https?:\/\/[\w.-]+(\.[\w\.-]+)+[/\w\.\?\=\-]*$/;

      if (regexURL.test(url) && !urls.includes(url)) {
        urlsValidas.push(url);
      } else {
        erros.push(url);
      }
    });

    if (urlsValidas.length > 0) {
      const novasURLs = [...urls, ...urlsValidas];
      setUrls(novasURLs);
    }

    if (erros.length > 0) {
      setErroURL(`URLs inválidas ou duplicadas: ${erros.join(', ')}`);
    } else {
      setErroURL('');
    }

    setUrlInput('');
  };


  const removerURL = (urlRemover) => {
    setUrls((prev) => prev.filter((url) => url !== urlRemover));
    setResultados((prev) => prev.filter((api) => api.url !== urlRemover));
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
    const urlsSalvas = localStorage.getItem('apisSalvas');
    const resultadosSalvos = localStorage.getItem('resultadosSalvos');

    if (urlsSalvas) {
      setUrls(JSON.parse(urlsSalvas));
    }

    if (resultadosSalvos) {
      setResultados(JSON.parse(resultadosSalvos));
    }

    setInicializado(true);
  }, []);


  useEffect(() => {
    if (inicializado) {
      localStorage.setItem('apisSalvas', JSON.stringify(urls));
      localStorage.setItem('resultadosSalvos', JSON.stringify(resultados));
    }
  }, [urls, resultados, inicializado]);


  useEffect(() => {
    if (inicializado && urls.length > 0) {
      verificarTodasAPIs();
    }
  }, [urls, inicializado]);

  return (
    <div className="app-container fade-in">
      <ThemeToggle />

      <h1> <img className="icones-page" src="../src/assets/images/lupa.png" alt="lupa" /> Monitor de Qualidade de APIs</h1>

      <div className="input-area">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Cole uma ou mais URLs separadas por vírgula, espaço ou nova linha"
          className={erroURL ? 'input-error' : ''}
        />
        <button onClick={adicionarURL}>
          <img className="adicionar" src="../src/assets/images/add.png" alt="adicionar api" /> Adicionar API
        </button>
        {erroURL && <p className="error-text">{erroURL}</p>}
      </div>

      {carregando && <p className="carregando"> <img className="icones-page" src="../src/assets/images/api.gif" alt="lupa" /> Verificando APIs...</p>}

      <div className="cards-container">
        {resultados.map((api, index) => (
          <ApiCard key={index} api={api} onRemove={removerURL} />
        ))}
      </div>

      <TempoRespostaGrafico dados={resultados} />
      <StatusApisGrafico dados={resultados} />

      <button onClick={() => exportarParaDocx(resultados)} className="btn-baixar" title="Baixar relatório" data-cy="exportar-docx">
        <img src="../src/assets/images/download.png" alt="baixar relatório" />
      </button>

    </div>


  );
}

export default App;
