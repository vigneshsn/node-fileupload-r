/**
 * The main entry point
 */
var express = require('express');
var app = express();
var routes = require('./routes');
var http = require('http');
var path = require('path');
var domain = require('domain');
var d = domain.create();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

//handle uncaught exception
//reference https://shapeshed.com/uncaught-exceptions-in-node/
d.on('error', function(err) {
    console.error(err);
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', routes.uploadAndValidate);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
