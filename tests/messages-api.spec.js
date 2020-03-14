// check for mongo url environment variable
if (!process.env.MONGODB_URL) {
  process.env.MONGODB_URL = 'mongodb://mongodb:27017/testwall'
  delete process.env.MONGODB_SSL
  delete process.env.MONGODB_REPLICA_SET
}

const Message = require('../src/message-model')
const chai = require('chai')
const chaiHttp = require('chai-http')

const { app, db, server } = require('../src')

chai.should()
chai.use(chaiHttp)

describe('Messages API', function() {
  before(async () => {
    await Message.deleteMany({})
  })

  describe('/messages', () => {
    describe('GET', () => {
      beforeEach(async () => {
        const messages = [
          { text: 'This is a new message!', author: 'Dude guy' },
          { text: 'Another test message', author: 'Derp' },
        ]
        await Message.create(messages)
      })

      after(async () => {
        await Message.deleteMany({})
      })

      it('it should GET json with a messages array', async () => {
        const res = await chai.request(app).get('/messages')

        res.should.have.status(200)
        res.body.should.be.an('array').with.lengthOf(2)

        res.body[0].should.property('text').that.is.eql('Another test message')
        res.body[0].should.property('author').that.is.eql('Derp')

        res.body[1].should.property('author').that.is.eql('Dude guy')
        res.body[1].should.property('text').that.is.eql('This is a new message!')
      })

      it('it should allow limiting results', async () => {
        const res = await chai.request(app).get('/messages?limit=1')

        res.should.have.status(200)
        res.body.should.be.an('array').with.lengthOf(1)
      })
    })

    describe('POST', () => {
      it('it should POST a new message', async () => {
        const message = { text: 'This is a new message!', author: 'JK Rowling' }
        const res = await chai
          .request(app)
          .post('/messages')
          .send(message)

        res.should.have.status(201)
        res.body.should.be.an('object')
        res.body.should.have.property('_id')
        res.body.should.have.property('author')
        res.body.should.have.property('text')
        res.body.author.should.be.eql(message.author)
        res.body.text.should.be.eql(message.text)
      })

      it('it should not POST a message without an author', async () => {
        const message = { text: 'This is a new message!' }
        const res = await chai
          .request(app)
          .post('/messages')
          .send(message)

        res.should.have.status(422)
        res.body.should.be.an('object')
        res.body.should.have.property('msg').eql('Missing parameters')
      })

      it('it should not POST a message without text content', async () => {
        const message = { author: 'Stephen' }
        const res = await chai
          .request(app)
          .post('/messages')
          .send(message)

        res.should.have.status(422)
        res.body.should.be.an('object')
        res.body.should.have.property('msg').eql('Missing parameters')
      })
    })

    describe('DELETE', () => {
      it('it should DELETE a message', async () => {
        const { body: testMessage } = await chai
          .request(app)
          .post('/messages')
          .send({ text: 'This is a new message!', author: 'JK Rowling' })

        const res = await chai
          .request(app)
          .del(`/messages/${testMessage._id}`)
          .send()

        res.should.have.status(204)
      })

      it('it should fail to DELETE a nonexistent message', async () => {
        const nonExistingID = '5b5ec92f08b2681d7e9a82f9'
        const res = await chai
          .request(app)
          .del(`/messages/${nonExistingID}`)
          .send()

        res.should.have.status(404)
        res.body.should.have.property('msg').eql('Message not found')
      })
    })
  })

  after(() => {
    // Close up server and DB connection after all tests
    db.connection.close()
    server.close()
  })
})
