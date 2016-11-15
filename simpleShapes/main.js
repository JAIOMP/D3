var container = d3.select('.container').selectAll('div');

var svg = d3.select('.container')
        .append('svg')
    .attr("width",900)
    .attr("height",300);


var circle = svg.append('circle');
    circle.attr("cx",200)
        .attr("cy",50)
        .attr("r",50)
        .attr("stroke","red")
        .attr("fill","none");

var line = svg.append('line');
    line.attr("x1",0)
        .attr("y1",100)
        .attr("x2",100)
        .attr("y2",0)
        .attr("stroke","grey")
        .attr("stroke-width",2);

var rectangle = svg.append('rect');
    rectangle.attr("width",100)
        .attr("height",100)
        .attr("x",300)
        .attr("y",0)
        .attr("rx",10)
        .attr("ry",10)
        .attr("stroke","skyblue")
        .attr("fill","none")
        .attr("stroke-width",2);

var triangle = svg.append('polygon');
    triangle.attr("points","495,4 450,100 550,100")
        .attr("stroke","green")
        .attr("fill","none")
        .attr("stroke-width",2);


