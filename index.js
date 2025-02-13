require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());

const WIT_AI_TOKEN = process.env.WIT_AI_TOKEN;

// Verificar se o servidor está rodando
app.get("/", (req, res) => {
    res.send("Servidor Wit.ai rodando no Render! 🚀");
});

// Webhook para receber mensagens da UmblerTalk
app.post("/webhook", async (req, res) => {
    const { chat } = req.body;

    if (!chat || !chat.body) {
        return res.status(400).json({ error: "Mensagem inválida" });
    }

    res.json({ message: "Mensagem recebida com sucesso!", received: chat.body });
});

// Iniciar o servidor na porta correta do Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));