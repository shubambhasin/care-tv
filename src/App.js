
import { Route, Routes } from 'react-router';
import './App.css';
import ChildNav from './components/ChildNav';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import History from './pages/History';
import Homepage from './pages/Homepage';
import Saved from './pages/Saved'
import Watching from './pages/Watching';
import Liked from './pages/Liked'
import Unliked from './pages/Unliked'

function App() {
  return (
    <div className="App">

      <Navbar/>
      <Sidebar/>
      <ChildNav/>


      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/saved" element={<Saved/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/watch/:videoId" element={<Watching/>}/>
        <Route path="/liked" element={<Liked/>} />
        <Route path="/unliked" element={<Unliked/>} />

      </Routes>
      
    </div>
  );
}

export default App;
