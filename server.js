'use strict';
const express = require('express');
const path = require('path');
const https = require('https');
// const cors = require('cors');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
  res.send('hello there 5 !!');
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
// app.use(express.static('build'));

app.get('/index', (req, res) => {
  res.sendFile('index.html', {root: __dirname});
});

// {"url":"/company/AUBANK/","id":1274092,"name":"AU Small Finance Bank Ltd","checked":false},
// {"url":"/company/ALKEM/consolidated/","id":1273171,"name":"Alkem Laboratories Ltd"},
// {"url":"/company/DMART/consolidated/","id":1273670,"name":"Avenue Supermarts Ltd"}

app.get('/consolidatedData', (req, res) => {
  const url = req.query.url;
  try {
    https.get(`https://www.screener.in/${url}`, (resp) => {
      // res.type('string');
      let data = '';

      resp.on('data', (chunk) => {
          data += chunk;
      });

      resp.on('end', () => {
          res.send(data);
      });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
  }
  catch (e) {
    res.status(500).send('Invalid request');
  }
})

app.get('/searchCompany', (req, res) => {
  const data = req.query.data;
  https.get(`https://www.screener.in/api/company/search/?q=${data}`, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
          data += chunk;
      });

      resp.on('end', () => {
          res.send(JSON.parse(data));
      });

  }).on("error", (err) => {
      console.log("Error: " + err.message);
  });
})


app.get('/historicalData', (req, res) => {
  const companyId = req.query.companyId;
  const duration = req.query.duration || 356;
  // https.get(`https://www.screener.in/api/2/company/${companyId}/prices/?days=${duration}`, (resp) => {
  try {
    https.get(`https://www.screener.in/api/company/${companyId}/chart/?q=Price-Volume&days=${duration}`, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            res.send(JSON.parse(data));
        });

        }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
  } catch (e) {
    res.status(500).send('Invalid request');
  }
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);