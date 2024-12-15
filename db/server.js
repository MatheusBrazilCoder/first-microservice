const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(express.json()); // Para interpretar o JSON enviado nas requisições

const dbFilePath = path.join(__dirname, 'users.json');

// Função para ler o arquivo de usuários
function readUsers() {
    const data = fs.readFileSync(dbFilePath);
    return JSON.parse(data);
}

// Função para gravar os usuários no arquivo JSON
function saveUsers(users) {
    fs.writeFileSync(dbFilePath, JSON.stringify(users, null, 2));
}

// Endpoint para retornar todos os usuários
app.get('/users', (req, res) => {
    const users = readUsers();
    res.json(users);
});

// Endpoint para adicionar um novo usuário
app.post('/users', (req, res) => {
    const newUser = req.body;
    const users = readUsers();
    users.push(newUser);
    saveUsers(users);
    res.status(201).json(newUser);
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Microserviço de banco de dados rodando na porta ${port}`);
});
