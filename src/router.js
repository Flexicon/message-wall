const express = require('express')
const router = express.Router()
const MessagesController = require('./messages-controller')

// Parser for post data
router.use(express.urlencoded({ extended: true }))
router.use(express.json())

router.get('/', (req, res) => {
  res.json({ msg: 'message-wall hooray!' })
})

// Messages routes
router
  .route('/messages')
  .get(MessagesController.index)
  .post(MessagesController.create)

router.delete('/messages/:id', MessagesController.remove)

module.exports = router
