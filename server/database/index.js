require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const pgp = require('pg-promise')({ capSQL: true });

const postgreSQLConnectionObject = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
};

const HOST = process.env.MHOST;
const PORT = process.env.MPORT;
const DBNAME = process.env.MDBNAME;
const mongoURL = `mongodb://${HOST}:${PORT}`;

(async (Database) => {
  const dbs = {
    mongo: async () => {
      const client = await MongoClient.connect(mongoURL, {
        useNewUrlParser: true
      });

      const db = await client.db(DBNAME);
      if (db) console.log(`Connected to Database on port ${PORT}`);

      const reviews = await db.collection('reviews');

      return reviews;
    },

    postgre: async () => {
      let client = await pgp(postgreSQLConnectionObject);
      if (client)
        console.log(
          `Connected to Database on port ${postgreSQLConnectionObject.port}`
        );
      // console.log(client);
      return client;
    }
  };

  if (typeof exports !== 'undefined') {
    if (typeof module && module.exports !== 'undefined') {
      module.exports.db = await dbs[Database]();
    }
  }
})(process.env.DATABASE_TO_USE);
