require("dotenv").config();
const express = require('express')
const mongoose = require("mongoose");
const cors = require('cors')

const app = express()
const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["content-Type", "Authorization"],
}))

app.use(express.json())

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((e) => console.log("Error connecting to MongoDB:", e));


app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong.'
    })
})

app.listen(PORT, () => {
    console.log(`Server connected to : ${PORT}`)
})