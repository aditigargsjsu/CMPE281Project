var ejs= require('ejs');
var mysql = require('mysql');
var arrayOfPools= [];


function getConnection(){

	
	var connection = mysql.createConnection({
		host     : 'mydb-cmpe281.csijd9oqjoza.us-west-2.rds.amazonaws.com',
		user     : 'userdbcmpe281',
		password : 'cmpe281project',
		database : 'project',
		port	 : 3306
	});
return connection;
}

function fetchData(callback,sqlQuery){

	console.log("\nSQL Query::"+sqlQuery);

	var connection = getConnection();

	connection.query(sqlQuery, function(err, rows, fields) {
		
			if(err){
				console.log("ERROR: " + err.message);
			}
			else
			{	// return err or result
				console.log("DB Results:"+rows);
				callback(err, rows);				// called the function passed as parameter to FETCHDATA function
			}
	});
	console.log("\nConnection closed..");
	connection.end();
}

exports.fetchData=fetchData;
