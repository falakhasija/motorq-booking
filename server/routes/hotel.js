const express = require("express");

const router = express.Router();
const { Hotel } = require("../models/hotel");

router.get("/", async (req, res) => {

    const hotels = await Hotel.find();
    res.send(hotels);
})

router.get("/:id", async (req, res) => {

    const hotelId = req.params.id;

    const hotel = await Hotel.findOne({id: hotelId});
    res.send(hotel);
});

router.post("/", async (req, res) => {

    const hotel = await Hotel.create({

        id: req.body.id,
        name: req.body.name,
        location:{
            lat: req.body.location.lat,
            lon: req.body.location.lon,
        },
        roomsCount: req.body.roomsCount,
        details: req.body.details,

    });
    res.send(hotel);
});

router.delete("/:id", async (req, res) => {

    const hotelId = req.params.id;
    const hotel = await Hotel.deleteOne({id: hotelId});
    res.send(hotel);

});

module.exports = router;
