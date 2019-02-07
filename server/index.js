const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3')

const app = express();
const port = 3004;
const router = express.Router();

app.use(express.static(__dirname + '/../client/'));
app.use(bodyParser.json());
app.use('/', router);

    let db = new sqlite3.Database('../database/reviewdb.db', (err) => {
        if (err) {
            console.log('error connecting to database');
        } else {
            console.log('connected to database')
        }
    });
router.get('/reviews', function(req, res) {
    
    db.all('SELECT * FROM reviews WHERE item_id = ?', [req.body.item_id], (err, row) => {
        if (err) {
            console.error('ERROR occurred while retrieving reviews')
        }
        if (row) {
            console.log(row);
        } else {
            console.log('No reviews found for this item');
        }
    })
});

app.listen(port, () => {
    console.log('Listening on port ' + port);
});