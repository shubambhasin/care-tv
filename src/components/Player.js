import React from "react";
import YouTube from "react-youtube";
import styled from "styled-components";
import { useVideo } from "../context/videoLibraryContext";
import {
  ADD_TO_HISTORY,
  ADD_TO_LIKED_VIDEOS,
  ADD_TO_SAVED_VIDEOS,
  ADD_TO_UNLIKED_VIDEOS,
  isVideoInLiked,
  isVideoInSaved,
  isVideoInUnliked,
  REMOVE_FROM_HISTORY,
  REMOVE_FROM_LIKED_VIDEOS,
  REMOVE_FROM_SAVED_VIDEOS,
  REMOVE_FROM_UNLIKED_VIDEOS,
} from "../reducer/actions";

import { AiOutlineLike, AiTwotoneLike, AiOutlineDislike, AiTwotoneDislike } from 'react-icons/ai'
import { FaRegSave, FaSave} from 'react-icons/fa'

const Player = ({ video }) => {
  const { state, dispatch } = useVideo();

  // ADDING TO SAVED
  const addToSaved = (state, data) => {
    if (isVideoInSaved(state, data) === false) {
      dispatch({ type: ADD_TO_SAVED_VIDEOS, payload: data });
    } else {
      dispatch({ type: REMOVE_FROM_SAVED_VIDEOS, payload: data });
    }
  };

  // ADDING TO LIKED VIDEOS / REMOVING FROM UNLIKED
  const addToLiked = (state, data) => {
    if (isVideoInLiked(state, data) === false) {
      dispatch({ type: ADD_TO_LIKED_VIDEOS, payload: data });
      dispatch({ type: REMOVE_FROM_UNLIKED_VIDEOS, payload: data });
    } else {
      dispatch({ type: REMOVE_FROM_LIKED_VIDEOS, payload: data });
    }
  };

  // ADDING TO UNLIKED VIDEOS / REMOVING FROM LIKED VIDEOS
  const addToUnliked = (state, data) => {
    if (isVideoInUnliked(state, data) === false) {
      dispatch({ type: ADD_TO_UNLIKED_VIDEOS, payload: data });
      dispatch({ type: REMOVE_FROM_LIKED_VIDEOS, payload: data });
    } else {
      dispatch({ type: REMOVE_FROM_UNLIKED_VIDEOS, payload: data });
    }
  };

  // add to history
  const addToHistory = (state, data) => {
    dispatch({ type: REMOVE_FROM_HISTORY, payload: data });
    dispatch({ type: ADD_TO_HISTORY, payload: data });
  };

  return (
    <div className="player">
      <YouTube videoId="K3C13blNf0I" />
      <h1 className="h3">Title of video: </h1>
      <div className="flex">
        <span>
          <p>20k views</p>
        </span>
        <span>
          <button className="btn"  onClick={() => addToLiked(state, video)}>{state.likedVideos.filter((data) => data.id === video.id)
                    .length === 0
                    ? <AiOutlineLike size={28} />
                    : <AiTwotoneLike size={28} />}
          </button>
          <span onClick={() => addToUnliked(state, video)}>{state.unlikedVideos.filter((data) => data.id === video.id)
                    .length === 0
                    ? <AiOutlineDislike size={28}/>
                    : <AiTwotoneDislike size={28}/>}</span>
          <button className="btn" onClick={() => addToSaved(state, video)}>{state.savedVideos.filter((data) => data.id === video.id)
                    .length === 0
                    ? <FaRegSave size={28} />
                    : <FaSave size={28} />}</button>
          <button className="btn">Add to playlist</button>
        </span>{" "}
      </div>
    </div>
  );
};

export default Player;
