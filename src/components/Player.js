import React from "react";
import YouTube from "react-youtube";
import { useVideo } from "../context/videoLibraryContext";
import {
  AiOutlineLike,
  AiTwotoneLike,
  AiOutlineDislike,
  AiTwotoneDislike,
} from "react-icons/ai";
import { FaRegSave, FaSave } from "react-icons/fa";
import Playlist from "../pages/Private/Playlist";
import { usePlaylist } from "../context/playlist/PlaylistContext";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { notify } from "../utils/notification";
import { instance } from "../api/axiosapi";

// ***************** player************************************ */
const Player = ({ video }) => {
  const { state } = useVideo();
  const { playlistState, showPlaylist, setShowPlaylist } = usePlaylist();
  const { authToken } = useAuth();

  const opts = {
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

 
  // ADDING TO SAVED
  const addToSaved = async (data) => {
    console.log("Auth token from inside add to videos", authToken)
    try {
      const response = await instance.post(
        "/saved",
        {videoData: data}
      );
      console.log(response);
      if (response.data.success) {
        notify("Added to saved videos✅");
      }
      if (response.data.error) {
        notify("Error occured while adding ❌");
      }
    } catch (err) {
      console.error(err);
      notify("Error occured while adding ❌");
    }
  };

  const addToLiked = async (state, data) => {

    try {
      const response = await instance.post("/liked",
        {videoData: data});

      console.log(response);
      if(response.data.success)
      {
        notify("Video liked ✅")
      }
    } catch (err) {
      console.error(err);
      notify("Error occured while liking the video ❌")
    }
  };

  const addToUnliked = (state, data) => {
    //TODO: unliked video

    try {
      const { res } = axios.post(
        "https://videolibrarybackend.shubambhasin.repl.co/unliked",
        data
      );
      const resp = res;
      console.log(resp);
    } catch (err) {
      console.error(err);
    }
  };


  const handlePlaylist = (video) => {
    console.log(video._id);
    console.log(playlistState);
    setShowPlaylist(true);
  };

  return (
    <div className="player">
      <YouTube videoId={`${video.videoId}`} opts={opts}/>
      <h1 className="h3">{video.name} </h1>
      <div className="flex">
        <span className="flex aic jcc">
        <span>
          <p>20k views</p>
        </span>
          <button className="btn" onClick={() => addToLiked(state, video)}>
            {state.likedVideos.filter((data) => data.videoId === video.videoId)
              .length === 0 ? (
              <AiOutlineLike size={28} />
            ) : (
              <AiTwotoneLike size={28} />
            )}
          </button>
          {/* <span onClick={() => addToUnliked(state, video)}>
            {state.unlikedVideos.filter(
              (data) => data.videoId === video.videoId
            ).length === 0 ? (
              <AiOutlineDislike size={28} />
            ) : (
              <AiTwotoneDislike size={28} />
            )}
          </span> */}
          <button className="btn" onClick={() => addToSaved(video)}>
            {state.savedVideos.filter((data) => data._id === video._id)
              .length === 0 ? (
              <FaRegSave size={28} />
            ) : (
              <FaSave size={28} />
            )}
          </button>
          <button className="btn btn-red" onClick={() => handlePlaylist(video)}>
            Add to playlist
          </button>
        </span>{" "}
      </div>
      {showPlaylist && <Playlist video={video} />}
    </div>
  );
};

export default Player;
