const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
    try {
        mongoose.connect(mongoURI);
        console.log("connected to mongo");
    }
    catch(error){
        console.error("Error connecting to MongoDB:", error.message);
    }
}

module.exports = connectToMongo;