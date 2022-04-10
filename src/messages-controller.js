const Message = require('./message-model')

const serializeMessage = ({ _id: id, text, author }) => ({ id, text, author })

const MessagesController = {
  index: async (req, res, next) => {
    const limit = req.query.limit || 100

    try {
      const messages = await Message.find()
        .sort('-timestamp')
        .limit(+limit)
        .lean()

      res.send(messages.map(serializeMessage))
    } catch (err) {
      next(err)
    }
  },

  create: async (req, res, next) => {
    const { text, author } = req.body

    if (!text || !author) {
      res
        .status(422)
        .send({ msg: 'Missing parameters', err: 'Parameters text and author are required' })
      return
    }

    try {
      const message = await Message.create({ text, author })
      res.status(201).send(serializeMessage(message))
    } catch (err) {
      next(err)
    }
  },

  remove: async (req, res, next) => {
    const { id } = req.params

    if (!id) {
      res.status(422).send({ msg: 'Missing parameters', err: 'Parameter id is required' })
      return
    }

    try {
      const found = await Message.findByIdAndRemove(id)
      if (found) {
        res.status(204).send()
      } else {
        res.status(404).send({ msg: 'Message not found' })
      }
    } catch (err) {
      next(err)
    }
  },
}

module.exports = MessagesController
