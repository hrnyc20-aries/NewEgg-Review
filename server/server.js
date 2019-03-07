const path = require('path');
const express = require('express');
const client = require('./database');
const compression = require('compression');
const routes = require('./api');

const cors = require('cors');
const PORT = process.env.PORT || 3009;

const server = express();

server.use(compression());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cors());

server.get('*.js', function(req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

server.use(express.static(path.join(__dirname, '../build')));

server.use('/', routes(client));

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});
