const mongoose = require("mongoose");

const Hotel = mongoose.model(
    "Hotel",
    new mongoose.Schema({
        id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        location: {
            lat: { type: Number, required: true },
            lon: { type: Number, required: true },
        },
        roomsCount: { type: Number, required: true },
        details: { type: String, required: false }
    })
);

exports.Hotel = Hotel;