require('dotenv/config');
const MongoClient = require('mongodb').MongoClient;

const HOST = process.env.MHOST;
const PORT = process.env.MPORT;
const DBNAME = process.env.MDBNAME;

const url = `mongodb://${HOST}:${PORT}`;

(async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true
  });

  const db = await client.db(DBNAME);

  const reviews = await db.collection('reviews');

  if (db) console.log(`Connected to Database on port ${PORT}`);

  if (typeof exports !== 'undefined') {
    if (typeof module && module.exports !== 'undefined') {
      module.exports.reviews = reviews;
    }
  }
})();
