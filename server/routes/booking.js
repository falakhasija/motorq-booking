const express = require("express");

const router = express.Router();
const { Booking } = require("../models/booking");
const { Hotel } = require("../models/hotel");

router.get("/", async (req, res) => {

    const bookings = await Booking.find();
    res.send(bookings);
})

router.get("/:touristId", async (req, res) => {

    const touristId = req.params.touristId;

    const bookings = await Booking.find({touristId: touristId});
    res.send(bookings);
});

router.post("/", async (req, res) => {

    const hotel = await Hotel.findOne({id: req.body.hotelId});
    if(hotel.roomsCount < req.body.rooms){
        res.sendStatus(400);
        return;
    }

    const booking = await Booking.create({

        id: req.body.id,
        hotelId: req.body.hotelId,
        touristId: req.body.touristId,
        arrival: req.body.arrival,
        departure: req.body.departure,
        rooms: req.body.rooms,
    });
    const updatedRooms = hotel.roomsCount - req.body.rooms;
    hotel.roomsCount = updatedRooms;
    hotel.save();
    res.send(booking);
});

router.delete("/:id", async (req, res) => {

    const bookingId = req.params.id;
    const booking = await Booking.deleteOne({id: bookingId});
    res.send(booking);
});

module.exports = router;
