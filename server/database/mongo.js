const { performance } = require('perf_hooks');
const { memUsed, queue } = require('./util');
const MongoClient = require('mongodb').MongoClient;
const seedModel = require('./generator');
const assert = require('assert');
const amount = process.env.SEED_AMOUNT || 1000;

// Connection URL
const url = 'mongodb://localhost:27000';

// Database Name
const dbName = 'newegg';

console.log('MONGO RECORDS TO INSERT =>', amount);

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true }, async (err, client) => {
  let t0 = performance.now();
  // memUsed('Heap Before Inserts =>');
  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  await queue(10, db, insertDocuments);

  client.close();
  console.log('Server Closing');

  let t1 = performance.now();
  // memUsed('Heap After Close =>');

  let seconds = Math.floor(((t1 - t0) / 1000) * 100) / 100;
  console.log(`Call to seed mongoDB took ${seconds} seconds`);

  console.log('Starting Index');
  const collection = db.collection('reviews');
  await collection.createIndex('item_id');
  console.log('End Index');
  await findOneDocument(db, (data, startQuery) => {
    const endQuery = process.now();
    console.log(data);

    let seconds = Math.floor(((endQuery - startQuery) / 1000) * 100) / 100;
    console.log(`Call to Query mongoDB took ${seconds} seconds`);
  });
});

const insertDocuments = async (db) => {
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

const findOneDocument = (db, callback) => {
  // Get the documents collection
  const collection = db.collection('reviews');

  const t0 = process.now();
  // Find some documents
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    console.log('Found the following records');
    console.log(docs);
    callback(docs, t0);
  });
};

const setReviewsCollection = (db) => {
  const collection = db.collection('reviews');

  return collection;
};

const createItemIndex = (db) => {
  const collection = db.collection('reviews');
};
