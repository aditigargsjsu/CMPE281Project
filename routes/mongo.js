// var MongoClient = require('mongodb').MongoClient;
// var db;
// var connected = false;
// 
// /**
//  * Connects to the MongoDB Database with the provided URL
//  */
// exports.connect = function(url, callback){
//     MongoClient.connect(url, function(err, _db){
//       if (err) { throw new Error('Could not connect: '+err); }
//       db = _db;
//       connected = true;
//       console.log(connected +" is connected?");
//       callback();
//     });
// };
// 
// /**
//  * Returns the collection on the selected database
//  */
// exports.collection = function(name){
//     if (!connected) {
//       throw new Error('Must connect to Mongo before calling "collection"');
//     } 
//     return db.collection(name);
// };


//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/mydatabase';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('sensors');

    //Create some sensors
    var sensor1 = {name: 'location sensor', status: 'active', location: 'San Jose City'};
    var sensor2 = {name: 'speed sensor', status: 'inactive', location: 'San Jose City'};
    var sensor3 = {name: 'counter sensor', status: 'active', location: 'San Jose City'};

    // Insert some sensors
    collection.insert([sensor1, sensor2, sensor3], function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "sensors" collection. The documents inserted with "_id" are:', result.length, result);
      }
      //Close connection
      db.close();
    });
  }
});