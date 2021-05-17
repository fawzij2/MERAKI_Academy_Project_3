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
    author: {type: Schema.type.ObjectId, ref:"User"}
})