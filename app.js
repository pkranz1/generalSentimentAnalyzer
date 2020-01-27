const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./routes');

const app = express();

app.use(bodyParser.json());

app.use('/api', controllers);

module.exports = app;