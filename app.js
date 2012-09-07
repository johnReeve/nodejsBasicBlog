
/**
 * Module dependencies.
 */

var exp = require('express');
var app = exp();

app.root = __dirname;
app.portName = 8080

global.host = 'localhost';

require('./app/config')(app, exp);
require('./app/server/router')(app);

app.listen(app.portName, function(){
	console.log("Express server listening on port %s:%d in %s mode", global.host, app.portName, app.settings.env);
});
