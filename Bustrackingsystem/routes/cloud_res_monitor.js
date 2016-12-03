var ejs = require("ejs");
var mysql = require('./mysql');

exports.render = function(req,res){
	var query1 = "select * from SingleSensor";
	console.log("Cloud Resource Monitor Query is:"+query1);
    var query2 = "select * from SensorCluster";
	console.log("Cloud Resource Monitor Query is:"+query2);
	
	mysql.fetchData(function(err1, results_single_sensor){
		
		if (err1) {
			throw err1;
		}

		mysql.fetchData(function(err2, results_sensor_cluster){
		
		  if (err2) {
			throw err2;
		  }
		
          ejs.renderFile('./views/cloud_res_monitor.ejs',
          	{single_sensor:results_single_sensor,sensor_cluster:results_sensor_cluster},function(err3,result)
         {
		    if(!err3)
		    {
			  res.end(result);
		    }
		    else
		    {
		    	res.end('An error occured');
		  	    console.log(err3);
		    }
	     });
	    }, query2);
	}, query1);
};