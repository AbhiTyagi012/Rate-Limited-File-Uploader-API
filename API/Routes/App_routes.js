const express = require("express");
const router = express.Router();
const data_model = require("../models/Data_model");


router.get("/slots", data_model.getSlots);
router.post("/book", data_model.createBooking);
router.get("/admin/bookings", data_model.getAllBookings);
router.delete("/admin/bookings/:id", data_model.deleteBooking);


module.exports = router;
