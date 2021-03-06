import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
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
import Login from "./pages/Login";
import PlaylistPage from "./pages/Private/PlaylistPage";
import Signup from "./pages/Signup";
import Success from "./pages/Success";
import { useSidebar } from "./context/sidebarContext";
import { useAuth } from "./context/AuthContext";
import { instance } from "./api/axiosapi";

import { Toaster } from "react-hot-toast";
function App() {
  const { authToken } = useAuth();
  instance.defaults.headers.common["Authorization"] = authToken || "";
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      handleResize();
    };
  }, []);

  return (
    <div className="App">
      <Toaster />
      <Navbar />
      <ChildNav />
      {sidebarOpen && <Sidebar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/watch/:videoId" element={<Watching />} />

        <Route path="/saved" element={<Saved />} />
        <Route path="/history" element={<History />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/playlist" element={<PlaylistPage />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
