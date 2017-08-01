/**
 * Created by vahid76 on 7/31/17.
 */

var db_name = "daroname";
var db_host = "127.0.0.1:27017";

var database = {
    uri     : "mongodb://" + db_host + "/" + db_name,
    options : {
        user    : "",
        pass    : ""
    }
};

module.exports = database;