const Booking = require("../models/Booking");


//For adding the 
exports.bookHotel = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json(booking);
  } catch (err) {
    res.json({ error: err.message });
  }
};

//Return the hotel booked by the particular user
exports.getByUser = async (req, res) => {
  // const userId = req.headers['x-user-id'];
  const { userId } = req.query;
  console.log(userId);
  
if (!userId) return res.status(401).json({ msg: 'User not logged in' });

  //This will return the {userId, {hotelId_object}, fromDate, toDate, roomType, description, status,createdOn} on the basis of userId
  const bookings = (await Booking.find({ userId }).populate("hotelId").sort({createdOn:-1}));   
  res.json(bookings);
};

//Only changing the status of booking from "booked" -> "cancelled"
exports.cancel = async (req, res) => {
  await Booking.findByIdAndUpdate(req.params.id, { status: "cancelled" });
  res.json({ success: true });
};


// Not in use
exports.updateBooking = async (req, res) => {
  const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// In use by Admin
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId").populate("hotelId");
    res.json({ success: true, bookings });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

//For Report section
exports.getBookingsByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const bookings = await Booking.find({ userId });

    res.json({ success: true, bookings });

  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

exports.rescheduleBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updated = await Booking.findByIdAndUpdate(
      bookingId,
      {
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        roomType: req.body.roomType,
        description: req.body.description,
        status:req.body.status
      },
      { new: true }
    );

    if (!updated) {
      return res.json({ success: false, msg: "Booking not found" });
    }

    return res.json({ success: true, booking: updated });

  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};



