
var everyauth = require('everyauth')
  , express = require('express')
  , mongoose = require('mongoose')
  , mongooseAuth = require('mongoose-auth')
  , nconf = require('nconf')
	, io = require('socket.io')
	, routes = require('./routes/routes')
	, db = require('./helpers/db')
  , Promise = everyauth.Promise;

// Setup nconf to use (in-order): 
//   1. Command-line arguments
//   2. Environment variables
//   3. Values in `config.json` 
nconf.argv().env();
nconf.file({ file: 'config/config-' + nconf.get('NODE_ENV') + '.json' });

// Connect to the DB
db.connect();

// Set up the models
var model = require('./models/model');

// Setup and configure the application
var app = express.createServer(
    express.bodyParser()
  , express.static(__dirname + "/public")
  , express.cookieParser()
  , express.session({ secret: 'esoognom'})
  , mongooseAuth.middleware()
);

// Config for every environment
app.configure( function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  mongooseAuth.helpExpress(app);
});

// Config for dev and test environments
app.configure('development', 'test', function(){
  everyauth.debug = true;
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// Config for production environments
app.configure('production', function(){
  app.use(express.errorHandler());
});

// Setup the routes
routes.init(app);

// Star the server
app.listen(3000);

//Setup Socket.IO
var io = io.listen(app);
io.on('connection', function(client){
  console.log('Client Connected');
  client.on('message', function(message){
    client.broadcast(message);
    client.send(message);
  });
  client.on('disconnect', function(){
    console.log('Client Disconnected.');
  });
});

console.log('Listening on http://localhost:' + nconf.get('port') );
