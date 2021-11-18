// Require Dependencies
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;
require("dotenv").config();

// Port
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

// Database
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo & Fix depreciation warnings from Mongoose
mongoose.connect(MONGODB_URI)

// Error / success
db.on("error", (err) => console.log(err.message + " is mongod not running?"))
db.on("connected", () => console.log("mongod connected"))
db.on("disconnected", () => console.log("mongod disconnected"))

// Middleware

app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride("_method"));

// Routes
app.get("/", (req,res) => {
    res.send("Hello World")
})


// Tell Express to Listen
app.listen(PORT, () => console.log(`Express is listening on port: ${PORT}`));