const mongoose = require("mongoose");

const users = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    age: {type:Number, required:true},
    country: String,
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true}
})

const articles = new mongoose.Schema({
    title: String,
    description: String,
    author : { type: mongoose.Schema.ObjectId, ref: "User" },
})

const comments = new mongoose.Schema({
    comment: String,
    commenter:{type: mongoose.Schema.ObjectId, ref:"User"},
    article: {type: mongoose.Schema.ObjectId, ref:"Article"}
})

const User = mongoose.model("User",users);
const Article = mongoose.model("Article",articles);
const Comment = mongoose.model("Comment",comments);

module.exports.User = User;
module.exports.Article = Article;
module.exports.Comment = Comment;