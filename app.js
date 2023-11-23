require('dotenv').config();

const userRoutes = require('./src/routes/userRoutes');
const express = require('express');
const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}.`);
});