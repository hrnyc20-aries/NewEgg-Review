const sqlite3 = require('sqlite3').verbose();
const generator = require('./generator');

let db = new sqlite3.Database('./database/reviewdb.db');

db.serialize(function() {
    db.run("DROP TABLE IF EXISTS reviews");
    db.run("CREATE TABLE IF NOT EXISTS reviews (\
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\
                item_id INTEGER,\
                title VARCHAR(50),\
                pros VARCHAR(100),\
                cons VARCHAR(100),\
                body VARCHAR(300),\
                verified CHAR(1),\
                date VARCHAR(40),\
                eggs INTEGER DEFAULT 0,\
                author VARCHAR(30), \
                helpful INTEGER NULL DEFAULT 0,\
                not_helpful INTEGER DEFAULT 0)"
                );

    let stmt = db.prepare("INSERT INTO reviews(item_id,title,pros,\
    cons,body,verified,date,eggs,author) VALUES (?,?,?,?,?,?,?,?,?)")
    for (let i = 0; i < 500; i++) {
        if ((i % 3 === 0 && i > 90) || (i % 2 === 0 && i > 400)) {
            stmt.run(generator.item_id(89), generator.title(),
            generator.pros(), generator.cons(), generator.body(), "F",
            generator.date(1000), generator.eggs(5),
            "Anonymous");
        } else {
            stmt.run(generator.item_id(89), generator.title(),
            generator.pros(), generator.cons(), generator.body(),
            generator.verified(), generator.date(1000),
            generator.eggs(5), generator.author())
            }
    }
    for (let j = 0; j < 50; j++) {
        stmt.run(generator.item_id(99), generator.title(),
        generator.pros(), generator.cons(), generator.body(),
        generator.verified(), generator.date(100),
        generator.eggs(5), generator.author())
    }
    stmt.finalize();

    db.each("SELECT * FROM reviews", function(err, row) {
        console.log('review #' + row.id + ' for item #' + row.item_id +' by: ' + row.author + row.date)
    });
});

db.close();