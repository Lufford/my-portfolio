const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const Videos = require("./Video");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => { console.log("db connected") })
    .catch((error) => { console.error(`error connecting to db. ${error}`) });

app.get("/video-project", async (req, res) => {
    try {
        const video = await Videos.find();
        res.json(video);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

app.post("/video-project", async (req, res) => {

    try {
        const video = req.body;
        let checkVid = await Videos.exists(video);

        if (!checkVid) {
            console.log(video);
            const response = await Videos.create(video);
            console.log("saved video");
            res.json(JSON.stringify(response));
        }
        else {
            res.status(500).json({ message: "Video already exists" });
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
});


app.listen(process.env.PORT || 3000, () => { console.log("server listening at 3000") });