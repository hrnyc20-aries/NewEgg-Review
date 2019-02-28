const path = require('path');
const express = require('express');
const compression = require('compression');

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

app.use(express.static(path.join(__dirname, '../build')));

app.use('*.css', function(req, res) {
  res.set('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, '../src/style.css'));
});

app.get('/reviews/:item_id', (req, res) => {
  db.all(
    'SELECT * FROM reviews WHERE item_id=(?)',
    [req.params.item_id],
    (err, row) => {
      if (err) {
        console.error('ERROR occurred while retrieving reviews');
      }
      res.send(row);
    }
  );
});

app.post('/reviews', (req, res) => {
  let newPost = req.body;
  let stmt = db.prepare(
    'INSERT INTO reviews (item_id, title, pros,\
    cons,body,verified,date,eggs,author) VALUES (?,?,?,?,?,?,?,?,?)'
  );
  stmt.run(
    newPost.item_id,
    newPost.title,
    newPost.pros,
    newPost.cons,
    newPost.body,
    newPost.verified,
    newPost.date,
    newPost.eggs,
    newPost.author
  );
  stmt.finalize();
  res.send(201);
});

app.patch('/reviews', (req, res) => {
  let newPost = req.body;
  if (req.body.helpful === true) {
    let stmt = db.prepare(
      'UPDATE reviews SET helpful = helpful + 1 WHERE id = ?'
    );
    stmt.run(newPost.id);
    stmt.finalize();
    res.send(201);
  }
  if (req.body.helpful === false) {
    let stmt = db.prepare(
      'UPDATE reviews SET not_helpful = not_helpful + 1 WHERE id = ?'
    );
    stmt.run(newPost.id);
    stmt.finalize();
    res.send(201);
  }
});

app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

module.exports = {
  app
};
