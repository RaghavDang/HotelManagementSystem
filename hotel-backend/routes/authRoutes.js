const router = require("express").Router();
const { login, register,  changePassword ,updatePreferences} = require("../controllers/authController");
const auth = require('../middleware/authMiddleware');

router.post("/login", login);
router.post("/register", register);
router.post("/update-preferences/:userId",auth, updatePreferences);
router.post("/change-password/:userId",auth, changePassword);


module.exports = router;
