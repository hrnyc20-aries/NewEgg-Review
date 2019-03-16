// const client = require('../database');
const { createClient } = require('redis');
const { ObjectID } = require('mongodb');
const redis = createClient({ port: 6379 });
const { Readable } = require('stream');

module.exports = {
  GET: {
    mongo: async (req, res, client) => {
      const { item_id } = req.params;

      redis.get(item_id, (err, reply) => {
        if (!res.headersSent) {
          if (err) throw err;

          if (reply) return res.send(JSON.parse(reply));
        }
      });

      client.db.find({ item_id: +item_id }).toArray((err, docs) => {
        if (!res.headersSent) {
          if (err) {
            res.status(400).send(err);
          } else {
            res.send(docs);
            redis.set(item_id, JSON.stringify(docs));
          }
        }
      });
    },

    postgre: (req, res, client) => {
      const { item_id } = req.params;

      let getItemsReviews = 'SELECT * FROM reviews WHERE item_id = ${item_id}';
      client.db
        .any(getItemsReviews, {
          item_id: item_id
        })
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          if (err) {
            res.status(400).send(err);
          }
        });
    }
  },

  POST: {
    mongo: async (req, res, client) => {
      const reviews = await client.db.collection('reviews');

      return reviews.insertMany([req.body], (err, { result }) => {
        // return client.db.insertMany([req.body], (err, { result }) => {
        !err
          ? res.send({ result, review: req.body })
          : res.status(400).send(err);
      });
    },

    postgre: (req, res, client) => {
      let {
        item_id,
        title,
        pros,
        cons,
        body,
        verified,
        date,
        eggs,
        author
      } = req.body;

      let postItemReview =
        'INSERT INTO reviews (item_id, title, pros, cons, body, verified, date, eggs, author) VALUES (${item_id}, ${title}, ${pros}, ${cons}, ${body}, ${verified}, ${date}, ${eggs}, ${author})';

      client.db
        .query(postItemReview, {
          item_id: item_id,
          title: title,
          pros: pros,
          cons: cons,
          body: body,
          verified: verified,
          date: date,
          eggs: eggs,
          author: author
        })
        .then((result) => {
          res.send({ result });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  },

  PATCH: {
    mongo: async (req, res, client) => {
      const { review_id } = req.params;

      const reviews = await client.db.collection('reviews');

      return reviews.findOneAndUpdate(
        // return client.db.findOneAndUpdate(
        { _id: ObjectID(review_id) },
        { $set: req.body },
        { returnOriginal: false },
        (err, result) => {
          !err ? res.send(result) : res.status(400).send(err);
        }
      );
    },

    postgre: (req, res, client) => {
      let { id, helpful } = req.body;
      let field = (helpful && 'helpful') || 'not_helpful';

      let updateItemReview = `UPDATE reviews SET ${field} = ${field} + 1 WHERE review_id = ${id}`;

      client.db
        .any(updateItemReview)
        .then((result) => {
          res.send({ result });
        })
        .catch((err) => {
          res.status(400).send(err);
        });
    }
  }
};
