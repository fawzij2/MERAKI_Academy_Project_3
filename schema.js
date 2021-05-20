const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const users = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    age: {type:Number, required:true},
    country: String,
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true}
});

users.pre('save',async function(){
    let password = this.password;
    this.email = this.email.toLowerCase();
    console.log(this.email);
    const hashed = await bcrypt.hash(password,10)
    this.password = hashed;
    console.log(this.password);
});

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

const roles = new mongoose.Schema({
    role:{type: String, required:true},
    permissions:{type:[String], required:true}
})

const User = mongoose.model("User",users);
const Article = mongoose.model("Article",articles);
const Comment = mongoose.model("Comment",comments);

module.exports.User = User;
module.exports.Article = Article;
module.exports.Comment = Comment;