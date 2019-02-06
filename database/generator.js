const faker = require('faker');

module.exports = {
    author: faker.name.findName(),
    body: faker.lorem.paragraph(),
    pros: faker.lorem.sentence(),
    cons: faker.lorem.sentence(),
    title: faker.lorem.words(),
    date: faker.date.recent(),
    verified: () => {
        let value = Math.floor(Math.random() * 2)
        if (value === 0) {
            return 'F'
        }
        return 'T'
        },
    item_id: Math.floor(Math.random() * 100),
    eggs: Math.floor(Math.random() * (6));
}