var ejs = require("ejs");
var mysql = require('./mysql');

exports.sensor = function(req,res){
	//var sensortype = req.param("sensortype");
	var query = "select * from sensors ";		
	console.log("Return Home Query is:"+query);
	mysql.fetchData(function(err, results){
		
		if (err) {
			throw err;
		} 
		else {
			
			if (results.length > 0) {
				
				console.log("getusers names");
				console.log(JSON.stringify( results));
				//res.end(JSON.stringify(results));	
				ejs.renderFile('./views/sensor.ejs',{data:results},function(err,result)
				{
					if(!err)
						{
							res.end(result);
						}
					else
						{
						res.end('An error occured');
						console.log(err);
						}
				});
			}
			else
				{
				console.log("Invalid login");
				ejs.renderFile('./views/failure.ejs',function(err,result)
				{
					if(!err)
						{
							res.end(result);
						}
					else
						{
							res.end('An error occured');
							console.log('An error occured');
						}
				});
				}
		}
		
	}, query);	



};





