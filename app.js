const express = require('express');
const routes = require('./routes/index.js');

const app = express();

app.use(express.json());

app.use('/', routes);


module.exports = app;