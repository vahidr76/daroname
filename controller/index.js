/**
 * Created by vahid76 on 7/31/17.
 */

var post = require("./postController");

var controller = {
    search      : post.searchPost,
    insert      : post.insertPost,
    update      : post.updatePost,
    suggest     : post.suggestPost,
    post        : post.getPost
};

module.exports = controller;