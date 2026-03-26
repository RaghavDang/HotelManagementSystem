const authRoutes=require("./routes/authRoutes")
const hotelRoutes=require("./routes/hotelRoutes")
const bookingRoutes=require("./routes/bookingRoutes")
const bookMarkRoutes=require("./routes/bookmarkRoutes")
const reportRoutes=require("./routes/reportRoutes.js")
const setupDatabase = require("./setupdb");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB().then(() => {
  setupDatabase();   // <-- Auto load DB data
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/bookmarks", bookMarkRoutes);
app.use("/api/report", reportRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);
