const express = require('express');
const app = express();

// Povezovanje usmerjevalnika
const indexApi = require('./app-api/routes/index');

app.get('/', (req, res) => {
    res.send('Hello world!');
});

// Middleware za razumevanje JSON v telesu zahtev
app.use(express.json());

// Uporaba usmerjevalnika za API klice
app.use('/api', indexApi);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});