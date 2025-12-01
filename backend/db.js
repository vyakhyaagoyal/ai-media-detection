// const mongoose = require("mongoose");
// const mongoURI = process.env.MONGO_URI;

// const connectToMongo = () => {
//     try {
//         mongoose.connect(mongoURI);
//         console.log("connected to mongo");
//     }
//     catch(error){
//         console.error("Error connecting to MongoDB:", error.message);
//     }
// }

// module.exports = connectToMongo;

import mongoose from "mongoose";

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectToMongo;
