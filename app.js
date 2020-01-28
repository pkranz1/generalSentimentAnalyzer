const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const controllers = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', controllers);

module.exports = app;