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

// ***************** player************************************ */
const Player = ({ video }) => {
  const { state } = useVideo();
  const { playlistState, showPlaylist, setShowPlaylist } = usePlaylist();
  const { authToken } = useAuth();

 
  // ADDING TO SAVED
  const addToSaved = async (data) => {
    console.log("Auth token from inside add to videos", authToken)
    try {
      const response = await axios.post(
        "https://videolibrarybackend.shubambhasin.repl.co/saved",
        {videoData: data},{
          headers: { 
            authorization: authToken
          }
        }
      );
      const resp = response;
      console.log(resp);
    } catch (err) {
      console.error(err);
    }
  };
  // ADDING TO LIKED VIDEOS / REMOVING FROM UNLIKED
  const addToLiked = async (state, data) => {

    try {
      const response = await axios.post(
        "https://videolibrarybackend.shubambhasin.repl.co/liked",
        {videoData: data},{
          headers: { 
            authorization: authToken
          }
        }
      );
      const resp = response;
      console.log(resp);
    } catch (err) {
      console.error(err);
    }
  };

  // ADDING TO UNLIKED VIDEOS / REMOVING FROM LIKED VIDEOS
  const addToUnliked = (state, data) => {
    //TODO: unliked video
    // if (isVideoInUnliked(state, data) === false) {
    //   dispatch({ type: ADD_TO_UNLIKED_VIDEOS, payload: data });
    //   dispatch({ type: REMOVE_FROM_LIKED_VIDEOS, payload: data });
    // } else {
    //   dispatch({ type: REMOVE_FROM_UNLIKED_VIDEOS, payload: data });
    // }
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

  // add to history
  //TODO:
  // const addToHistory = (state, data) => {
  //   dispatch({ type: REMOVE_FROM_HISTORY, payload: data });
  //   dispatch({ type: ADD_TO_HISTORY, payload: data });
  // };

  const handlePlaylist = (video) => {
    console.log(video._id);
    console.log(playlistState);
    setShowPlaylist(true);
  };

  return (
    <div className="player">
      <YouTube videoId={`${video.videoId}`} />
      <h1 className="h3">{video.name} </h1>
      <div className="flex">
        <span>
          <p>20k views</p>
        </span>
        <span>
          <button className="btn" onClick={() => addToLiked(state, video)}>
            {state.likedVideos.filter((data) => data.videoId === video.videoId)
              .length === 0 ? (
              <AiOutlineLike size={28} />
            ) : (
              <AiTwotoneLike size={28} />
            )}
          </button>
          <span onClick={() => addToUnliked(state, video)}>
            {state.unlikedVideos.filter(
              (data) => data.videoId === video.videoId
            ).length === 0 ? (
              <AiOutlineDislike size={28} />
            ) : (
              <AiTwotoneDislike size={28} />
            )}
          </span>
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
