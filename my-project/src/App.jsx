import { useState } from 'react'
import './App.css'
import { Link, Route, Routes } from 'react-router';
import Home from './homepage/home';
import Projects from './projects/Projects';
import VideoProject from './projects/project-components/video-project';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav className="">
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path='/projects' element={<Projects />}></Route>
        <Route path='/video-Project' element={<VideoProject />}></Route>
      </Routes>
    </>
  )
}

export default App
