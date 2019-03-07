const express = require('express');
const requests = require('./requestHandler');
const seed = require('../database/mongoSeed');
const dbToUSe = process.env.DATABASE_TO_USE || 'mongo';

module.exports = (client) => {
  const router = express.Router();

  router.get('/reviews/:item_id', (req, res) => {
    requests['GET'][dbToUSe](req, res, client);
  });

  router.post('/reviews', (req, res) => {
    requests['POST'][dbToUSe](req, res, client);
  });

  router.patch('/reviews/:review_id', (req, res, client) => {
    requests['PATCH'][dbToUSe](req, res, client);
  });

  // router.put('/db/populate/seed/true/:amount', seed);

  return router;
};
