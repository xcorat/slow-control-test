// Load the Visualization API and the piechart package.
//google.load('visualization', '1', {'packages':['annotatedtimeline']});

$(document).ready(function(){
      
    // Set a callback to run when the Google Visualization API is loaded.
 //   google.setOnLoadCallback(drawChart);
    
    var w_chart = null;
    var t_chart = null;
    var dy_chart = null;
//    var w_data = new google.visualization.DataTable();
//    var t_data = new google.visualization.DataTable();
    var dy_data = [];
    
//     function updateWChartData(e){
//         var range = null;
//         if (e){
//             range = w_chart.getVisibleChartRange();
//             range.numpoints = 100;
//         }
//         var jsonData = $.ajax({
//             url: "/json/weight-temp",
//             data: range,
//             dataType:"json",
//             })
//         .done(function(jsonData){
//             $.each(jsonData, function(){
//                 if(this[0] != "time"){
//                     w_data.addRow([new Date(this[0]), this[1]]);
//                 }
//             });
//             w_chart.draw(w_data, {'scaleType': 'maximized',
//                                   'allowRedraw': true,
//                                  }); 
//         });
//     }
//     
//     function updateTChartData(e){
//         var range = null;
//         if (e){
//             range = t_chart.getVisibleChartRange();
//             range.numpoints = 100;
//         }
//         var jsonData = $.ajax({
//             url: "/json/weight-temp",
//             data: range,
//             dataType:"json",
//             })
//         .done(function(jsonData){
//             $.each(jsonData, function(){
//                 if(this[0] != "time"){
//                     t_data.addRow([new Date(this[0]), this[2]]);
//                 }
//             });
//             t_chart.draw(t_data, {'scaleType': 'maximized',
//                                   'allowRedraw': true,
//                                  });   
//         });
//     }
    
     function updateDYChartData(e){
        var range = null;
        if (e){
       //     range = dy_chart.getVisibleChartRange();
            range.numpoints = 100;
        }
        var jsonData = $.ajax({
            url: "/json/weight-temp",
            data: range,
            dataType:"json",
            })
        .done(function(jsonData){
            $.each(jsonData, function(){
                if(this[0] != "time"){
                    dy_data.push([new Date(this[0]), this[2]]);
                }
            });
            dy_chart.draw(dy_data); 
        });
    }
    
    function draw_highchart(){
        $('#high_chart').highcharts({
            title: {
                text: 'Monthly Average Temperature',
                x: -20 //center
            },
            subtitle: {
                text: 'Source: WorldClimate.com',
                x: -20
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Temperature (°C)'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '°C'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'New York',
                data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            }, {
                name: 'Berlin',
                data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }, {
                name: 'London',
                data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]
        });
    }
    
    function update_highchart(){
        series: [{       name: 'Tokyo',
                data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }], 
    
    function drawChart() {
//         w_data.addColumn('datetime', 'Time');
//         w_data.addColumn('number', 'Weight');
//         t_data.addColumn('datetime', 'Time');
//         t_data.addColumn('number', 'Temperature');
        
        // Instantiate and draw our chart, passing in some options.
//         t_chart = new google.visualization.AnnotatedTimeLine(
//                         document.getElementById('chart_div'));
//         t_chart.draw(t_data, {'scaleType': 'maximized',});
//         
//         w_chart = new google.visualization.AnnotatedTimeLine(
//                         document.getElementById('weight_chart'));
//         w_chart.draw(w_data, {'scaleType': 'maximized',});
//         google.visualization.events.addListener(
//             w_chart, 'rangechange', updateWChartData);
//         google.visualization.events.addListener(
//             t_chart, 'rangechange', updateTChartData);
        
//         dy_chart = new Dygraph(
//             document.getElementById('dy_chart'), dy_data);
// 
//         
//         updateWChartData();
//         updateTChartData();
//         updateDYChartData();
        draw_highchart();
    }
    
    drawChart();
});