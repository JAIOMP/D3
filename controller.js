var express = require('express');
var fs = require('fs');
var app = express();
var data  = JSON.parse(fs.readFileSync('./juice/juice_orders','UTF-8'));

app.use(express.static('./'))
app.get('/',function(req,res){
	res.redirect('/D3graph.html')
})
app.get('/give_statics',function(req,res) {
	console.log(data.constructor);
	res.send(data);
});

module.exports = app;