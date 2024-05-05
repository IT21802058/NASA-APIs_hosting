const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const axios = require("axios");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Load environment variables
const DEV_URL = process.env.DEV_URL;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors({
    origin: "https://nasa-ap-is-hosting.vercel.app/",
    credentials: true
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB Connection success!..");
});

// Routes
const userRoutes = require("./routes/userRoutes.js");
app.use("/user", userRoutes);

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

app.get('/marsroverphotos', async (req, res) => {
    console.log("mars rover called");
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
        console.error('Error fetching mars rover data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () =>{
    console.log(`Server is up and running on the PORT ${PORT}`);
});
