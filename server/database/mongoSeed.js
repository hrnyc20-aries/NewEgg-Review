const { performance } = require('perf_hooks');
const { memUsage, queue } = require('./util');
const seedModel = require('./generator');
const assert = require('assert');
// const amount = process.env.SEED_AMOUNT || 1000;

// Use connect method to connect to the server
// MongoClient.then(async (err, client) => {

const insertDocuments = async (collection, amount) => {
  console.log('MONGO RECORDS TO INSERT =>', amount);

  // Generate a Doc
  let docs = await seedModel(amount);
  memUsage('Heap After Obj Intantiation Seed =>');

  docs = await collection.insertMany(docs);
  memUsage('Heap After DB Seed =>');

  // assert.notEqual(docs, null);
  // assert.equal(amount, docs.result.n);
  // assert.equal(amount, docs.ops.length);
  console.log(`Inserted ${amount} documents into the collection`);
};

module.exports = async (client, total) => {
  try {
    await client.db.collection('reviews').drop();
  } catch (error) {
    console.log('Collection Dropped');
  } finally {
    let t0 = performance.now();
    memUsage('Heap Before Inserts =>');

    const reviews = await client.db.collection('reviews');
    console.log('Collection Reviews has been instantiated');

    await queue(reviews, total, insertDocuments);
    console.log('Seed Complete: 10M Records added');

    let t1 = performance.now();
    memUsage('Heap After Close =>');

    let seconds = Math.floor(((t1 - t0) / 1000) * 100) / 100;
    console.log(`Call to seed mongoDB took ${seconds} seconds`);

    memUsage('Starting Index =>');
    await reviews.createIndex('item_id');
    memUsage('Created Index =>');
  }
};
