var perJuiceQuantity = function(data){
    var juiceQuantity = data.reduce(function(init ,order){
        if(!init[order.drinkName])
            init[order.drinkName] = order.quantity;
        init[order.drinkName]+=order.quantity;
        return init;
    },{});
    return juiceQuantity;
};
var give_juice_data = function(){
    $.get('give_statics',function(data){
        var filetred_data = perJuiceQuantity(data);
        var group_of_juice = juice_name_value(filetred_data);
        display_bar_chart(group_of_juice);
	});
}

var juice_name_value = function(data){
    var  final_result = []; 
    var count = 0;
    for(var index in data){
        if(index != 'CTL'){
            final_result.push({name:index,value:data[index]});
        }
    }
    return final_result;
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
            .innerRadius(0)
            .outerRadius(700);
        
        var pie = d3.layout.pie()
            .value(function(d){
                return d.value;
            }) ;
        
        var arcs = group.selectAll(".arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class","arc");
        

        arcs.append("path")
            .attr("d",d3.svg.arc().innerRadius(1).outerRadius(r+100))
            .attr("fill",function(d){return color(d.data.value);})
            .transition().duration(750).ease('ease-in')
            .attr("d",arc)
            .attr("fill",function(d){return color(d.data.name);});
        
        arcs.append("text")
            .attr("transform",function(d){return "translate(" +arc.centroid(d)+ ")";})
            .attr("text-anchor","middle")
            .attr("font-size","0.1em")
            .text(function(d){return d.data.name;});
}

var display_bar_chart = function(data){
    var margin = {top:20,right:10,bottom:100,left:40},
    width = 700 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;
    var color = d3.scale.category20c();


    var svg = d3.select('body')
        .append('svg')
        .attr({
            "width": width + margin.right + margin.left+1500,
            "height": height + margin.top + margin.bottom+100 
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
