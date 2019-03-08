require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const config = require('../config');
// const pgp = require('pg-promise')({ capSQL: true });

// const postgreSQLConnectionObject = {
//   host: process.env.PGHOST,
//   port: process.env.PGPORT,
//   database: process.env.PGDATABASE,
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD
// };

const mongoURL = `mongodb://${config.mongo}`;

(async (Database) => {
  const dbs = {
    mongo: async () => {
      try {
        const client = await MongoClient.connect(mongoURL, {
          useNewUrlParser: true
        });

        const db = await client.db(config.DBNAME);
        if (db) console.log(`Connected to Database on port ${config.DBPORT}`);

        return db;
      } catch (error) {
        console.log('Could Not Connect to DB: Trying Again');
        dbs.mongo();
      }
    },

    postgre: async () => {
      let client = await pgp(postgreSQLConnectionObject);
      if (client)
        console.log(
          `Connected to Database on port ${postgreSQLConnectionObject.port}`
        );
      return client;
    }
  };

  if (typeof exports !== 'undefined') {
    if (typeof module && module.exports !== 'undefined') {
      module.exports.db = await dbs[Database]();
    }
  }
})(process.env.DATABASE_TO_USE);
