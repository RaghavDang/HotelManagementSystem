const router = require("express").Router();
const { addHotel,getLocations, getHotels, getHotelById } = require("../controllers/hotelController");
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');


router.post("/add",auth,admin, addHotel);
router.get("/",auth, getHotels);
router.get("/locations", getLocations);
router.get("/:id", getHotelById);   //Not used


module.exports = router;
