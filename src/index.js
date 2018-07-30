const express = require('express');
const cors = require('cors');
const chalk = require('chalk');
const app = express();
const port = process.env.PORT || 8080;

// Setup database
const mongo = require('./mongo');

// Apply CORS headers
app.use(cors());

// Routes
const Router = require('./router');
app.use('/', Router);

// Error handler
app.use(function(err, req, res, next) {
  // eslint-disable-next-line
  console.error(chalk.red('An error occurred: '), err);
  res.status(500).send({ msg: 'An unexpected error has occurred', err: err.message });
});

const server = app.listen(port, function() {
  // eslint-disable-next-line
  console.log('message-wall listening on port ' + port);
});

module.exports = {
  app,
  server,
  mongo
};
