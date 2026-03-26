// import Booking from "../models/Booking.js";
const Booking = require("../models/Booking");

exports.getBookingReport = async (req, res) => {
  try {
    const { userId, location, month, year } = req.query;
    console.log(userId);
    console.log(location);
    console.log(month);
    console.log(year);
    
    if (!userId) {
      return res.json({ success: false, message: "User ID required" });
    }

    let filter = { userId };

    // Filter by month & year using booking date
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 1);
      console.log(startDate);
      console.log(endDate);
      
      filter.fromDate  = {
        $gte: startDate,
        $lt: endDate
      };
    }

    // Fetch bookings with hotel data which are booked and cancelled, return separately
    let bookings = await Booking.find(filter)
      .populate("hotelId");

    // Filter by location if provided
    if (location) {
      bookings = bookings.filter(b => 
        b.hotelId?.location === location
      );
    }

    const booked = bookings.filter(b => b.status === "booked").length;
    const cancelled = bookings.filter(b => b.status === "cancelled").length;

    res.json({
      success: true,
      booked,
      cancelled
    });

  } catch (err) {
    console.error("Report Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
