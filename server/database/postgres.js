require('dotenv').config();
const { performance } = require('perf_hooks');
// NOTE: queue will be used when trying to add up to 10M records into DB
const { memUsage: memoryUsage, queue } = require('./util');
const pgp = require('pg-promise')({
  capSQL: true
});
const seedModel = require('./generator');
const assert = require('assert');

// NOTE: Amount is used with queue
const amount = process.env.PG_AMOUNT || 1000;

const connectionObject = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
};

// Establish a PostgreSQL DB connection
const db = pgp(connectionObject);

let populate = async () => {
  await db.none('DROP TABLE IF EXISTS reviews;');

  // Start Timer NOTE: this can be removed when the DB script has been
  // Optimized.  The memoryUsage function can also be removed by then.
  let t0 = performance.now();
  memoryUsage('Heap Before Inserts =>');

  // Create Table if Doesn't Exist
  await db.none(createTableIfNotExists);
  // assert.equal(null, err);

  let result = await insertData();
  assert.equal(null, result);

  memoryUsage('Heap After DB Seed =>');

  // TODO: Create a close connection
  memoryUsage('Heap After Close =>');

  // Stop Timer && Log
  let t1 = performance.now();
  let seconds = Math.floor(((t1 - t0) / 1000) * 100) / 100;
  console.log(`Call to seed mongoDB took ${seconds} seconds`);
};

// Fetch Data and Insert Into DB
let insertData = async () => {
  const data = await seedModel();
  memoryUsage('Heap After Obj Intantiation Seed =>');

  const insert = pgp.helpers.insert(data, cs);

  return await db.none(insert);
};

// Table Creation Script
const createTableIfNotExists = `
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  item_id VARCHAR(255),
  date DATE,
  eggs SMALLINT,
  verified BOOLEAN,
  title TEXT NOT NULL,
  pros VARCHAR(255),
  cons VARCHAR(255),
  body TEXT,
  author VARCHAR(255)
);
`;

// NOTE: PG-Promise Column Set for Bulk Writes
const cs = new pgp.helpers.ColumnSet(
  [
    'item_id',
    'date',
    'eggs',
    'verified',
    'title',
    'pros',
    'cons',
    'body',
    'author'
  ],
  { table: 'reviews' }
);

populate();
