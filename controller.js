var express = require('express');
var fs = require('fs');
var app = express();
var data  = JSON.parse(fs.readFileSync('./juice/juice_orders','UTF-8'));
var bus_data = JSON.parse(fs.readFileSync('./juice/all_request_data.json','UTF-8'));
app.use(express.static('./'))
app.get('/',function(req,res){
	res.redirect('/D3graph.html')
})
app.get('/give_statics',function(req,res) {
	res.send(data);
});
app.get('/give_bus_data',function(req,res){
	res.send(bus_data);
})
app.get('/give_bus_data_for_month',function(req,res){
	res.send(bus_data);
});

module.exports = app;