const Message = require('./message-model');

const MessagesController = {
  index: function(req, res, next) {
    const limit = req.query.limit || 100;

    Message.find()
      .sort('-timestamp')
      .limit(limit)
      .then(messages => res.send({ messages }))
      .catch(err => next(err));
  },
  create: function(req, res, next) {
    const { text, author } = req.body;

    if (!text || !author) {
      res
        .status(400)
        .send({ msg: 'Missing parameters', err: 'Parameters text and author are required' });
      return;
    }

    Message.create({ text, author })
      .then(message => res.send({ msg: 'Message created', message }))
      .catch(err => next(err));
  },
  remove: function(req, res, next) {
    const { id } = req.body;

    if (!id) {
      res.status(400).send({ msg: 'Missing parameters', err: 'Parameter id is required' });
      return;
    }

    Message.deleteOne({ _id: id })
      .then(() => res.send({ msg: 'Message deleted' }))
      .catch(err => next(err));
  }
};

module.exports = MessagesController;
