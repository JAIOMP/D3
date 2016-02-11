var perJuiceQuantity = function(data){
    var juiceQuantity = data.reduce(function(init ,order){
        if(!init[order.drinkName])
            init[order.drinkName] = order.quantity;
        init[order.drinkName]+=order.quantity;
        return init;
    },{});
    return juiceQuantity;
};

var perDayConsumption = function(data){
    var perDayConsumptionOfJuice = data.reduce(function(initialValue,juiceOrder) {
        var daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var Date_data = new Date(juiceOrder["date"]);
        var day_data = Date_data.getDay(Date_data);
        if(!initialValue[daysInWeek[day_data]]){
            initialValue[daysInWeek[day_data]] = juiceOrder.quantity;
        }
        initialValue[daysInWeek[day_data]] += juiceOrder.quantity;
        return initialValue;
    },{})
    return perDayConsumptionOfJuice;
}

var give_juice_data = function(){
    $.get('give_statics',function(data){
        // var filetred_data = perJuiceQuantity(data);
        // var group_of_juice = juice_name_value(filetred_data);
        // display_bar_chart(group_of_juice);
        var perDayJuice = perDayConsumption(data);
        var total_juice_by_day = juiceQuantityAccordingToDay(perDayJuice);
        display_pie_chart(total_juice_by_day);
    });
}
var juiceQuantityAccordingToDay = function(data){
    var perDayJuiceQuantity = [];
    for (var index in data) {
        perDayJuiceQuantity.push({day:index,quantity:data[index]});
    };
    return perDayJuiceQuantity;
}

var juice_name_value = function(data){
    var  group_of_juiceName_juiceValue = []; 
    for(var index in data){
        if(index != 'CTL'){
            group_of_juiceName_juiceValue.push({name:index,value:data[index]});
        }
    }
    return group_of_juiceName_juiceValue;
};


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
                return d.quantity;
            }) ;
        
        var arcs = group.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class","arc");
        
        arcs.append("path")
            .attr("d",d3.svg.arc().innerRadius(100).outerRadius(r+100))
            .attr("fill",function(d){return color(d.data.quantity);})
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
                return d.data.quantity;
            })
}

var display_bar_chart = function(data){
    var margin = {top:20,right:10,bottom:100,left:40},
    width = 650,
    height = 380;
    var color = d3.scale.category20c();
    var svg = d3.select('body')
        .append('svg')
        .attr({
            "width": 2200,
            "height": 600 
        })
        .append('g')
            .attr("transform","translate("+ 50 + ',' +margin.right+')');

    var xScale = d3.scale.ordinal()
        .rangeRoundBands([0,1500],0.1,0.1);

    var yScale = d3.scale.linear()
        .range([height,height-20,height-50, 5]);
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .tickValues([0,10,100,500,1000,2000,3000,4000,5000,6000])
        .innerTickSize(-1500);

    xScale.domain(data.map(function(d){return d.name}));
    yScale.domain([0,10,100,d3.max(data,function(d){return d.value})]);

    var rect = svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr("class", "bar")
        .attr({
            'x':function(d){return xScale(d.name)},
            'y':function(d){return yScale(d.value)},
            "width":xScale.rangeBand(),
            "height":function(d){return height - yScale(d.value);}
        });


    rect.append('title')
        .text(function(d){return d.value})

    svg.append("g")
        .attr("class","x axis")
        .attr("transform","translate("+ -9 +','+383+")")
        .call(xAxis)
        .selectAll('text')
        .attr("transform","rotate(-90)")
        .attr("dx", "-1.0em")
        .attr("dy", "0.0em")
        .style("text-anchor","end")
        .style("font-size","20px");

    svg.append("g")
        .attr("class","y axis")
        .call(yAxis);

      
}
