var http = require('http');
var controller = require('./controller');
var server = http.createServer(controller);
server.listen(8000);
console.log("server started");
