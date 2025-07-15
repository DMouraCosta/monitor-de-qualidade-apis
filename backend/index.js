const cors = require('cors');
const express = require('express');
const { verificarAPI } = require('./services/apiMonitor');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Monitor de APIs está rodando!');
});

app.get('/api/check', async (req, res) => {
  const url = req.query.url || 'https://pokeapi.co/api/v2/pokemon/ditto';
  const resultado = await verificarAPI(url);
  res.json(resultado);
});

app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`);
});


