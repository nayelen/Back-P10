require("dotenv").config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require("./src/config/db");
const mainRouter = require("./src/api/routes/main");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(express.json());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

app.use(cors());

connectDB();

app.use("/api/v1", mainRouter)

app.use("*", (req, res, next) => {
  return res.status(404).json("Route Not Found")
})

app.listen(3000, () => {
  console.log("http://localhost:3000")
})