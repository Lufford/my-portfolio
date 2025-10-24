import './App.css'
import { Link, Route, Routes } from 'react-router';
import Home from './homepage/home';
import Projects from './projects/Projects';
import VideoProject from './projects/project-components/video-project';

function App() {

  return (
      <div className='flex-col'>
        <nav className="fixed left-0 h-full text-3xl z-10 w-45 px-7 py-100 flex flex-col gap-30 bg-stone-900 overflow-x-hidden overflow-y-hidden">
          <Link to="/" >Home</Link>
          <Link to="/projects">Projects</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/video-Project' element={<VideoProject />}></Route>
        </Routes>
      </div>
  )
}

export default App
