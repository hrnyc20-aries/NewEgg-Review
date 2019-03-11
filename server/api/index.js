const path = require('path');
const express = require('express');
const requests = require('./requestHandler');
const seed = require('../database/mongoSeed');
const dbToUSe = process.env.DATABASE_TO_USE || 'mongo';

module.exports = (client) => {
  const router = express.Router();

  router.get('/loaderio-e9089f08cb74e7859cecd2a5ed563632.txt', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname,
        '../../loaderio-e9089f08cb74e7859cecd2a5ed563632.txt'
      )
    );
  });

  router.get('/reviews/:item_id', (req, res) => {
    requests['GET'][dbToUSe](req, res, client);
  });

  router.post('/reviews', (req, res) => {
    requests['POST'][dbToUSe](req, res, client);
  });

  router.patch('/reviews/:review_id', (req, res) => {
    requests['PATCH'][dbToUSe](req, res, client);
  });

  router.put('/db/populate/seed/true/:amount', async (req, res) => {
    let { amount } = req.params;
    if (+amount <= 10) {
      res.send({
        Mongo: 'Need to provide a value greater than or equal to 10'
      });
    } else {
      await seed(client, amount);
      res.send({ 'Mongo Seed': 'Complete' });
    }
  });

  return router;
};
