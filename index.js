const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8080;

app.use(cors())

app.get('/', function (req, res, next) {
  res.json({msg: 'message-wall hooray!'})
})

app.listen(port, function () {
  console.log('message-wall listening on port ' + port)
})