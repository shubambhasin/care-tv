import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { PlaylistProvider } from "./context/playlist/PlaylistContext";
import { VideoContextProvider } from "./context/videoLibraryContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PlaylistProvider>
        <VideoContextProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </VideoContextProvider>
      </PlaylistProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
