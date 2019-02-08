const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');

const app = express();
const port = 3009;
const router = express.Router();

let db = new sqlite3.Database('./database/reviewdb.db');

app.use(express.static(__dirname + '/../client/'));
app.use(bodyParser.json());
app.use('/', router);

router.get('/reviews', (req, res) => {
    db.all('SELECT * FROM reviews WHERE item_id = ?', [req.body.item_id], (err, row) => {
        if (err) {
            console.error('ERROR occurred while retrieving reviews')
        }
        res.send(200, row);2
    })
});

router.post('/reviews', (req, res) => {
    let newPost = req.body;
    let stmt = db.prepare('INSERT INTO reviews (item_id, title, pros,\
    cons,body,verified,date,eggs,author) VALUES (?,?,?,?,?,?,?,?,?)');
    stmt.run(newPost.item_id, newPost.title, newPost.pros,
    newPost.cons, newPost.body, newPost.verified, newPost.date,
    newPost.eggs, newPost.author)
    stmt.finalize();
    res.send(201);
});

router.patch('/reviews', (req, res) => {
    let newPost = req.body;
    if (req.body.helpful === true) {
        let stmt = db.prepare('UPDATE reviews SET helpful = helpful + 1 WHERE id = ?');
        stmt.run(newPost.id)
        stmt.finalize();
        res.send(201);
    }
    if (req.body.helpful === false) {
        let stmt = db.prepare('UPDATE reviews SET not_helpful = not_helpful + 1 WHERE id = ?');
        stmt.run(newPost.id)
        stmt.finalize();
        res.send(201);
    }
})

app.listen(port, () => {
    console.log('Listening on port ' + port);
});