const Bookmark = require("../models/Bookmark");

//Used for the bookmarking the hotel from the hotel-detailed component
exports.addBookmark = async (req, res) => {
  try {
    const {userId,  hotelId } = req.body;
    //  const userId = req.headers['x-user-id'];

    // prevent duplicates
    const exists = await Bookmark.findOne({ userId, hotelId });
    if (exists) {
      return res.json({ success: false, msg: "Already bookmarked" });
    }
    const bookmark = await Bookmark.create({ userId, hotelId });

    return res.json({ success: true, bookmark });

  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

//used to get all the bookmarked hotels
exports.getByUser = async (req, res) => {
  const list = await Bookmark.find({ userId: req.query.userId }).populate("hotelId");
  res.json(list);
};


//Used remove the hotel from bookmark (bookmarked component)
exports.remove = async (req, res) => {
  await Bookmark.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};




// exports.getUserBookmarks = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     // Find all bookmarks for this user
//     const bookmarks = await Bookmark.find({ userId })
//       .populate("hotelId"); // Populate the hotel details

//     return res.json({
//       success: true,
//       bookmarks
//     });

//   } catch (err) {
//     return res.json({
//       success: false,
//       msg: err.message
//     });
//   }
// };

