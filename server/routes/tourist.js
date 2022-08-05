const express = require("express");

const router = express.Router();
const { Tourist } = require("../models/tourist");

router.get("/:id", async (req, res) => {

    const touristId = req.params.id;
    
    const tourist = await Tourist.findOne({id: touristId});
    res.send(tourist);

});

router.post("/", async (req, res) => {

    let tourist = await(Tourist.findOne({mobile: req.body.mobile}));

    if(!tourist){
        tourist = await Tourist.create({

            id: req.body.id,
            name: req.body.name,
            mobile: req.body.mobile,
        });
    }
    res.send(tourist);
});

module.exports = router;
