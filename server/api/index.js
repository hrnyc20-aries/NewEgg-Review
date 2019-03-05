const express = require('express');
const requests = require('./requestHandler');
const seed = require('../database/mongoSeed');
const cluster = require('../database/cluster');
const dbToUSe = process.env.DATABASE_TO_USE || 'mongo';

module.exports = (client) => {
  const router = express.Router();

  router.get('/reviews/:item_id', (req, res) => {
    requests['GET'][dbToUSe](req, res);
  });

  router.post('/reviews', (req, res) => {
    requests['POST'][dbToUSe](req, res);
  });

  router.patch('/reviews/:review_id', (req, res) => {
    requests['PATCH'][dbToUSe](req, res);
  });

  router.put('/db/populate/seed/true/:limit', async (req, res) => {
    // await seed(db, reviews);
    // res.send({ Express: 'Seeded' });
    let { limit } = req.params;

    cluster(limit, res, (res) => {
      res.send({ EXPRESS: 'Made it' });
    });
  });

  return router;
};
