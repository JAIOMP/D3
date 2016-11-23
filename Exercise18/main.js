var data = [10,20,30,40,50,60,70,80,90];
var functions = ['min', 'max', 'sum', 'mean', 'median', 'quantile', 'variance', 'deviation'];
var changeColor = function(){
    var div = document.querySelector("." + this.value);
    div.style.borderWidth = 3 + "px";
    div.style.borderColor = "red";
    setTimeout(function(){
        div.style.borderWidth = 1 + "px";
        div.style.borderColor = "white";
    },3000);
};

var bar = d3.select(".container").selectAll("div").data(functions);
bar.enter()
    .append("div")
    .attr("class",function(d){
        return d;
    })
    .style("width",function(d){
        return d == "quantile" ? d3[d](data,1) + "px"
            : d3[d](data) + "px";
    });

d3.select("#interpolate")
    .selectAll("Button")
    .data(functions)
    .enter().append("Button")
    .on("click", changeColor)
    .attr("value", function(d) {return d })
    .text(function(d) { return d });

