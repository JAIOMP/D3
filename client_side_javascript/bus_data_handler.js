var bus_data_visualization = function(){
    $.get('give_bus_data',function(data) {
        var dataForWeekRepresentation = filterData_week_month(data)[0];
        var busesWithDays = numbersOfBusAccordingToDay(dataForWeekRepresentation);
        display_pie_chart(busesWithDays);
        });
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
    // console.log(data,"data")
    var perDayJuiceQuantity = [];
    for (var index in data) {
        perDayJuiceQuantity.push({day:index,numberOfBus:data[index]});
    };
    return perDayJuiceQuantity;
}
var display_pie_chart = function(data){
    console.log(data);
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