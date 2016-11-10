var numberRange = d3.scaleLinear()
    .domain([1,10])
    .range([1,10]);

var powerRange = d3.scalePow().exponent(2);

var logRange = function(number) {
    var range = d3.scaleLog()
        .base(Math.E)
        .domain([Math.exp(1), Math.exp(10)])
        .range([1,10]);
    return range(number).toFixed(2);
}

var numbers = [1,2,3,4,5,6,7,8,9,10];
var createRowWithTitle = function(row,title,func){
    var rowWithTitle = row.append('td').text(title);
    row.selectAll('td').data(numbers,function(d){
        return d;
    })
        .enter()
        .append('td')
        .text(function(d){
        return func(d);
    });
};

var generateTable = function(){
    var table = d3.select('.container')
        .append('table')
        .append("tbody")
        .attr('class',"tabulate");
    createRowWithTitle(table.append('tr'),"Title",numberRange);
    createRowWithTitle(table.append('tr'),"N",numberRange);
    createRowWithTitle(table.append('tr'),"N square",powerRange);
    createRowWithTitle(table.append('tr'),"Log(n)",logRange);
    createRowWithTitle(table.append('tr'),"Log(n) rounded",d3.scaleLog().rangeRound([0,2]));
};

window.onload = generateTable();
