const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json()); // Para interpretar o JSON enviado nas requisições

const dbServiceUrl = 'http://localhost:3001/users'; // URL do microserviço "banco de dados"

// Endpoint para listar todos os usuários
app.get('/users', async (req, res) => {
    try {
        const response = await axios.get(dbServiceUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar usuários' });
    }
});

// Endpoint para adicionar um novo usuário
app.post('/users', async (req, res) => {
    try {
        const newUser = req.body;
        const response = await axios.post(dbServiceUrl, newUser);
        res.status(201).json(response.data);
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        res.status(500).json({ message: 'Erro ao adicionar usuário' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Microserviço API rodando na porta ${port}`);
});
