
const router = require("express").Router();

const { getBookingReport } =  require("../controllers/reportController");
const auth = require('../middleware/authMiddleware');


router.get("/",auth, getBookingReport);

// export default router;
module.exports = router;
