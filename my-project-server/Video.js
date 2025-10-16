const mongoose = require("mongoose");

const Videos = mongoose.model("Videos", new mongoose.Schema({
    title: String,
    date: Date,
    thumbnail: String,
    channel: String,
    id: String
}));

module.exports = Videos;

