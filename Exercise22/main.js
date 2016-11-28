const WIDTH = 800;
const HEIGHT = 700;
const MARGIN = 50;


var data = [12,24,65,34,32,21,54,46,19];

var generateHistogram = function(){
    var x = d3.scaleLinear().domain([0,100]).rangeRound([0,WIDTH]);
    var y = d3.scaleLinear().range([HEIGHT,0]);

    var histogram = d3.histogram()
        .value(function(d){return d;})
        .domain(x.domain())
        .thresholds(x.ticks());

    var svg = d3.select('.container')
        .append('svg')
        .attr("width",WIDTH)
        .attr("height",HEIGHT)
        .append("g")
        .attr("transform","translate("+MARGIN+","+(-MARGIN)+")");

    var bins = histogram(data);
    console.log(bins)
    y.domain([0,d3.max(bins,function(d){return d.length + 5;})]);

    svg.selectAll("rect")
        .data(bins)
        .enter().append("rect")
        .attr("class","bar")
        .attr("x",1)
        .attr("transform",function(d){ return "translate("+x(d.x0)+","+y(d.length)+")"})
        .attr("width",function(d){ return x(d.x1) - x(d.x0) - 1;})
        .attr("height",function(d){ return HEIGHT - y(d.length);})
        .attr("fill","steelblue");

    svg.append("g")
        .attr("transform","translate(0.5,"+ HEIGHT +")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

};

generateHistogram();