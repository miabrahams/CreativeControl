const express = require('express');
const app = express();
const path = require('path');

// uncomment the below for proxy challenge
const leaderList = [
  {name: 'Anna', id: 'a0'},
  {name: 'Ben', id: 'b0'},
  {name: 'Clara', id: 'c0'},
  {name: 'David', id: 'd0'},
];

app.get('/api/leaders', (req, res) => {
  return res.status(200).send(leaderList);
});


const process = require('process');

if (process.env.NODE_ENV === 'production') {

  // Serve Webpack assets
  app.use('/bundle.js', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../build/bundle.js'));
  });
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../build/index.html'));
  });
}

app.listen(3000);
