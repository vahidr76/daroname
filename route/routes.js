/**
 * Created by vahid76 on 7/31/17.
 */

var express     = require("express")();
var controller  = require("../controller");


express.get("/", function(req, res){
    res.send("/ route");
});

express.get("/suggest/:name", controller.suggest);
express.get("/search/:name/page/:page", controller.search);
express.get("/post/:id", controller.post);
express.post("/insert", controller.insert);
express.post("/update", controller.update);


module.exports = express;