const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;

// Apply CORS headers
app.use(cors());

// Routes
const Router = require('./router');
app.use('/', Router);

// Error handler
app.use(function(err, req, res) {
  // eslint-disable-next-line
  console.error(err);
  res.status(500).send({ msg: 'An unexpected error has occurred', err: err.message });
});

app.listen(port, function() {
  // eslint-disable-next-line
  console.log('message-wall listening on port ' + port);
});
