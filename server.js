
var everyauth = require('everyauth'),
  express = require('express'),
  mongooseAuth = require('mongoose-auth'),
  nconf = require('nconf'),
  io = require('socket.io'),
  db = require('./helpers/db');

// Setup nconf to use (in-order), and item defined 
// in 4 will be overridden by the same definition in 1, 2 or 3 
//  1. Command-line arguments
//  2. Environment variables
//  3. Values in `config.json`
//  4. Default values   
nconf.argv().env();
nconf.file({
  file : 'config/config-' + nconf.get('NODE_ENV') + '.json'
});
nconf.defaults({
  'port': '80'
});

console.log(nconf.get('testVar'));

// Connect to the DB
db.connect();

// Set up the models
var model = require('./models');

// Setup and configure the application
var app = express.createServer(
  express.bodyParser(),
  express.static(__dirname + "/public"),
  express.cookieParser(),
  express.session({
    secret : 'esoognom'
  }), 
  mongooseAuth.middleware()
);

// Config for every environment
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  mongooseAuth.helpExpress(app);
});

// Config for dev and test environments
app.configure('development', 'test', function() {
  everyauth.debug = true;
  app.use(express.errorHandler({
    dumpExceptions : true,
    showStack : true
  }));
});

// Config for production environments
app.configure('production', function() {
  app.use(express.errorHandler());
});

// Setup the controllers (routes)
require('./controllers').init(app);

// Start the server
app.listen(nconf.get('port'));

//Setup Socket.IO
var io = io.listen(app);
io.sockets.on('connection', function(socket) {
  console.log('Client Connected');
  socket.on('message', function(message) {
    socket.broadcast.send(message);
    socket.send(message);
  });
  socket.on('disconnect', function() {
    console.log('Client Disconnected.');
  });
});

console.log('Listening on http://localhost:' + nconf.get('port'));
