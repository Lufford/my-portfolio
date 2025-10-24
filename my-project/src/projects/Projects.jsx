import { Link } from 'react-router';
export default function Projects() {
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center gap-10 p-10 bg-stone-800">
                <h1>Projects</h1>
                <div className="bg-stone-900 max-w-90 p-6 border-1 rounded flex flex-col items-center gap-2.5">
                    <Link to="/video-project" className="text-blue-600 hover:text-blue-400" target='_blank'>Youtube Share List</Link>
                    <p className='text-wrap'>A full-stack webapp built using the MERN stack. Enter a youtube link and press send to parse the video ID. The video ID gets sent to the backend where the Youtube Data API is called 
                        and stored on a MongoDB Atlas cloud database. Solo developed.
                    </p>
                </div>
                <div className="bg-stone-900 max-w-90 p-6 border-1 rounded flex flex-col items-center gap-2.5">
                    <a href="https://github.com/Lufford/Fly-Me-Through-the-Room" className="text-blue-600 hover:text-blue-400" target='_blank'>Fly Me Through the Room</a>
                    <p>A 2D vertical scroller game built using Unity and C#. Fly through the room while collecting crumbs and dodging wasps. Programmed 
                        enemy tracking system and point system for collecting crumbs. Co-developed in a group of 4
                    </p>
                </div>
            </div>

        </>
    );
}