const router = require("express").Router();
const { bookHotel, getByUser, cancel, updateBooking , getAllBookings, getBookingsByUser, rescheduleBooking} =
  require("../controllers/bookingController");
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

router.post("/",auth, bookHotel);   //For booking the hotel
router.get("/",auth, getByUser);    //For getting the hotels booked by particular user

router.put("/:id", updateBooking);  //Not in use
 
router.delete("/:id",auth, cancel);    //For cancelling the booking
 
//Admin Route
router.get("/all",auth, admin, getAllBookings);    //Used by Admin

router.get('/user/:userId',auth, getBookingsByUser);  

router.put("/reschedule/:id",auth, rescheduleBooking);   //For rescheduling

module.exports = router;
