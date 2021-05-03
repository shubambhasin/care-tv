import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { FilterProvider } from "./context/filterContext";
import { PlaylistProvider } from "./context/playlist/PlaylistContext";
import { VideoContextProvider } from "./context/videoLibraryContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PlaylistProvider>
        <FilterProvider>
          <VideoContextProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </VideoContextProvider>
        </FilterProvider>
      </PlaylistProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
