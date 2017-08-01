/**
 * Created by vahid76 on 7/31/17.
 */

var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

// set schema for post table
var postSchema = new mongoose.Schema({
    title   : String,
    body    : String,
    image   : String,
    type    : Number,
    relation: []
});

var posts = mongoose.model("posts", postSchema);

module.exports = posts;
