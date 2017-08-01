var express     = require("express")();
var mongoose    = require("mongoose");
var database    = require("./config/database");
var server      = require("./config/server.js");
var routes      = require("./route/routes");
var bodyParser  = require("body-parser");

// connect to database
mongoose.Promise = require('bluebird');
mongoose.connect(database.uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connections error : "));
db.once('open', function(){
    console.log("Connected to database ... ");
});



// Middleware
// access to posts parameter with bodyParser
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({ extended: false }));
// send all request in /api to route controller
express.use("/api" , routes);
express.use(express.static('public'));


// configuration for server run
express.listen(server.port, function(req, res) {
    console.log("Server running on port "+ server.port +" ... ");
});
