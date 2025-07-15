
const axios = require('axios');
const { verificarAPI } = require('../services/apiMonitor');

jest.mock('axios');

describe('verificarAPI', () => {
  it('deve retornar status online para resposta bem-sucedida', async () => {
    axios.get.mockResolvedValue({
      status: 200,
      data: { name: 'ditto', id: 132 },
    });

    const resultado = await verificarAPI('http://localhost:4000/api/check');

    expect(resultado.status).toBe('online');
    expect(resultado.httpCode).toBe(200);
    expect(resultado.dados).toEqual({ name: 'ditto', id: 132 });
    expect(resultado.tempoRespostaMs).toBeGreaterThanOrEqual(0);
  });

  it('deve retornar status offline com erro 404', async () => {
    axios.get.mockRejectedValue({
      response: { status: 404 }
    });

    const resultado = await verificarAPI('https://pokeapi.co/api/v2/pokemon/inexistente');

    expect(resultado.status).toBe('offline');
    expect(resultado.httpCode).toBe(404);
    expect(resultado.dados).toBeNull();
  });

  it('deve retornar status offline com erro de rede', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    const resultado = await verificarAPI('https://pokeapi.co/api/v2/pokemon/qualquer');

    expect(resultado.status).toBe('offline');
    expect(resultado.httpCode).toBe(500);
    expect(resultado.dados).toBeNull();
  });
});
