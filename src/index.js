import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { VideoContextProvider } from "./context/videoLibraryContext";

ReactDOM.render(
  <React.StrictMode>
    <VideoContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VideoContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
