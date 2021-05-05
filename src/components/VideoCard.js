import React from "react";
import { Link } from "react-router-dom";
import { GoVerified } from "react-icons/go";
import { useVideo } from "../context/videoLibraryContext";
import axios from "axios";

const VideoCard = ({ video }) => {
  const { state,} = useVideo();

  // const addToSaved = (state, data) => {
  //   if (isVideoInSaved(state, data) === false) {
  //     dispatch({ type: ADD_TO_SAVED_VIDEOS, payload: data });
  //   } else {
  //     dispatch({ type: REMOVE_FROM_SAVED_VIDEOS, payload: data });
  //   }
  //   try {
  //     const { res } = axios.post(
  //       "https://videolibrarybackend.shubambhasin.repl.co/saved",data);
  //     const resp = res;
  //     console.log(resp);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const addToHistory = async (state, data) => {
    // dispatch({ type: REMOVE_FROM_HISTORY, payload: data });
    // dispatch({ type: ADD_TO_HISTORY, payload: data });

    try {
      const { res } = axios.post(
        "https://videolibrarybackend.shubambhasin.repl.co/history",
        data
      );
      const resp = res;
      console.log(resp);
    } catch (err) {
      console.error(err);
    }
  };

  return (
   
    <div className="video-card">
      <Link
        className="flex-1"
        onClick={() => addToHistory(state, video)}
        to={`/watch/${video.videoId}`}
      >
        <img
          src={`${video.thumbnail}`}
          className="responsive"
          alt="videoThumbnail"
        />
      </Link>
      <div className="video-info">
        <Link
          className="links-black"
          onClick={() => addToHistory(state, video)}
          to={`/watch/${video.videoId}`}
        >
          <h2 className="h5 bold">{video.name}</h2>
        </Link>
        <p>
          <small className="channel-name">
            {video.category}
            <GoVerified />
          </small>
        </p>
        <small>{Math.floor(Math.random() * 100)}M views</small>
      </div>
     
     {/* //TODO: for save button on homepage */}
     
      {/* <span className="flex">
        <Link
          to={`/watch/${video.videoId}`}
          onClick={() => addToHistory(state, video)}
          className="btn"
          title="Watch"
        >
          <GrView size={28} />
        </Link>
        <button
          title="Save"
          className="btn flex aic"
          onClick={() => addToSaved(state, video)}
        >
          {state.savedVideos.filter((data) => data._id === video._id).length ===
          0 ? (
            <FaRegSave size={28} />
          ) : (
            <FaSave size={28} />
          )}
        </button>
      </span> */}
    </div>
  );
};

export default VideoCard;
