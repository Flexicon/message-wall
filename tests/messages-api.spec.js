// check for mongo url environment variable
process.env.MONGODB_URL = process.env.MONGODB_URL || 'mongodb://mongodb:27017/testwall';

const Message = require('../src/message-model');
const chai = require('chai');
const chaiHttp = require('chai-http');

const { app, mongo, server } = require('../src');

chai.should();
chai.use(chaiHttp);

describe('Messages API', function() {
  before(done => {
    Message.remove({}, err => {
      done();
    });
  });

  afterEach(done => {
    Message.remove({}, err => {
      done();
    });
  });

  describe('/messages', () => {
    describe('GET', () => {
      beforeEach(done => {
        const messages = [
          { text: 'This is a new message!', author: 'Dude guy' },
          { text: 'Another test message', author: 'Derp' }
        ];
        Message.create(messages).then(() => {
          done();
        });
      });

      it('it should GET json with a messages array', done => {
        chai
          .request(app)
          .get('/messages')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.messages.length.should.be.above(0);
            done();
          });
      });

      it('it should allow limiting results', done => {
        chai
          .request(app)
          .get('/messages?limit=1')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.messages.length.should.be.equal(1);
            done();
          });
      });
    });

    describe('POST', () => {
      it('it should POST a new message', done => {
        const message = { text: 'This is a new message!', author: 'JK Rowling' };
        chai
          .request(app)
          .post('/messages')
          .send(message)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('msg').eql('Message created');
            res.body.message.should.have.property('_id');
            res.body.message.should.have.property('author');
            res.body.message.should.have.property('text');
            res.body.message.author.should.be.eql(message.author);
            res.body.message.text.should.be.eql(message.text);
            done();
          });
      });

      it('it should not POST a message without an author', done => {
        const message = { text: 'This is a new message!' };
        chai
          .request(app)
          .post('/messages')
          .send(message)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('msg').eql('Missing parameters');
            done();
          });
      });

      it('it should not POST a message without text content', done => {
        const message = { author: 'Stephen' };
        chai
          .request(app)
          .post('/messages')
          .send(message)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('msg').eql('Missing parameters');
            done();
          });
      });
    });
  });

  after(() => {
    // Close up server and DB connection after all tests
    mongo.connection.close();
    server.close();
  });
});
