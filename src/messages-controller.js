const Message = require('./message-model');

const MessagesController = {
  index: (req, res, next) => {
    const limit = req.query.limit || 100;

    Message.find()
      .sort('-timestamp')
      .limit(+limit)
      .lean()
      .then(messages => res.send({ messages }))
      .catch(err => next(err));
  },
  create: (req, res, next) => {
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
  remove: (req, res, next) => {
    const { id } = req.body;

    if (!id) {
      res.status(400).send({ msg: 'Missing parameters', err: 'Parameter id is required' });
      return;
    }

    Message.findByIdAndRemove({ _id: id })
      .then(msg => {
        if (msg) {
          res.send({ msg: 'Message deleted' });
        } else {
          res.status(404).send({ msg: 'Message not found' });
        }
      })
      .catch(err => next(err));
  }
};

module.exports = MessagesController;
