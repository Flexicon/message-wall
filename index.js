var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/', function (req, res, next) {
  res.json({msg: 'message-wall hooray!'})
})

app.listen(8080, function () {
  console.log('message-wall listening on port 80')
})