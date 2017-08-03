/**
 * Created by vahid76 on 7/31/17.
 */
var model = require("../model");

var postController = {

    posts      : function(req, res){

        model.post.find().skip((Number(req.params.page)-1)*10).limit(10).then(function (post) {

            var count = 0;
            var jobQueries = [];

            for (var i = 0; i < post.length; i++) {

                jobQueries.push(model.post.find({ _id : {$in : post[i].relation}}, { title : 1}).then(function (data) {

                    post[count++].relation = data;
                    return post;

                }));

            }

            return Promise.all(jobQueries);

        }).then(function(d){

            res.json({"status" : "success", "data" : d[0]});
        }).catch(function(error){
            res.status(501).json({"status" : "fail"});
        })

    },
    searchPost : function(req, res){

        model.post.find({title : new RegExp(req.params.name, 'i') }).skip((Number(req.params.page)-1)*10).limit(10).then(function (post) {

            var count = 0;
            var jobQueries = [];

            for (var i = 0; i < post.length; i++) {

                jobQueries.push(model.post.find({ _id : {$in : post[i].relation}}, { title : 1}).then(function (data) {

                    post[count++].relation = data;
                    return post;

                }));

            }

            return Promise.all(jobQueries);

        }).then(function(d){
            res.json({"status" : "success", "data" : d[0]});
        }).catch(function(error){
            res.status(501).json({"status" : "fail"});
        })
    },

    getPost : function(req, res){

        model.post.find({_id : req.params.id }).then(function (post) {

            var count = 0;
            var jobQueries = [];


            for (var i = 0; i < post.length; i++) {

                jobQueries.push(model.post.find({ _id : {$in : post[i].relation}}, { title : 1}).then(function (data) {

                    post[count++].relation = data;
                    return post;

                }));

            }

            return Promise.all(jobQueries);

        }).then(function(d){
            res.json({"status" : "success", "data" : d[0]});
        }).catch(function(error){
            res.status(501).json({"status" : "fail"});
        })

    },

    insertPost : function(req, res){

        var post = new model.post({
            title   : req.body.title,
            body    : req.body.body,
            image   : req.body.image,
            type    : req.body.type,
            relation: (req.body.relation.split(",")).map(function(s){ return s.trim()})
        });

        if(post.save())
            res.send({"status": "success"});
        else
            res.send({"status" : "fail"});

    },

    updatePost : function(req, res){

        model.post.findOneAndUpdate({

            _id         : req.body.id

        }, {

            title       : req.body.title,
            body        : req.body.body,
            image       : req.body.image,
            type        : req.body.type,
            relation    : (req.body.relation.split(",")).map(function(s){ return s.trim()})

        }, function(err, doc){

            if(err != null)
                res.status(500).end({"status" : "error"});

            res.json({"status" : "success"});

        });

    },

    suggestPost : function(req, res){

        model.post.find({title : new RegExp(req.params.name, 'i') }, {title : 1}).limit(4).exec(function(err, post){

            if(err != null)
                res.status(501).json({"status" : "fail"});

            res.json({"status" : "success", "data" : post});
        })

    }
};

module.exports = postController;
