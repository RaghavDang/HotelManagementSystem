const Hotel = require("../models/Hotel");

//To add new hotel by Admin
exports.addHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);
    res.json(hotel);
  } catch (err) {
    res.json({ error: err.message });
  }
};

//To get all the location 
exports.getLocations = async (req, res) => {
  try {
    const locations = await Hotel.distinct('location')
  
    res.json({ success: true, locations });
  } catch (err) {
     console.log("Hotels are not fetchced");
    res.status(500).json({ success: false, error: err.message });
  }
};


//Get the hotels on basis of frequency
exports.getHotels = async (req, res) => {
  const { location, min, max, search } = req.query;
  let filter = {};

  if (location) filter.location = location;
  if (search) filter.name = { $regex: search, $options: "i" };
  if (min && max) filter.price = { $gte: min, $lte: max };

  const hotels = await Hotel.find(filter);
  res.json(hotels);
};


//Not used
exports.getHotelById = async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  res.json(hotel);
};


