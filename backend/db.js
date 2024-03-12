const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI =  process.env.MONGOURI;

async function connectDB() {
  await mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to Mongo Successfully"))
    .catch((err) => console.log(err));
}

module.exports = connectDB;
