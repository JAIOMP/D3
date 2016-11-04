var studentRecords = [
    {name:'ramesh',subject:'maths',score:87},
    {name:'suresh',subject:'maths',score:45},
    {name:'pokemon',subject:'english',score:65},
    {name:'mary',subject:'kannada',score:44},
    {name:'riya',subject:'science',score:72},
    {name:'katie',subject:'social studies',score:82},
    {name:'katie',subject:'maths',score:98},
    {name:'ramesh',subject:'bengali',score:25},
    {name:'suresh',subject:'science',score:55},
    {name:'riya',subject:'tamil',score:75},
    {name:'pokemon',subject:'sports',score:95},
    {name:'pokemon',subject:'social studies',score:32}
];



var createRoundVerticalBarChart = function(){
    var subjects = ['maths','english','kannada','science','social studies','bengali','tamil','sports'];
    var color = ['#2678B2','#FD7F28','#329F34','#D42A2F','#936ABB','#8B564C','#E17AC1','#7F7F7F'];
    var bars = d3.select('.container').selectAll("div").data(studentRecords);
    bars.enter()
        .append("div")
        .attr('class','bars')
        .style('width',function(d){
            return d.score*10 + "px";
        })
        .text(function(d){
            return d.name+" "+ d.score;
        })
        .style("background-color", function(d,i){
            return color[subjects.indexOf(d.subject)];});


    var legends = d3.select('.legend').selectAll("div").data(subjects);
        legends.enter()
            .append("p")
            .attr("class","legends")
            .text(function(d){
                return d;
            })
            .style("background-color", function(d,i){
                return color[subjects.indexOf(d)];});
};


function sort(field){
    var bars = d3.select('.container').selectAll("div")
    bars.sort(function(x,y){
        return d3.ascending(x[field],y[field]);
    })
};





var sortByName = function(a,b){
    sort('name');
};

var sortByScore = function(a,b){
    sort('score');
};

var sortBySubject = function(a,b){
    sort('subject');
};

window.load = createRoundVerticalBarChart();