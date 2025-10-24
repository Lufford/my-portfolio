import {useEffect, useState } from "react";


export default function VideoProject() {
    const [ytLink, setYTLink] = useState("");
    const [fetchedVids, setFetchedVids] = useState([]);
    const handleInput = (e) => {
        setYTLink(e.target.value);

    }

    const grabAndPost = async () => {
        const videoId = (ytLink.substring(32, 43)).toString();
        if (!videoId) {
            window.alert("No ID found.");
        }
        else {
            await postData(videoId)
            await fetchDBData();
            setYTLink("");

        }
    }

    const postData = async (id) => {
        try {
            const response = await fetch("https://my-server-gewa.onrender.com/video-project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({"id": id})
            });
            const result = await response.json();
            console.log("Server response: " + result.message);

        } catch (error) {
            console.error("error " + error.message)
        }
    }

    const fetchDBData = async () => {
        try {
            const response = await fetch("https://my-server-gewa.onrender.com/video-project")
            if (!response.ok) {
                throw new Error("no response");
            }
            const data = await response.json();
            data.reverse();
            setFetchedVids(data);
        } catch (error) {
            console.error("error " + error.message);
        }
    }

    useEffect(()=>{
        fetchDBData();
    },[]);

    const listVideos = fetchedVids?.map(video =>
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
            <div className="flex flex-col gap-4 p-4 items-center justify-center">
                <h1>Recommend a Video</h1>
                <div className="flex items-center gap-3" >
                    <input type="text" onChange={handleInput} value={ytLink} placeholder="Enter Youtube Link" autoFocus className="border-1 rounded p-1.5 m-0.5" />
                    <button className="p-1.5 bg-slate-900 border-1 rounded" onClick={grabAndPost}>Send</button>
                </div>
            </div>

            <ul className="min-h-screen flex flex-wrap list-none items-center ml-100">{listVideos}</ul>
        </>
    );
}