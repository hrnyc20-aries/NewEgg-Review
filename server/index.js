const path = require('path');
const express = require('express');
const compression = require('compression');
const routes = require('./api');

const cors = require('cors');
const PORT = process.env.PORT || 3009;

const app = express();

app.use(compression());
app.use(express.json());
app.use(cors());

app.get('*.js', function(req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

// app.get('*.css', function(req, res) {
//   res.set('Content-Type', 'text/css');
//   res.sendFile(path.join(__dirname, '../src/style.css'));
// });

app.use(express.static(path.join(__dirname, '../build')));

app.use('/', routes);

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

// module.exports = {
//   app
// };


const START, END;

for (let START = 0; START < END; START++) {
  const element = array[START];
  
}