import React from "react";
import { Link } from "react-router-dom";
import { FcBriefcase } from "react-icons/fc";
import { ADD_TO_HISTORY } from "../reducer/actions";
import { useVideo } from "../context/videoLibraryContext";
import axios from "axios";

const VideoCardHorizontal = ({ video }) => {
  const { state, dispatch } = useVideo();

  const addToSaved = (state, data) => {
    //TODO: remove the code
    // if (isVideoInSaved(state, data) === false) {
    //   dispatch({ type: ADD_TO_SAVED_VIDEOS, payload: data });
    // } else {
    //   dispatch({ type: REMOVE_FROM_SAVED_VIDEOS, payload: data });
    // }

    try {
      const { res } = axios.post(
        "https://videolibrarybackend.shubambhasin.repl.co/saved",
        data
      );
      const resp = res;
      console.log(resp);
    } catch (err) {
      console.error(err);
    }
  };

  const addToHistory = (state, data) => {
    // dispatch({ type: REMOVE_FROM_HISTORY, payload: data });
    // dispatch({ type: ADD_TO_HISTORY, payload: data });
    (async () => {
      // setIsLoader(true);
      try {
        const { data } = await axios.get(
          "https://videolibrarybackend.shubambhasin.repl.co/history"
        );
        console.log(data.data);
        dispatch({ type: ADD_TO_HISTORY, payload: data });
      } catch (error) {
        console.log({ error });
      }
    })();
  };

  return (
    <div className="video-card-horizontal aic ">
      <Link to={`/watch/${video.videoId}`}>
        <img src={`${video.thumbnail}`} className="responsive" alt="sdfg" />
      </Link>
      <div className="flex jcc jcc p1-rem">
        <div className=" flex-col">
          <h1 className=" h5 bold">Name: {video.name}</h1>
        <Link
          to={`/watch/${video.videoId}`}
          onClick={() => addToHistory(state, video)}
          className="btn btn-sm btn-green jsfs"
        >
          Watch
        </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoCardHorizontal;
