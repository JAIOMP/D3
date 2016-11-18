const MARGIN = 50;
const WIDTH = 450;
const HEIGHT = 270;

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
        {x: 9, y: 2},
        {x: 10, y: 2}
    ];
    x = d3.scaleLinear().range([0,WIDTH]);
    y = d3.scaleLinear().range([HEIGHT,0]);

    xAxis = d3.axisBottom().scale(x).ticks(11);
    yAxis = d3.axisLeft().scale(y).ticks(11);

    var svg =  d3.select(".container")
            .append("svg")
            .attr("width", WIDTH + 2 * MARGIN)
            .attr("height", HEIGHT +2 * MARGIN)
            .append("g")
            .attr("transform",
                "translate(" + MARGIN + "," + MARGIN + ")");

        x.domain([0,1.0]);
        y.domain([0,1.0]);

    var area = d3.area()
        .x(function(d) { return x(d.x/10); })
        .y0(HEIGHT)
        .y1(function(d) { return y(((3*(Math.sin(d.x)))+5)/10) });

    var sinValueLine = d3.line()
            .x(function(d){
                return x(d.x/10);
            }).y(function(d){
                return y(((3*(Math.sin(d.x)))+5)/10);
            });

        svg.append("path")
            .attr("class", "pathArea")
            .attr("d",area(data));

        svg.append("path")
        .attr("class", "path")
        .attr("d", sinValueLine(data))

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + HEIGHT + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.selectAll('dot')
            .data(data)
            .enter().append("circle")
            .attr("r",5)
            .attr("cx",function(d){return x(d.x/10)})
            .attr("cy",function(d){return y(((3*(Math.sin(d.x)))+5)/10)})
            .attr("stroke","steelblue")
            .attr("fill","white");
};

generateLineChart();