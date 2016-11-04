var generateRandomNumbers = function(){
    var numbers = [];
    for(var i = 0; i<10; i++){
        var randomNumber = _.random(0,100);
        numbers.push(randomNumber);
    }
    return numbers;
};
var groupOfRandomNumbers = generateRandomNumbers();

var updateGroupOfRandomNumbers = function(data){
    data.splice(0,1);
    data.push(_.random(0,100));
    return data;
};

var chart,x,y,line,xAxis,yAxis,margin, width, height;

var generateBarChart = function(data) {
     margin = {top: 20, right: 20, bottom: 30, left: 40};
     width = 960 - margin.left - margin.right;
     height = 500 - margin.top - margin.bottom;

    x = d3.scaleBand().range([0, width]).padding(0.1);
    y = d3.scaleLinear().range([height, 0]);

    chart = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    x.domain([0,1,2,3,4,5,6,7,8,9].map(function(d) { return d }));
    y.domain([0, d3.max(data, function(d) { return d })]);

    chart.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d,i) { return x(i); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d); })
        .attr("height", function(d) { return height - y(d); });

   chart.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    chart.append("g")
        .call(d3.axisLeft(y));

};
var updateData = function(data){
    x.domain(d3.extent([0,1,2,3,4,5,6,7,8,9], function(d) { return d; }));
    y.domain([0, d3.max(data, function(d) { return d; })]);

    var bar = chart.selectAll(".bar")
        .data(data);

    bar.enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d,i) { return x(i); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d); })
        .attr("height", function(d) { return height - y(d); });

    bar.attr("y", function(d) { return y(d); })
        .attr("height", function(d) { return height - y(d); });


};

var generateLineChart = function(data) {
    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 270 - margin.top - margin.bottom;

    x = d3.scaleLinear().range([0, width]);
    y = d3.scaleLinear().range([height, 0]);

    xAxis = d3.axisBottom().scale(x).ticks(10);

    yAxis = d3.axisLeft().scale(y).ticks(10);

    valueline = d3.line()
        .x(function (d,i) {
            return x(i);
        })
        .y(function (d) {
            return y(d);
        });

    var svg = d3.select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent([0,1,2,3,4,5,6,7,8,9], function (d) {
        return d;
    }));
    y.domain([0, d3.max(data, function (d) {
        return d;
    })]);

    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
}

function updateDataForLineChart(data) {

        x.domain(d3.extent([0,1,2,3,4,5,6,7,8,9], function(d) { return d; }));
        y.domain([0, d3.max(data, function(d) { return d; })]);


        var svg = d3.select("body").transition();

        svg.select(".line")
            .duration(750)
            .attr("d", valueline(data));
        svg.select(".x.axis")
            .duration(750)
            .call(xAxis);
        svg.select(".y.axis")
            .duration(750)
            .call(yAxis);
}


    window.onload = function() {
        generateBarChart(generateRandomNumbers());
        setInterval(function(){
            return updateData(updateGroupOfRandomNumbers(groupOfRandomNumbers));
        },500);
    };

    //window.onload = function() {
    //    generateLineChart(generateRandomNumbers());
    //    setInterval(function(){
    //        return updateDataForLineChart(updateGroupOfRandomNumbers(groupOfRandomNumbers));
    //    },500);
    //};

