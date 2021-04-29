import React from "react";
import { Link } from "react-router-dom";
import { FcBriefcase } from "react-icons/fc";
import { GoVerified } from "react-icons/go";
import {
  ADD_TO_SAVED_VIDEOS,
  isVideoInSaved,
  REMOVE_FROM_HISTORY,
  REMOVE_FROM_SAVED_VIDEOS,
  ADD_TO_HISTORY,
} from "../reducer/actions";
import { useVideo } from "../context/videoLibraryContext";
import { FaRegSave, FaSave } from "react-icons/fa";
import { GrView} from 'react-icons/gr'
const VideoCard = ({ video }) => {
  const { state, dispatch } = useVideo();

  const addToSaved = (state, data) => {
    if (isVideoInSaved(state, data) === false) {
      dispatch({ type: ADD_TO_SAVED_VIDEOS, payload: data });
    } else {
      dispatch({ type: REMOVE_FROM_SAVED_VIDEOS, payload: data });
    }
  };

  const addToHistory = (state, data) => {
    dispatch({ type: REMOVE_FROM_HISTORY, payload: data });
    dispatch({ type: ADD_TO_HISTORY, payload: data });
  };

  return (
    <div className="video-card">
      <Link to={`/watch/${video.id}`}>
        <img
          src="https://i.ytimg.com/vi/l1RSDqTx0Wg/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCrCAUXizWeKC7tBNvMHUE3aRESlg"
          alt="video-thumbnail"
          className="responsive"
        />
      </Link>
      <div className="video-info-flex p1-rem">
        <div className="video-icon">
          <FcBriefcase size={28} />
        </div>
        <div className="video-info">
          <h1 className=" h5 bold">{video.name}</h1>
          <span className="flex aic gap-1 f-grey"><p>Channel name</p>  <GoVerified /></span>
          <span className="f-grey1" >{Math.floor(Math.random()*100)}M views</span> * <span>{video.timeAgo}</span>
        </div>
      </div>
     <span className="flex">
     <Link
        to={`/watch/${video.id}`}
        onClick={() => addToHistory(state, video)}
        className="btn"
        title="Watch"
      >
        <GrView  size={28}/>
      </Link>
      <button title="Save" className="btn flex aic" onClick={() => addToSaved(state, video)}>
      {state.savedVideos.filter((data) => data.id === video.id)
                    .length === 0
                    ? <FaRegSave size={28} />
                    : <FaSave size={28} />}
      </button>
     </span>
    </div>
  );
};

export default VideoCard;
