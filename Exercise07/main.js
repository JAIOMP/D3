const MARGIN = 50;
const WIDTH = 450;
const HEIGHT = 270;

var dataForCurves = [
    {"d3Curve":d3.curveLinear,"curveTitle":"curveLinear"},
    {"d3Curve":d3.curveLinearClosed,"curveTitle":"curveLinearClosed"},
    {"d3Curve":d3.curveCatmullRomClosed,"curveTitle":"curveCatmullRomClosed"},
    {"d3Curve":d3.curveStepAfter,"curveTitle":"curveStepAfter"},
    {"d3Curve":d3.curveBasis,"curveTitle":"curveBasis"},
    {"d3Curve":d3.curveCardinal,"curveTitle":"curveCardinal"},
    {"d3Curve":d3.curveMonotoneX,"curveTitle":"curveMonotoneX"},
    {"d3Curve":d3.curveCatmullRom,"curveTitle":"curveCatmullRom"}
];

var generateLineChart = function(){
    var data = [
        {x: 0, y: 5},
        {x: 1, y: 9},
        {x: 2, y: 7},
        {x: 3, y: 5},
        {x: 4, y: 3},
        {x: 5, y: 3.5},
        {x: 6, y: 4},
        {x: 7, y: 2},
        {x: 8, y: 3},
        {x: 9, y: 2}
    ];
    x = d3.scaleLinear().range([0,WIDTH]);
    y = d3.scaleLinear().range([HEIGHT,0]);

    xAxis = d3.axisBottom().scale(x).ticks(11);
    yAxis = d3.axisLeft().scale(y).ticks(11);

    var line = d3.line();

    var valueLine = d3.line()
        .x(function(d){
            return x(d.x/10);
        }).y(function(d){
            return y(d.y/10);
        });

    var sinValueLine = d3.line()
        .x(function(d){
        return x(d.x/10);
    }).y(function(d){
        return y(Math.sin((d.x))/10 + 0.5);
    });

    var svg = d3.select(".container")
        .append("svg")
        .attr("width", WIDTH + 2 * MARGIN)
        .attr("height", HEIGHT +2 * MARGIN)
        .append("g")
        .attr("transform",
            "translate(" + MARGIN + "," + MARGIN + ")");

    x.domain([0,1.0]);
    y.domain([0,1.0]);



    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + HEIGHT + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);


    function change() {
        var valueLine = d3.line()
            .x(function(d){
                return x(d.x/10);
            }).y(function(d){
                return y(d.y/10);
            }).curve(giveFunctionForTitle(this.value));

        var sinValueLine = d3.line()
            .x(function(d){
                return x(d.x/10);
            }).y(function(d){
                return y(Math.sin((d.x))/10 + 0.5);
            }).curve(giveFunctionForTitle(this.value));

        svg.append("path")
            .attr("class", "pathValue")
            .attr("d", valueLine(data));

        svg.append("path")
            .attr("class", "pathForSinValue")
            .attr("d", sinValueLine(data));
    }

    svg.append("path")
        .attr("class", "pathValue")
        .attr("d", valueLine(data));

    svg.append("path")
        .attr("class", "pathForSinValue")
        .attr("d", sinValueLine(data));

    svg.selectAll('dot')
        .data(data)
        .enter().append("circle")
        .attr("r",5)
        .attr("cx",function(d){return x(d.x/10)})
        .attr("cy",function(d){return y(d.y/10)})
        .attr("stroke","steelblue")
        .attr("fill","white");

    svg.selectAll('dot')
        .data(data)
        .enter().append("circle")
        .attr("r",5)
        .attr("cx",function(d){return x(d.x/10)})
        .attr("cy",function(d){return y((Math.sin(d.x))/10 + 0.5)})
        .attr("stroke","steelblue")
        .attr("fill","white");

    d3.select("#interpolate")
        .selectAll("Button")
        .data(dataForCurves)
        .enter().append("Button")
        .on("click",change)
        .attr("value", function(d) {return d.curveTitle; })
        .text(function(d) { return d.curveTitle; });

};

var giveFunctionForTitle = function(title){
    var func;
      for (var i = 0; i < dataForCurves.length; i++){
          if(title == dataForCurves[i].curveTitle){
             func = dataForCurves[i].d3Curve;
          }
      }
    return func;
};

generateLineChart();