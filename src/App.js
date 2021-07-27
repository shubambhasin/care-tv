import React, { useEffect } from "react";
import "./App.css";
import ChildNav from "./components/ChildNav";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useSidebar } from "./context/sidebarContext";
import { useAuth } from "./context/AuthContext";
import { instance } from "./api/axiosapi";
import { Toaster } from "react-hot-toast";
import { MyRoutes } from "./utils/MyRoutes";
function App() {
  
  const {authToken} = useAuth();

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
    handleResize()
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
      <MyRoutes/>
    </div>
  );
}

export default App;
