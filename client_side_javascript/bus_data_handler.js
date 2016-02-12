var bus_data_visualization_for_day = function(){
    $.get('give_bus_data',function(data) {
        var dataForWeekRepresentation = filterData_week_month(data)[0];
        var busesWithDays = numbersOfBusAccordingToDay(dataForWeekRepresentation);
        display_pie_chart(busesWithDays);
        });
}
var bus_data_visualization_for_month = function(){
    $.get('give_bus_data_for_month',function(data) {
        var busesWithMonth = numbersOfBusAccordingToMonth(filterData_week_month(data)[1]);
        InitChart(busesWithMonth);       
    })
}


var filterData_week_month = function(data) {
    var groupOfWeekMonthRepresentation = [];
    var dataForWeekRepresentation = {};
    var dataForMonthRepresentation = {};
    data.forEach(function(req){
    dataForWeekRepresentation[req.time.day] = dataForWeekRepresentation[req.time.day] ? (++dataForWeekRepresentation[req.time.day]) : 1;
    dataForMonthRepresentation[req.time.month] = dataForMonthRepresentation[req.time.month] ? (++dataForMonthRepresentation[req.time.month]) : 1;
    });
    groupOfWeekMonthRepresentation.push(dataForWeekRepresentation,dataForMonthRepresentation)
    return groupOfWeekMonthRepresentation;
}
var numbersOfBusAccordingToDay = function(data){
    var perDayBusNumbers = [];
    for (var index in data) {
        perDayBusNumbers.push({day:index,numberOfBus:data[index]});
    };
    return perDayBusNumbers;
}
var numbersOfBusAccordingToMonth = function(data){
    var monthGroup = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var perMonthBusNumbers = [];
    for (var index in data) {
        perMonthBusNumbers.push({month:monthGroup[index-1],numberOfBus:data[index]});
    };
    return perMonthBusNumbers;
}
var display_pie_chart = function(data){
        var r = 300;
        var color = d3.scale.category20c();
        var canvas = d3.select("body").append("svg")
            .attr("width",1500)
            .attr("height",1500);


        var group = canvas.append("g")
            .attr("transform","translate(500,500)");
        
        var arc = d3.svg.arc()
            .innerRadius(100)
            .outerRadius(200);
        
        var pie = d3.layout.pie()
            .value(function(d){
                return d.numberOfBus;
            }) ;
        
        var arcs = group.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class","arc");
        
        arcs.append("path")
            .attr("d",d3.svg.arc().innerRadius(100).outerRadius(r+100))
            .attr("fill",function(d){return color(d.data.numberOfBus);})
            .transition().duration(750).ease('ease-in')
            .attr("d",arc)
            .attr("fill",function(d){return color(d.data.day);});
        
        arcs.append("text")
            .attr("transform",function(d){return "translate(" +arc.centroid(d)+ ")";})
            .attr("text-anchor","middle")
            .attr("font-size","1.1em")
            .text(function(d){return d.data.day;});
        arcs.append("title")
            .text(function(d) {
                return d.data.numberOfBus;
            })
}
var InitChart = function(data){
        var color = d3.scale.category20c();
        var svg = d3.select('body')
            .append('svg')
            .attr({
                "width":2200,
                "height":600
            })
            .append('g')
                .attr("transform","translate(" + 60 +','+ 20 +')');
        var xRange = d3.scale.ordinal()
        .rangeRoundBands([45, 1500],1.0,1.0).domain(data.map(function(d) {return d.month; }))
        var yRange = d3.scale.linear().range([400,350, 0]).domain([0,30,
                        d3.max(data, function (d) {
                            return d.numberOfBus;
                        })]);
        var xAxis = d3.svg.axis().scale(xRange).orient("bottom");
        var yAxis = d3.svg.axis().scale(yRange).orient("left")
        .tickValues([25,35,40,45,50,55])
        .innerTickSize(-1500);
        svg.append("g")
        .attr("class","x axis")
        .call(xAxis).attr("transform", "translate(0,400)");
        svg.append("g")
        .attr("class","y axis").call(yAxis).attr("transform", "translate(40,0)");
        var circle = svg.selectAll("circle")
        .data(data)
        .enter()
        .append('circle')
        .attr("cx", function (d) { return xRange (d.month); })
        .attr("cy", function (d) { return yRange (d.numberOfBus); })
        .attr("r", 10)
        .style("fill",function(d){return color(d.numberOfBus);});
        circle.append('title')
        .text(function(d){return d.month+'('+d.numberOfBus+')'})
}
