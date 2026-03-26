const User = require("./models/User");
const Hotel = require("./models/Hotel");
const Booking = require("./models/Booking");
const Bookmark = require("./models/Bookmark");
const bcrypt = require("bcryptjs");

async function setupDatabase() {
  console.log("Checking database...");
  await User.deleteMany({});
  await Hotel.deleteMany({});
  await Booking.deleteMany({});
  await Bookmark.deleteMany({});


  // ------------------ USERS ------------------
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    const hashed = await bcrypt.hash("Raghav@123", 10);
    const hashedadmin = await bcrypt.hash("Admin@123", 10);

    await User.insertMany([{
      name: "Raghav Dang",
      email: "raghavdang060202@gmail.com",
      password: hashed,
      role:"user",
      preferences: {
        defaultLocation: "Pune",
        defaultAmount: 10000
      }
    }, 
    {
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedadmin,
      role:"admin",
      preferences: {
        defaultLocation: "Saharanpur",
        defaultAmount: 10000
      }
    }]);

    console.log("✔ Default user inserted");
  }

  // ------------------ HOTELS ------------------
  const hotelCount = await Hotel.countDocuments();
  if (hotelCount === 0) {
    await Hotel.insertMany([
      {
        name: "Blue Diamond Hotel",
        description: "Luxury stay with premium facilities.",
        location: "Pune",
        rating: 4.5,
        price: 3500,
        roomType: "Deluxe",
        features: ["Free WiFi", "Swimming Pool", "Gym", "Spa", "Restaurant", "Parking"],
        images: ["https://picsum.photos/400/200?random=1"]
      },
      {
        name: "Sunrise Residency",
        description: "Comfortable rooms at affordable prices.",
        location: "Pune",
        rating: 4.0,
        price: 2000,
        roomType: "Standard",
        features: ["Free WiFi", "Restaurant", "Parking", "Room Service"],
        images: ["https://picsum.photos/400/200?random=2"]
      },
      {
        name: "Hotel Royal Palace",
        description: "High-end experience with great service.",
        location: "Mumbai",
        rating: 4.7,
        price: 5500,
        roomType: "Premium",
        features: ["Free WiFi", "Swimming Pool", "Gym", "Bar", "Spa", "Valet Parking"],
        images: ["https://picsum.photos/400/200?random=3"]
      },
      {
        name: "Aura",
        description: "High-end experience with great service.",
        location: "Saharanpur",
        rating: 4.0,
        price: 4500,
        roomType: "Deluxe",
        features: ["Free WiFi", "Restaurant", "Gym", "Parking"],
        images: ["https://picsum.photos/400/200?random=4"]
      },
      {
        name: "Oasis",
        description: "High-end experience with great service.",
        location: "Saharanpur",
        rating: 4.7,
        price: 2500,
        roomType: "Standard",
        features: ["Free WiFi", "Swimming Pool", "Parking"],
        images: ["https://picsum.photos/400/200?random=5"]
      },
      {
        name: "Hyatt",
        description: "High-end experience with great service.",
        location: "Dehradun",
        rating: 5.0,
        price: 8000,
        roomType: "Suite",
        features: ["Free WiFi", "Infinity Pool", "Spa", "Gym", "Bar", "Restaurant", "Valet Parking"],
        images: ["https://picsum.photos/400/200?random=6"]
      }
    ]);
    console.log("✔ Default hotels inserted");
  }
  console.log("✔ Database setup completed!");
}

module.exports = setupDatabase;
