import React from "react";
import { Link } from "react-router-dom";
import { FcBriefcase } from "react-icons/fc";
import { ADD_TO_HISTORY } from "../reducer/actions";
import { useVideo } from "../context/videoLibraryContext";
import axios from "axios";
import { notify } from "../utils/notification";

const VideoCardHorizontal = ({ video }) => {
  const { state, dispatch } = useVideo();

  // const addToSaved = (state, data) => {
   
  //   try {
  //     const response = axios.post(
  //       "https://videolibrarybackend.shubambhasin.repl.co/saved",
  //       data
  //     );
      
  //     console.log(response);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const addToHistory = async (state, data) => {
  
    try {
        const response = await axios.get(
          "https://videolibrarybackend.shubambhasin.repl.co/history"
        );
       console.log(response);
       if(response.data.success)
       {
        console.log(response.data.history);
        dispatch({ type: ADD_TO_HISTORY, payload: response.data.history });
       }
       else{
        notify("Error occured")
       }
      } catch (error) {
        console.log({ error });
      }
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
