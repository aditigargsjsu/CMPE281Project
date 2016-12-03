var ejs = require("ejs");
var mysql = require('./mysql');
var vendor_vendor = require('./vendor_vendor');


exports.vendor_vendor = function(req,res){
	var query = "select * from userinformation where id_primarykey='"+req.session.userid+"'";		
	console.log("Return Home Query is:"+query);
	mysql.fetchData(function(err, results){
		
		if (err) {
			throw err;
		} 
		else {
			if (results.length > 0) {
				console.log(JSON.stringify( results));
				ejs.renderFile('./views/vendor_vendor.ejs',{data:results},function(err,result)
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





exports.vendor_controller = function(req,res,next){
	var query = "select * from SensorCluster where Used='" + req.session.userid + "'";		
	console.log("Return Home Query is:"+query);
	mysql.fetchData(function(err, results){
		
		if (err) {
			throw err;
		} 
		else {
					req.my_cluster = results;
					next();
			
		}
		
	}, query);	
};

exports.vendor_controller_billing = function(req,res,next){
	var query = "select * from SensorCluster where Used=''";		
console.log("Return Home Query is:"+query);
mysql.fetchData(function(err, results){
	
	if (err) {
		throw err;
	} 
	else {
			req.sensor_cluster = results;
			return next();
	}
	
}, query);	};

exports.renderControllerPage=function(req, res) {
	ejs.renderFile('./views/vendor_controller.ejs', {
    	sensor_cluster: req.sensor_cluster,
    	my_cluster: req.my_cluster
    },function(err,result)
	{
		req.session.controllerid_primarykey=req.param('controllerid');
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
};

exports.vendor_deletecontroller = function(req,res,next){		
	var query = "Update SensorCluster set Used='' where SensorClusterID='" + req.param('controllerid')+"'";
	console.log("Return Home Query is:"+query);
	mysql.fetchData(function(err, results){
		
		if (err) {
			throw err;
		} 
		else {
			vendor_vendor.vendor_controller(req,res,next);
		}
		
	}, query);	
};

exports.vendor_addcontrollerinsert = function(req,res,next){
				var query = "Update SensorCluster set Used='" + req.session.userid+
				            "' where SensorClusterID='" + req.param('clusterid')+"'";
				console.log("Return Home Query is:"+query);
				mysql.fetchData(function(err, results){
				
				if (err) {
					throw err;
				} 
				else {
					vendor_vendor.vendor_controller(req,res,next);
				}
				}, query);	
};

exports.vendor_editcontroller = function(req,res){
	var query = "select * from controllerinformations where controllerid_primarykey='"+req.param('controllerid')+"'";		
	console.log("Return Home Query is:"+query);
	mysql.fetchData(function(err, results){
		if (results.length > 0) {
			console.log(JSON.stringify( results));
			ejs.renderFile('./views/vendor_editcontroller.ejs',{data:results},function(err,result)
			{
				req.session.controllerid_primarykey=req.param('controllerid');
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
	}, query);	
};


exports.vendor_editcontrollerupdate = function(req,res,next){
	var query = "update controllerinformations set status='"+req.param('status')+"',numberofdevices='"+req.param('numberofdevices')+
			" ', billinginformation_billingid_primarykey='"+req.param('billingplanid')+"'" +
			" where controllerid_primarykey='"+req.session.controllerid_primarykey+"'";		
	console.log("Return Home Query is:"+query);
	mysql.fetchData(function(err, results){
		
		if (err) {
			throw err;
		} 
		else {
			vendor_vendor.vendor_controller(req,res,next);
		}
		
	}, query);	
};


exports.vendor_sensor = function(req,res,next){
	//var query = "select * from sensors where controllerinformation_controllerid_primarykey in " +
			//"(select controllerid_primarykey from controllerinformations where userinformation_id_primarykey='"+req.session.userid+"')";		
	var query = "select * from SingleSensor where Used='" + req.session.userid + "'";
	console.log("Return Home Query is:"+query);
	mysql.fetchData(function(err, results){
		
		if (err) {
			throw err;
		} 
		else {
				req.sensor = results;
				next();
		}
		
	}, query);	
};

exports.vendor_controller_controller = function(req,res,next){
	//var query = "select * from controllerinformations where userinformation_id_primarykey='"+req.session.userid+"'";		
var query = "select * from SingleSensor where Used=''";
console.log("Return Home Query is:"+query);
mysql.fetchData(function(err, results){
	
	if (err) {
		throw err;
	} 
	else {
			req.controller = results;
			return next();
	}
	
}, query);	};

exports.renderSensorPage=function(req, res) {
	ejs.renderFile('./views/vendor_sensor.ejs', {
    	sensor: req.sensor,
    	controller: req.controller
    },function(err,result)
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
};

exports.vendor_deletesensor = function(req,res,next){
	//var query = "delete from sensors where sensorid='"+req.param('sensorid')+"'";		
	var query = "Update SingleSensor set Used='' where SensorID='" + req.param('sensorid')+"'";
	console.log("Return Home Query is:"+query);
	mysql.fetchData(function(err, results){
		
		if (err) {
			throw err;
		} 
		else {
			vendor_vendor.vendor_sensor(req,res,next);
		}
		
	}, query);	
};

exports.vendor_addsensorinsert = function(req,res,next){
					//var query = "insert into sensors(sensorname,sensorlocation,sensortype,controllerinformation_controllerid_primarykey,status) " +
							//"values ('"+req.param('name')+"','"+req.param('location')+"'," +
					//" '"+req.param('type')+"', '"+req.param('controllerid')+"','"+req.param('status')+"')";
                
				var query = "Update SingleSensor set Used='" + req.session.userid+
				            "' where SensorID='" + req.param('sensorid')+"'";	
				console.log("Return Home Query is:"+query);
				mysql.fetchData(function(err, results){
				
				if (err) {
					throw err;
				} 
				else {
					vendor_vendor.vendor_sensor(req,res,next);
				}
				}, query);	
};

exports.vendor_editsensor = function(req,res){
	var query = "select * from sensors where sensorid='"+req.param('sensorid')+"'";		
	console.log("Return Home Query is:"+query);
	mysql.fetchData(function(err, results){
		if (results.length > 0) {
			console.log(JSON.stringify( results));
			ejs.renderFile('./views/vendor_editsensor.ejs',{data:results},function(err,result)
			{
				req.session.sensorid=req.param('sensorid');
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
	}, query);	
};


exports.vendor_editsensorupdate = function(req,res,next){
	var query = "update sensors set status='"+req.param('status')+"',sensorname='"+req.param('name')+"', sensorlocation='"+req.param('location')+"'," +
			" sensortype='"+req.param('type')+"', controllerinformation_controllerid_primarykey='"+req.param('controllerid')+"'" +
			" where sensorid='"+req.session.sensorid+"'";		
	console.log("Return Home Query is:"+query);
	mysql.fetchData(function(err, results){
		
		if (err) {
			throw err;
		} 
		else {
			vendor_vendor.vendor_sensor(req,res,next);
		}
		
	}, query);	
};



exports.vendor_billingplan = function(req,res){
	var query = "select * from  billinginformation where isOriginal='1'";		
	console.log("Return Home Query is:"+query);
	mysql.fetchData(function(err, results){
		
		if (err) {
			throw err;
		} 
		else {
				ejs.renderFile('./views/vendor_billingplan.ejs',{data:results},function(err,result)
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
	}, query);	
};

exports.vendor_addbillingplan = function(req,res){
	var query = "insert into billinginformation(userinfo_id_primarykey,cost,description,planname,isOriginal) values ('"+req.session.userid+"'" +
			",'"+req.param('cost')+"','"+req.param('description')+"','"+req.param('planname')+"','1')";		
	console.log("Return Home Query is:"+query);
	mysql.fetchData(function(err, results){
		if (err) {
			throw err;
		} 
		else {
				vendor_vendor.vendor_billingplan(req,res);
		}
	}, query);	
};



