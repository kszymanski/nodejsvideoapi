const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
var should = chai.should();

const server = require('../../src')({Environment: 'Test'});

describe('videos', () => {
  describe('GET', () => {
    it('should return empty list', done => {
      chai.request(server)
            .get('/videos')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.to.be.a('array');
                res.body.should.to.be.empty;
              done();
            });
    });
  });
});