let path = require('path');

// Container for all the environments
let config = {};

config.dbPath = path.resolve(__dirname, '../database/reviewdb.db');
config.PORT = process.env.PORT || 3009;
config.reviews = `localhost:${config.PORT}`;

// Staging (default) environment
config.development = {
  reviews: `localhost:${config.PORT}`
};

// Production environment
config.production = {
  reviews: `localhost${config.PORT}`
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
