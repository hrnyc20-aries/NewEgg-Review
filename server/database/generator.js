const faker = require('faker');
let amount = process.env.MONGO_AMOUNT || 1000000;

let seedModel = () => {
  let seed = Object.create(staticObj);

  seed.item_id = Math.floor(Math.random() * amount) + 1;
  seed.date = JSON.stringify(faker.date.recent(10000)).replace(/"/g, '');
  seed.eggs = Math.floor(Math.random() * 5) + 1;
  seed.verified = (() => {
    let value = Math.floor(Math.random() * 2);
    if (value === 0) return 'F';
    return 'T';
  })();

  return seed;
};

let staticObj = {
  title: faker.lorem.words(),
  pros: faker.lorem.sentence(),
  cons: faker.lorem.sentence(),
  body: faker.lorem.paragraph(),
  author: faker.name.findName()
};

module.exports = () => {
  return new Promise((resolve, reject) => {
    let output = [];

    while (output.length < amount) {
      output.push(seedModel());
    }

    resolve(output);
  });
};
