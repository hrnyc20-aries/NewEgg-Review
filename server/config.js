let path = require('path');

// Container for all the environments
let config = {};

config.dbPath = path.resolve(__dirname, '../database/reviewdb.db');
config.reviews = `localhost:${config.PORT}`;
config.DBHOST = process.env[`DB_HOST_${process.env.NODE_ENV.toUpperCase()}`];
config.DBPORT = process.env[`DB_PORT_${process.env.NODE_ENV.toUpperCase()}`];

// Staging (default) environment
config.development = {
  reviews: `localhost:${config.PORT}`,
  mongo: `${config.DBHOST}:${config.DBPORT}`,
  DBNAME: process.env.DBNAME,
  DBPORT: config.DBPORT || 27000
};

// Production environment
config.production = {
  reviews: `localhost:${config.PORT}`,
  MONGO: `${process.env.DBHOST}:${config.DBPORT}`,
  DBNAME: process.env.DBNAME,
  DBPORT: config.DBPORT || 27000
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
