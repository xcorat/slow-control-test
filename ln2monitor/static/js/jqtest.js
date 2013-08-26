// Load the Visualization API and the piechart package.
google.load('visualization', '1', {'packages':['annotatedtimeline']});

$(document).ready(function(){
      
    // Set a callback to run when the Google Visualization API is loaded.
    google.setOnLoadCallback(drawChart);
    
    var w_chart = null;
    var t_chart = null;
    var dy_chart = null;
    var w_data = new google.visualization.DataTable();
    var t_data = new google.visualization.DataTable();
    
    function updateWChartData(e){
        var range = null;
        if (e){
            range = w_chart.getVisibleChartRange();
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
                    w_data.addRow([new Date(this[0]), this[1]]);
                }
            });
            w_chart.draw(w_data, {'scaleType': 'maximized',
                                  'allowRedraw': true,
                                 }); 
        });
    }
    
    function updateTChartData(e){
        var range = null;
        if (e){
            range = t_chart.getVisibleChartRange();
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
                    t_data.addRow([new Date(this[0]), this[2]]);
                }
            });
            t_chart.draw(t_data, {'scaleType': 'maximized',
                                  'allowRedraw': true,
                                 });   
        });
    }
    
     function updateDYChartData(e){
        var range = null;
        if (e){
            range = dy_chart.getVisibleChartRange();
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
                    w_data.addRow([new Date(this[0]), this[1]]);
                }
            });
            dy_chart.draw(w_data); 
        });
    }
    
    function drawChart() {
        w_data.addColumn('datetime', 'Time');
        w_data.addColumn('number', 'Weight');
        t_data.addColumn('datetime', 'Time');
        t_data.addColumn('number', 'Temperature');
        
        // Instantiate and draw our chart, passing in some options.
        t_chart = new google.visualization.AnnotatedTimeLine(
                        document.getElementById('chart_div'));
        t_chart.draw(t_data, {'scaleType': 'maximized',});
        
        w_chart = new google.visualization.AnnotatedTimeLine(
                        document.getElementById('weight_chart'));
        w_chart.draw(w_data, {'scaleType': 'maximized',});
        google.visualization.events.addListener(
            w_chart, 'rangechange', updateWChartData);
        google.visualization.events.addListener(
            t_chart, 'rangechange', updateTChartData);
        
        dy_chart = new Dygraph.GVizChart(
            document.getElementById('dygraphs'))

        
        updateWChartData();
        updateTChartData();
        
    }
});