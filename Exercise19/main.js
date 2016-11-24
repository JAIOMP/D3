var data = [20,20,30,40,50,5,70,80,90];
const VALUE = 75;
var functions = ["scan", "bisect", "bisector", "ascending", "descending"];

var bisector = d3.bisector(function(d){return d}).right;

var searchHelperFunctions = [
    {name:"scan",func:function(){ return d3.scan(data,function(a,b){return b-a;})}}
    ,{name:"bisect",func:function(){return d3.bisectLeft(data,VALUE)}}
    ,{name:"bisector",func:function(){return bisector(data,VALUE)}}
    ,{name:"ascending",func:function(){return data.sort(d3.ascending)}}
    ,{name:"descending",func:function(){return data.sort(d3.descending)}}];


var displayMessage = function(){
    var valueAfterExecution = valueAccordingToFunction(this.value);
    d3.select('.result').text("For data ("+data+") "+ this.value +" function will give answer "+valueAfterExecution)
};


var valueAccordingToFunction = function(func){
    var value;
    searchHelperFunctions.forEach(function(each){
        if(each.name == func)
            value = each.func();
    });
    return value;
};

var div = d3.select('.container')
    .selectAll("p")
    .data(data);

div.enter()
    .append("p")
    .text(function(d){ return d + ","});

d3.select("#interpolate")
    .selectAll("Button")
    .data(functions)
    .enter().append("Button")
    .on("click",displayMessage)
    .attr("value", function(d) {return d })
    .text(function(d) { return d });

