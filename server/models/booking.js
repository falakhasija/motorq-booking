const mongoose = require("mongoose");

const Booking = mongoose.model(
    "Booking",
    new mongoose.Schema({
        id: { type: String, required: true, unique: true },
        hotelId: { type: String, required: true },
        touristId: { type: String, required: true },
        arrival: { type: String, required: true },
        departure: { type: String, required: false },
        rooms: { type: Number, required: true },
    })
);

exports.Booking = Booking;