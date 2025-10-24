// const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const Videos = require("./Video");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => { console.log("db connected") })
    .catch((error) => { console.error(`error connecting to db. ${error}`) });

//youtube data api fetch
const fetchYTData = async (id) => {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${id}&key=${process.env.API_KEY}`);
        const data = await response.json();
        const videoData = (data.items[0]);
        const vidTitle = videoData.snippet.title;
        const vidDate = videoData.snippet.publishedAt;
        const vidThumbnail = videoData.snippet.thumbnails.standard.url;
        const vidChannel = videoData.snippet.channelTitle;
        const vidInfo = ({ "title": vidTitle, "date": vidDate, "thumbnail": vidThumbnail, "channel": vidChannel, "id": id });
        return vidInfo;
    }
    catch (e) {
        console.log(e.message);
    }
}

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
        const videoId = req.body;
        const video = await fetchYTData(videoId.id);
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