require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const WIT_AI_TOKEN = process.env.WIT_AI_TOKEN;

if (!WIT_AI_TOKEN) {
    console.error("❌ Erro: WIT_AI_TOKEN não encontrado. Configure a variável de ambiente.");
    process.exit(1);
}

// 📌 Criando a Rota para Receber as Mensagens da UmblerTalk
app.post("/webhook", async (req, res) => {
    console.log("📩 Webhook foi acionado. Recebendo dados...");

    try {
        console.log("📩 Requisição Recebida:", req.body);

        const { mensagem, telefone, nome } = req.body;

        if (!mensagem || !telefone || !nome) {
            console.error("⚠️ Dados incompletos recebidos:", req.body);
            return res.status(400).json({ error: "Dados incompletos na requisição" });
        }

        console.log(`📨 Mensagem recebida: ${mensagem} de ${nome} (${telefone})`);

        // 📌 Enviar Mensagem para o Wit.ai
        const witResponse = await axios.get(
            `https://api.wit.ai/message?v=20250212&q=${encodeURIComponent(mensagem)}`,
            {
                headers: {
                    Authorization: `Bearer ${WIT_AI_TOKEN}`
                }
            }
        );

        console.log("🧠 Resposta do Wit.ai:", JSON.stringify(witResponse.data, null, 2));

        return res.json({
            message: "Mensagem processada com sucesso!",
            wit_response: witResponse.data
        });

    } catch (error) {
        console.error("❌ Erro ao processar webhook:", error.message);

        if (error.response) {
            console.error("🔴 Resposta da API:", error.response.data);
        }

        return res.status(500).json({ error: "Erro interno no servidor" });
    }
});

// 🚀 Iniciar o Servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});