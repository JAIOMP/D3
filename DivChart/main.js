var generateBar = function(data){
    var bar = d3.select(".container").selectAll("div").data(data);

    bar.enter()
        .append("div")
        .attr("class","bar")
        .style("width",function(d){
           return d*10 + "px";
        })
        .text(function(d){
            return d;
        })
        .style("background-color",function(d){
            return "rgb("+(d+100)+","+(d+100)+","+255+")";
        })

};

var updateChart = function(data){
    data.shift();
    data.push(_.random(0,100));
    d3.selectAll('.bar').data(data)
        .style("width",function(d){
            return d*10 + "px";
        })
        .text(function(d){
        return d;
        })
        .style("background-color",function(d){
            return "rgb("+(d+100)+","+(d+100)+","+255+")";
        })

};

window.onload = function(){
    var data = [12,34,56,32,98,46,76,78];
    generateBar(data);
    setInterval(updateChart,1000,data);
};