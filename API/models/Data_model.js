const Booking = require("../queries/Data");


const slots = [
  "2025-06-10 10:00 AM",
  "2025-06-10 11:00 AM",
  "2025-06-10 02:00 PM",
  "2025-06-11 09:00 AM",
  "2025-06-11 01:00 PM",
];


async function getSlots (req, res){
  res.json(slots);
};


async function createBooking (req, res){
  const { name, email, timeSlot } = req.body;
  try {
    const booking = new Booking({ name, email, timeSlot });
    await booking.save();
    res.status(201).json({ message: "Booking successful" });
  } catch (err) {
    res.status(500).json({ message: "Failed to create booking",err});
  }
};


async function getAllBookings (req, res){
  try {
    const bookings = await Booking.find().sort({ bookedAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};


async function deleteBooking(req, res) {
  const { id } = req.params;
  try {
    await Booking.findByIdAndDelete(id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete booking" });
  }
};


module.exports = {
    getSlots,
    createBooking,
    getAllBookings,
    deleteBooking
};
