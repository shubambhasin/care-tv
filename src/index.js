import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { FilterProvider } from "./context/filterContext";
import { PlaylistProvider } from "./context/playlist/PlaylistContext";
import { VideoContextProvider } from "./context/videoLibraryContext";
import { SidebarProvider } from "./context/sidebarContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <PlaylistProvider>
          <FilterProvider>
            <VideoContextProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </VideoContextProvider>
          </FilterProvider>
        </PlaylistProvider>
      </SidebarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
