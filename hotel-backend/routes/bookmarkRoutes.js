const router = require("express").Router();
const { add, getByUser, remove , addBookmark, getUserBookmarks} = require("../controllers/bookmarkController");
const auth = require('../middleware/authMiddleware');
// const admin = require('../middleware/adminMiddleware');


// router.post("/", add);
router.get("/",auth, getByUser);   //used to get the bookmarks for the particular user
router.delete("/:id",auth, remove);  //to remove the bookmark from the bookmark tab
router.post("/add",auth, addBookmark);  //used , from book-detail compo
// router.get("/user/:userId", getUserBookmarks);


module.exports = router;
