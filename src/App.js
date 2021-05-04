import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import ChildNav from "./components/ChildNav";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import History from "./pages/Private/History";
import Homepage from "./pages/Homepage";
import Saved from "./pages/Private/Saved";
import Watching from "./pages/Watching";
import Liked from "./pages/Private/Liked";
import Unliked from "./pages/Private/Unliked";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import PlaylistPage from "./pages/Private/PlaylistPage";

function App() {
  const { login, setLogin } = useAuth();

  const PrivateRoute = (props) => {
    return login ? <Route {...props} /> : <Navigate replace to="/login" />;
  };
  return (
    <div className="App">
      <Navbar />
      <ChildNav />
      <Sidebar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/watch/:videoId" element={<Watching />} />

        <PrivateRoute path="/saved" element={<Saved />} />
        <PrivateRoute path="/history" element={<History />} />
        <PrivateRoute path="/liked" element={<Liked />} />
        <PrivateRoute path="/unliked" element={<Unliked />} />
        <PrivateRoute path="/playlist" element={<PlaylistPage />} />
      </Routes>
    </div>
  );
}

export default App;
