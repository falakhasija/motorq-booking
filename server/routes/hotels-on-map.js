const express = require("express");

const router = express.Router();
const { Hotel } = require("../models/hotel");

router.get("/", async (req, res) => {

    const hotels = await Hotel.find({}, {name: 1, roomsCount:1, location: 1, _id: 0});
    res.send(hotels);
})

module.exports = router;
