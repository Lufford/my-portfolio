import { Link } from 'react-router';
export default function Projects() {
    return (
        <>
            <div className="flex-nowrap text-center pt-10">
                <h1>Projects</h1>
                <Link to="/video-project">Youtube Share List</Link>
            </div>

        </>
    );
}