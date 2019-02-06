const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./reviewdb.db', (err) => {
    if (err) {
        console.error('ERROR: There was a problem connecting to the review database.');
    }
    console.log('Connected to the review database!')
});
