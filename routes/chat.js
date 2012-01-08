var util = require('util')
	, model = require('../models/model');

exports.init = function(app) {
	app.all('/user/chat', chat);
}

function chat(req, res) {
	if(!req.loggedIn) { 
		res.redirect('/');
		return;
	}
	res.render('user/chat', {
		title : 'User Chat'
	});
};