import { createContext, useContext, useReducer, useState } from "react";
import { playlistReducer } from "./playlistReducer";
export const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
  const [playlistState, dispatchPlaylist] = useReducer(playlistReducer, {
    playlist: [
      {
        id: 1234567890,
        playlistName: "test 1",
        videos: []
      },
    ],
  });
  const [showPlaylist, setShowPlaylist] = useState(false);
  return (
    <PlaylistContext.Provider
      value={{ playlistState, dispatchPlaylist, showPlaylist, setShowPlaylist }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => useContext(PlaylistContext);
