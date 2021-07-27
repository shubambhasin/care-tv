import React from "react";
import { Route, Routes } from "react-router";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import History from "../pages/Private/History";
import Liked from "../pages/Private/Liked";
import PlaylistPage from "../pages/Private/PlaylistPage";
import Saved from "../pages/Private/Saved";
import Signup from "../pages/Signup";
import Success from "../pages/Success";
import Watching from "../pages/Watching";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/watch/:videoId" element={<Watching />} />

      <ProtectedRoutes path="/saved" element={<Saved />} />
      <ProtectedRoutes path="/history" element={<History />} />
      <ProtectedRoutes path="/liked" element={<Liked />} />
      <ProtectedRoutes path="/playlist" element={<PlaylistPage />} />
      <ProtectedRoutes path="/success" element={<Success />} />
    </Routes>
  );
};
