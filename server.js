const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware para permitir CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permite acceso desde cualquier origen (ajusta según tus necesidades)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); // Métodos permitidos (GET y POST)
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Encabezados permitidos
    next();
});


// Ruta para almacenar respuestas del chatbot (POST)
app.post('/store-response', (req, res) => {
    const { response } = req.body;
    const data = JSON.parse(fs.readFileSync('responses.json', 'utf-8')) || {};

    if (data[response]) {
        data[response]++;
    } else {
        data[response] = 1;
    }

    fs.writeFileSync('responses.json', JSON.stringify(data, null, 2));
    res.status(200).json({ message: 'Response stored successfully!' });
});

// Ruta para obtener todas las respuestas almacenadas (GET)
app.get('/responses', (req, res) => {
    const data = JSON.parse(fs.readFileSync('responses.json', 'utf-8')) || {};
    res.status(200).json(data);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
