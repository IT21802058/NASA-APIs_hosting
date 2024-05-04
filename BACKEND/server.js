const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const axios = require("axios");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8090; // Set a default port if PORT is not provided in .env

// Load environment variables
const URL = process.env.MONGODB_URL;
const DEV_URL = process.env.DEV_URL;

// Connect to MongoDB
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB Connection success!..");
});

// Middleware
app.use(cors({
    origin: [DEV_URL, "https://nasa-apis-gkom-as2.onrender.com"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

// Routes
const userRoutes = require("./routes/userRoutes.js");
app.use("/user", userRoutes);

// APOD endpoint
app.get('/apod', async (req, res) => {
    try {
        const response = await axios.get('https://api.nasa.gov/planetary/apod', {
            params: {
                api_key: req.query.api_key,
                date: req.query.date
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching APOD data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Mars Rover Photos endpoint
app.get('/marsroverphotos', async (req, res) => {
    console.log("Mars rover called");
    console.log(req.query.camera);
    console.log(req.query.api_key);
    try {
        const response = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos', {
            params: {
                sol: 1000,
                camera: req.query.camera,
                api_key: req.query.api_key
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Mars rover data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Listen on specified port
app.listen(PORT, () =>{
    console.log(`Server is up and running on port ${PORT}`);
});
