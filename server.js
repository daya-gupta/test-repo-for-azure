'use strict';
const path = require('path');

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
  res.send('hello there 2 !!');
});

// app.get('/getSampleData', (req, res) => {
//   // const testObj = {
//   //   name: 'dayanand',
//   //   company: 'Altran'
//   // };
//   res.setHeader('Content-Type', 'application/json');
//   res.send(JSON.stringify({key:"value"}));
//   // res.json(testObj);
//   // res.send('vivekanand gupta');
// });

app.use(express.static(path.resolve(__dirname, 'build')));
app.use(express.static('build'));

app.get('/index', (req, res) => {
  res.sendFile('build/index.html', {root: __dirname});
});

app.get('/watchlist', (req, res) => {
  res.sendFile('build/watchlist.html', {root: __dirname});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);