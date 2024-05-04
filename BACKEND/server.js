const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const axios = require("axios");

const PORT = process.env.PORT;

dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:4000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Set up MongoDB connection
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB Connection success!..");
});

// Define routes
const userRoutes = require("./routes/userRoutes.js");
app.use("/user", userRoutes);

app.get('/apod', async (req, res) => {
    // APOD route handler
});

app.get('/marsroverphotos', async (req, res) => {
    // Mars rover photos route handler
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});
