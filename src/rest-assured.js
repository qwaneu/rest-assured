// Express
var express = require('express');
var history = require('connect-history-api-fallback');
var morgan  = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

// Express App
var app = express();

// Env
var PORT     = process.env.PORT || 3002;
var NODE_ENV = process.env.NODE_ENV || 'development';

// Logging
app.use(morgan('dev'));

// Accept Content-Type
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORs
var whitelist = [
  'http://localhost:8080',
  'http://localhost:3001',
  'http://localhost:9867'
];
var corsOptions = {
  origin: true,
  credentials: true
};
app.use(cors(corsOptionsDelegate));

// Your middleware
app.use(history());

// fake server
// Match everything, and enable CORS, 
// so we can use it together with something else that serves assets or real API
var restassured = require('./REST_assured_api');
app.use('/*',cors(),restassured()); // TODO? enable switching CORS on or off to simulate misconfigured server

// README: Uncomment only if you're not using `npm run server`
// Only use in development
if (NODE_ENV === 'development') {
  console.log("TODO only run in development mode");
} else {
  console.log("TODO don't run in this mode")
}


// Start the server by listening on a port
app.listen(PORT, function() {
  console.log('Listen on http://localhost:' + PORT + ' in ' + NODE_ENV);
});


// helper function to whitelist domains for cors
function corsOptionsDelegate(req, callback){
  var corsOpts;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    // reflect (enable) the requested origin in the CORS response
    corsOpts = corsOptions;
  } else {
    // disable CORS for this request
    corsOpts = { origin: false };
  }
  // callback expects two parameters: error and options
  callback(null, corsOpts);
}
