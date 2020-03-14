const express = require('express')
const cors = require('cors')
const chalk = require('chalk')

const db = require('./mongo')
const Router = require('./router')

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use('/', Router)

// Error handler
app.use(function(err, req, res, next) {
  console.error(chalk.red('An error occurred: '), err)
  res.status(500).send({ msg: 'An unexpected error has occurred', err: err.message })
})

const server = app.listen(port, function() {
  console.log('message-wall listening on port ' + port)
})

module.exports = {
  app,
  server,
  db,
}
