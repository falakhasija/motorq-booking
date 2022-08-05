const mongoose = require("mongoose");

const Tourist = mongoose.model(
    "Tourist",
    new mongoose.Schema({
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true, unique: false },
        mobile: { type: String, required: true, unique: true },
    })
);

exports.Tourist = Tourist;