require('dotenv').config();
const { Pool } = require('pg');
const { performance } = require('perf_hooks');
const { memUsage: memoryUsage, queue } = require('./util');
const pgp = require('pg-promise')({
  capSQL: true
});
const seedModel = require('./generator');
const assert = require('assert');
const amount = process.env.PG_AMOUNT || 1000000;

const connectionObject = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD
};

// const db = new Pool(connectionObject);

// db.connect(async (err, client) => {
//   assert.equal(null, err);

//   let t0 = performance.now();
//   memUsage('Heap Before Inserts =>');

//   // Create Table if Doesn't Exist
//   let reviewTable = await client.query(createTableIfNotExists);
//   assert.equal(reviewTable.command, 'CREATE');

//   client.end();
//   console.log('Server Closing');

//   let t1 = performance.now();
//   memUsage('Heap After Close =>');

//   let seconds = Math.floor(((t1 - t0) / 1000) * 100) / 100;
//   console.log(`Call to seed mongoDB took ${seconds} seconds`);
// });

// const createTableIfNotExists = `
// CREATE TABLE IF NOT EXISTS reviews (
//   id SERIAL PRIMARY KEY,
//   item_id VARCHAR(255),
//   date DATE,
//   eggs SMALLINT,
//   verified BOOLEAN,
//   title TEXT NOT NULL,
//   pros VARCHAR(255),
//   cons VARCHAR(255),
//   body VARCHAR(255),
//   author VARCHAR(255)
// );
// `;

const db = pgp(connectionObject);

let populate = async () => {
  await db.none('DROP TABLE IF EXISTS reviews;');

  let t0 = performance.now();
  memoryUsage('Heap Before Inserts =>');

  // Create Table if Doesn't Exist
  await db.none(createTableIfNotExists);
  // assert.equal(null, err);

  let result = await insertData();
  assert.equal(null, result);
  memoryUsage('Heap After DB Seed =>');

  //  close server
  // console.log('Server Closing');
  memoryUsage('Heap After Close =>');
  let t1 = performance.now();
  let seconds = Math.floor(((t1 - t0) / 1000) * 100) / 100;
  console.log(`Call to seed mongoDB took ${seconds} seconds`);
};

let insertData = async () => {
  const data = await seedModel();
  memoryUsage('Heap After Obj Intantiation Seed =>');

  const insert = pgp.helpers.insert(data, cs);

  return await db.none(insert);
};

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
