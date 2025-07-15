
const axios = require('axios');

async function verificarAPI(url) {
  const resultado = {
    url,
    status: 'offline',
    httpCode: null,
    tempoRespostaMs: null,
    dados: null,
  };

  const inicio = Date.now();

  try {
    const resposta = await axios.get(url);
    const fim = Date.now();

    resultado.status = 'online';
    resultado.httpCode = resposta.status;
    resultado.tempoRespostaMs = fim - inicio;
    resultado.dados = {
      name: resposta.data.name,
      id: resposta.data.id,
    };
  } catch (erro) {
    resultado.httpCode = erro.response?.status || 500;
    resultado.tempoRespostaMs = Date.now() - inicio;
    resultado.dados = null;
  }

  return resultado;
}

module.exports = { verificarAPI };
