require("dotenv").config();
const mongoose = require("mongoose");

//Connect to database
const connectDB = async () => {
    await mongoose.connect(process.env.DB_URI, { dbName: process.env.DB_NAME });
    console.log("Connected to database")
}



//User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: ' '
    },
    dateOfBirth: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    picture: {
        type: String,
        required: true
    }
});


//User model
const userCollection = mongoose.model("users", userSchema);




module.exports = { connectDB, userCollection };