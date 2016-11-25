var data01 = [20,20,30,40,5];
var data02 = [1,9,3,4,6];
var data03 = [0,5,3.5,14,57];
var data04 = ["name","city","education"];
var data05 = {name:"Jai",city:"kanpur",state:"U.P",education:"B.Sc"};
var functions = ["merge", "pairs", "permute", "shuffle", "ticks", "tickStep", "range", "transpose", "zip"];

var searchHelperFunctions = [
    {name:"merge",func:function(){ return d3.merge([data01,data02])},data:[data01,data02]}
    ,{name:"pairs",func:function(){return d3.pairs(data03)},data:[data03]}
    ,{name:"permute",func:function(){return d3.permute(data05,data04)},data:[data05,data04]}
    ,{name:"shuffle",func:function(){return d3.shuffle(data03)},data:[data03]}
    ,{name:"ticks",func:function(){return d3.ticks(0,100,10)},data:[0,100,10]}
    ,{name:"tickStep",func:function(){ return d3.tickStep(0,25,50)},data:[0,25,50]}
    ,{name:"range",func:function(){ return d3.range(0,10,2)},data:[0,10,0.1]}
    ,{name:"transpose",func:function(){ return d3.transpose(d3.zip(data01,data02,data03))},data:[data01,data02,data03]}
    ,{name:"zip",func:function(){ return d3.zip(data01,data02,data03)},data:[data01,data02,data03]}];


var displayMessage = function(){
    var valueAfterExecution = valueAccordingToFunction(this.value);
    d3.select('.result').text("For given data " +JSON.stringify(valueAfterExecution.data)+"  "+ this.value +" function will give " + JSON.stringify(valueAfterExecution.val) );
};

var valueAccordingToFunction = function(func){
    var value = {};
    searchHelperFunctions.forEach(function(each){
        if(each.name == func){
            value.val = each.func();
            value.data = each.data;
        }
    });
    return value;
};

d3.select("#interpolate")
    .selectAll("Button")
    .data(functions)
    .enter().append("Button")
    .on("click",displayMessage)
    .attr("value", function(d) {return d })
    .text(function(d) { return d });

