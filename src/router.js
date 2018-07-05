const express = require('express');
const router = express.Router();
const MessagesController = require('./messages-controller');

// Parser for post data
router.use(express.urlencoded());
router.use(express.json());

router.get('/', (req, res) => {
  res.json({ msg: 'message-wall hooray!' });
});

// Messages routes
router
  .route('/messages')
  .get(MessagesController.index)
  .post(MessagesController.create)
  .delete(MessagesController.remove);

module.exports = router;
