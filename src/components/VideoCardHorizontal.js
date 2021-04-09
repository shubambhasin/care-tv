import React from "react";
import { FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FcBriefcase} from "react-icons/fc"
import { ADD_TO_HISTORY, ADD_TO_SAVED_VIDEOS, isVideoInSaved, REMOVE_FROM_HISTORY, REMOVE_FROM_SAVED_VIDEOS } from "../reducer/actions";
import { useVideo } from "../context/videoLibraryContext";

const VideoCardHorizontal = ({ video }) => {

  const { state, dispatch } = useVideo()

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
    <div className="video-card-horizontal">
      <Link to={`/watch/${video.id}`} >
      <img
        src="https://i.ytimg.com/vi/l1RSDqTx0Wg/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCrCAUXizWeKC7tBNvMHUE3aRESlg"
        alt="video-thumbnail" className="responsive"
      />
      </Link>
      <div className="video-info-flex p1-rem">
        <div className="video-icon">
          <FcBriefcase size={28} />
        </div>
        <div className="video-info">
          <h1 className=" h5 bold">Name: {video.name}</h1>
          <p>Channel name</p>
          <span>20l views</span> * <span>{video.timeAgo}</span> 
        </div>
      </div>
      <Link to={`/watch/${video.id}`} onClick={() => addToHistory(state, video)}
         className="btn btn-green">
        Watch now
      </Link>
      <button className="btn btn-blue" onClick={() => addToSaved(state, video)}>Save</button>
    </div>
  );
};

export default VideoCardHorizontal;
