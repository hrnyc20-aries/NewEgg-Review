const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const seedModel = require('./generator');
const { performance } = require('perf_hooks');

// Connection URL
const url = 'mongodb://localhost:27000';

// Database Name
const dbName = 'newegg';

console.log('MONGO RECORDS TO INSERT =>', process.env.MONGO_AMOUNT);

// Use connect method to connect to the server
MongoClient.connect(url, { useNewUrlParser: true }, async (err, client) => {
  let t0 = performance.now();

  memUsed('Heap Before Inserts =>');

  assert.equal(null, err);
  console.log('Connected successfully to server');

  const db = client.db(dbName);

  let result = await insertDocuments(db);

  client.close();
  console.log('Server Closing');

  let t1 = performance.now();
  memUsed('Heap After Close =>');

  let seconds = Math.floor(((t1 - t0) / 1000) * 100) / 100;
  console.log(`Call to seed mongoDB took ${seconds} seconds`);
});

const insertDocuments = async (db) => {
  // Get the documents collection
  const collection = db.collection('reviews');

  // Generate a Doc
  let docs = await seedModel();
  memUsed('Heap After Obj Intantiation Seed =>');

  // collection.bulkWrite(operation, {})
  docs = await collection.insertMany(docs);
  memUsed('Heap After DB Seed =>');

  assert.notEqual(docs, null);
  assert.equal(process.env.MONGO_AMOUNT, docs.result.n);
  assert.equal(process.env.MONGO_AMOUNT, docs.ops.length);
  console.log(
    `Inserted ${process.env.MONGO_AMOUNT} documents into the collection`
  );

  return docs;
};

const findOneDocument = (db, callback) => {
  // Get the documents collection
  const collection = db.collection('reviews');
  // Find some documents
  collection.find({}).toArray((err, docs) => {
    assert.equal(err, null);
    console.log('Found the following records');
    console.log(docs);
    callback(docs);
  });
};

let memUsed = (message) => {
  const used = process.memoryUsage();
  for (let key in used) {
    console.log(
      message,
      `${key} ${Math.round((used[key] / 1024 / 1024) * 100) / 100} MB`
    );
  }
};
