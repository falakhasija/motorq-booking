const express = require("express");
const mongoose = require("mongoose");
const app = express();

const tourist = require("./routes/tourist");
const hotel = require("./routes/hotel");
const booking = require("./routes/booking")
const hotels_on_map = require("./routes/hotels-on-map")

app.use(express.json());
app.use("/tourists", tourist);
app.use("/hotels", hotel);
app.use("/bookings", booking)
app.use("/hotels-on-map", hotels_on_map);

const DB_USER = "anshul"
const DB_PASSWORD = "bhardwaj9999"
const DB_NAME = "acmetravel"
const CLUSTER_HOST = "cluster0.y6cgr.mongodb.net"

// Setup the DB URI
DB_URI= "mongodb+srv://"+DB_USER+":"+DB_PASSWORD+"@"+CLUSTER_HOST+"/"+DB_NAME+"?retryWrites=true&w=majority"

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Motorq-Booking connected to db");
  })
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Welcome to Motorq-Booking!");
});

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Motorq Listening on port ${port}`);
});
