import { createElement, useEffect, useState } from "react";


export default function VideoProject() {
    const key = import.meta.env.VITE_API_KEY;
    const [ytLink, setYTLink] = useState("");
    const [vidInfo, setvidInfo] = useState({});
    const [fetchedVids, setFetchedVids] = useState([]);
    const handleInput = (e) => {
        setYTLink(e.target.value);
    }

    console.log(key);
    const fetchYTData = async () => {
        try {
            const videoId = (ytLink.substring(32, 43)).toString();
            //secure api
            const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${key}`);
            const data = await response.json();
            const videoData = (data.items[0]);
            const vidTitle = videoData.snippet.title;
            const vidDate = videoData.snippet.publishedAt;
            const vidThumbnail = videoData.snippet.thumbnails.standard.url;
            const vidChannel = videoData.snippet.channelTitle;
            setvidInfo({ "title": vidTitle, "date": vidDate, "thumbnail": vidThumbnail, "channel": vidChannel, "id": videoId });
            //parse into json to store in db
        }
        catch (e) {
            console.log(e.message);
        }
    }

    const sendData = async () => {
        try {
            const response = await fetch("http://localhost:3000/video-project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(vidInfo)
            });
            const result = await response.json();
            console.log("Server response " + result.message);

        } catch (error) {
            console.error("error " + error.message)
        }
    }

    const fetchDBData = async () => {
        try {
            const response = await fetch("http://localhost:3000/video-project")
            if (!response.ok) {
                throw new Error("no response");
            }
            const data = await response.json();
            setFetchedVids(data);
        } catch (error) {
            console.error("error " + error.message);
        }
    }

    useEffect(() => {
        sendData();
        setYTLink("");
        fetchDBData();
    }, [vidInfo])

    // 

    const listVideos = fetchedVids.map(video =>
        <li key={video.id} className="m-1.5">
            <div className="m-3 border-2 rounded p-4 size-150 bg-slate-700">
                <h2 className="mb-3.5 font-bold">{video.title}</h2>
                <h3 className="mb-2.5">by {video.channel}</h3>
                <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank"><img src={`${video.thumbnail}`} className="border-8 border-indigo-400 hover:border-indigo-500 rounded"></img></a>
                <p className="mt-2.5">Uploaded on {video.date.slice(0, 10)}<br></br>

                </p>
            </div>
        </li>
    );




    return (
        <>
            <div className="flex-nowrap bg-slate-600 place-content-center">
                <h1>Recommend me a Video</h1>
                <div className="flex-nowrap" >
                    <input type="text" onChange={handleInput} value={ytLink} placeholder="Enter youtube link" className="border-1" />
                    <button className="p-1.5 bg-slate-900 border-1 rounded" onClick={fetchYTData}>Ok</button>
                </div>

            </div>

            <ul className="flex flex-wrap list-none items-center">{listVideos}</ul>
        </>
    );
}