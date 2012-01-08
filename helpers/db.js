var mongoose = require('mongoose')
  , nconf = require('nconf');
	


exports.connect = function() {
	
  // Start the mongo connections
  mongoose.connect(nconf.get('mongodb').host
    , nconf.get('mongodb').database
    , nconf.get('mongodb').port);
}