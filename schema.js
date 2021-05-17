const mongoose = require("mongoose");

const users = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    country: String,
    email: String,
    password: String
})

const articles = new mongoose.Schema({
    title: String,
    description: String,
    author : { type: mongoose.Schema.ObjectId, ref: "User" },
})

const User = mongoose.model("User",users);
const Article = mongoose.model("Article",articles);

module.exports.User = User;
module.exports.Article = Article;