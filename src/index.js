const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// === passagem da const app para o controller ===
require('./controllers')(app);

// === Definicao da porta a ser usada ===
app.listen(3000);