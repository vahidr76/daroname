/**
 * Created by vahid76 on 7/31/17.
 */
var mongoose = require("mongoose");
var post = require("./post");

var model = {
    mon     : mongoose,
    post    : post
};

module.exports = model;