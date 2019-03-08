let path = require('path');

// Container for all the environments
let config = {};

config.dbPath = path.resolve(__dirname, '../database/reviewdb.db');
config.reviews = `localhost:${config.PORT}`;
config.DBHOST = 'localhost';

// Staging (default) environment
config.development = {
  reviews: `localhost:${config.PORT}`,
  mongo: `${config.DBHOST}:${process.env.DBPORT}`,
  DBNAME: process.env.DBNAME,
  DBPORT: process.env.DBPORT || 27000
};

// Production environment
config.production = {
  reviews: `localhost:${config.PORT}`,
  mongo: `${process.env.DBHOST}:${config.PORT}`,
  DBNAME: process.env.DBNAME,
  DBPORT: process.env.DBPORT || 27000
};

// Determine which env should be passed
let environment =
  typeof process.env.NODE_ENV === 'string'
    ? process.env.NODE_ENV.toLowerCase()
    : '';

module.exports =
  typeof config[environment] === 'object'
    ? config[environment]
    : config.DEVELOPMENT;
