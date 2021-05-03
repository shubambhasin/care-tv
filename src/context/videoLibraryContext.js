import { createContext, useContext, useReducer, useState } from "react";
import { reducerFunction } from "../reducer/reducerFunction";

export const videoLibraryContext = createContext();

export const VideoContextProvider = ({ children }) => {
  const [loader, setLoader] = useState(false)
  const [state, dispatch] = useReducer(reducerFunction, {
    allVideos: [],
    savedVideos: [],
    likedVideos: [],
    unlikedVideos: [],
    history: [],
    myPlaylist: [],
    playlist: {
      overlay: false,
      list: [
        {
          
        }
      ]
    },
  });
  return (
    <div>
      <videoLibraryContext.Provider value={{ state, dispatch, loader, setLoader }}>
        {children}
      </videoLibraryContext.Provider>
    </div>
  );
};

export const useVideo = () => useContext(videoLibraryContext);
