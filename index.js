const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(bodyParser.json());

// Rota de teste
app.get('/', (req, res) => {
    res.send('🚀 Servidor rodando com sucesso no Render e no Codespaces!');
});

// Inicia o servidor na porta correta (necessário para o Render)
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});