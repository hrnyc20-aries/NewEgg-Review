const { performance } = require('perf_hooks');
const { memUsed, queue } = require('./util');
const seedModel = require('./generator');
const assert = require('assert');
const amount = process.env.SEED_AMOUNT || 1000;

// Use connect method to connect to the server
// MongoClient.then(async (err, client) => {

const insertDocuments = async (db) => {
  console.log('MONGO RECORDS TO INSERT =>', amount);

  // Get the documents collection
  const collection = db.collection('reviews');

  // Generate a Doc
  let docs = await seedModel();
  // memUsed('Heap After Obj Intantiation Seed =>');

  // collection.bulkWrite(operation, {})
  docs = await collection.insertMany(docs);
  // memUsed('Heap After DB Seed =>');

  // assert.notEqual(docs, null);
  // assert.equal(amount, docs.result.n);
  // assert.equal(amount, docs.ops.length);
  console.log(`Inserted ${amount / 10} documents into the collection`);

  return docs;
};

module.exports = async (client, collection) => {
  let t0 = performance.now();
  // memUsed('Heap Before Inserts =>');
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  await queue(10, db, insertDocuments);
  console.log('Seed Complete: 10M Records added');

  let t1 = performance.now();
  // memUsed('Heap After Close =>');

  let seconds = Math.floor(((t1 - t0) / 1000) * 100) / 100;
  console.log(`Call to seed mongoDB took ${seconds} seconds`);

  console.log('Starting Index');
  // const collection = db.collection('reviews');
  await collection.createIndex('item_id');
  console.log('Created Index');
};
