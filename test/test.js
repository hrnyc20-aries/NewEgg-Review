const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('../database/reviewdb.db');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/index').server;
const app = require('../server/index').app;
const router = require('../server/index').router;

const should = chai.should();

chai.use(chaiHttp);

describe('Reviews', () => {
    after((done) => {
        server.close();
        done();
    });
    describe('/GET reviews', () => {
        it('should get all reviews', (done) => {
            chai.request(server)
            .get('/reviews')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.above(400);
            done();
            })
        })
    });
});