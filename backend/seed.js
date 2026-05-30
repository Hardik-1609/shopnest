const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./model/User");
const Product = require("./model/Product");

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log("Database connected for seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log("Cleared existing data");

    // Hash passwords
    const hashedPassword1 = await bcryptjs.hash("password123", 10);
    const hashedPassword2 = await bcryptjs.hash("admin123", 10);
    const hashedPassword3 = await bcryptjs.hash("user456", 10);

    // Seed Users
    const users = await User.insertMany([
      {
        name: "Admin User",
        email: "admin@shopnest.com",
        password: hashedPassword2,
        role: "admin",
        verifyed: true,
      },
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword1,
        role: "user",
        verifyed: true,
      },
      {
        name: "Sarah Smith",
        email: "sarah@example.com",
        password: hashedPassword3,
        role: "user",
        verifyed: true,
      },
      {
        name: "Mike Johnson",
        email: "mike@example.com",
        password: hashedPassword1,
        role: "user",
        verifyed: false,
      },
    ]);
    console.log(`${users.length} users seeded successfully`);

    // Seed Products
    const products = await Product.insertMany([
      {
        name: "Wireless Headphones",
        description:
          "High-quality wireless headphones with noise cancellation and 30-hour battery life",
        price: 5999,
        category: "Electronics",
        stock: 50,
        imageUrl:
          "https://via.placeholder.com/300x300?text=Wireless+Headphones",
        ratings: 4.5,
        numOfReviews: 120,
      },
      {
        name: "USB-C Cable",
        description: "Durable 2-meter USB-C to USB-C charging cable",
        price: 499,
        category: "Accessories",
        stock: 200,
        imageUrl: "https://via.placeholder.com/300x300?text=USB-C+Cable",
        ratings: 4.2,
        numOfReviews: 85,
      },
      {
        name: "Smartphone Stand",
        description: "Adjustable phone stand for desk, compatible with all phones",
        price: 799,
        category: "Accessories",
        stock: 150,
        imageUrl: "https://via.placeholder.com/300x300?text=Phone+Stand",
        ratings: 4.7,
        numOfReviews: 95,
      },
      {
        name: "4K Webcam",
        description: "Professional 4K webcam with auto-focus and built-in microphone",
        price: 8999,
        category: "Electronics",
        stock: 30,
        imageUrl: "https://via.placeholder.com/300x300?text=4K+Webcam",
        ratings: 4.6,
        numOfReviews: 45,
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with cherry mx switches",
        price: 4499,
        category: "Peripherals",
        stock: 40,
        imageUrl: "https://via.placeholder.com/300x300?text=Mechanical+Keyboard",
        ratings: 4.8,
        numOfReviews: 200,
      },
      {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with 18-month battery life",
        price: 1299,
        category: "Peripherals",
        stock: 100,
        imageUrl: "https://via.placeholder.com/300x300?text=Wireless+Mouse",
        ratings: 4.4,
        numOfReviews: 150,
      },
      {
        name: "Laptop Stand",
        description: "Aluminum laptop stand for improved ergonomics",
        price: 1999,
        category: "Accessories",
        stock: 75,
        imageUrl: "https://via.placeholder.com/300x300?text=Laptop+Stand",
        ratings: 4.5,
        numOfReviews: 60,
      },
      {
        name: "Power Bank 20000mAh",
        description: "Fast charging power bank with multiple USB ports",
        price: 2499,
        category: "Electronics",
        stock: 120,
        imageUrl: "https://via.placeholder.com/300x300?text=Power+Bank",
        ratings: 4.3,
        numOfReviews: 110,
      },
      {
        name: "Screen Protector (Tempered Glass)",
        description: "9H hardness tempered glass screen protector for smartphones",
        price: 299,
        category: "Accessories",
        stock: 500,
        imageUrl: "https://via.placeholder.com/300x300?text=Screen+Protector",
        ratings: 4.1,
        numOfReviews: 75,
      },
      {
        name: "USB Hub 7 Port",
        description: "Multi-port USB hub with fast data transfer speeds",
        price: 1799,
        category: "Peripherals",
        stock: 60,
        imageUrl: "https://via.placeholder.com/300x300?text=USB+Hub",
        ratings: 4.6,
        numOfReviews: 80,
      },
      {
        name: "Phone Case (Premium Leather)",
        description: "Genuine leather phone case with card slots",
        price: 899,
        category: "Accessories",
        stock: 200,
        imageUrl: "https://via.placeholder.com/300x300?text=Phone+Case",
        ratings: 4.4,
        numOfReviews: 130,
      },
      {
        name: "Laptop Cooling Pad",
        description: "Quiet laptop cooling pad with adjustable speed",
        price: 2999,
        category: "Peripherals",
        stock: 45,
        imageUrl: "https://via.placeholder.com/300x300?text=Cooling+Pad",
        ratings: 4.5,
        numOfReviews: 70,
      },
    ]);
    console.log(`${products.length} products seeded successfully`);

    console.log("\n✓ Database seeding completed successfully!");
    console.log(`Total Users: ${users.length}`);
    console.log(`Total Products: ${products.length}`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error.message);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();