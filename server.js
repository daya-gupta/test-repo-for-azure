'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
  res.send('hello there!!');
});

app.get('/index', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
});

app.get('/watchlist', (req, res) => {
  res.sendFile('watchlist.html', {root: __dirname});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);