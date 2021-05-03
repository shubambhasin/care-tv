import React, { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import { useAuth } from "../context/AuthContext";
import { videoData } from "../data/Data";
import axios from "axios";
import { useVideo } from "../context/videoLibraryContext";
import { ADD_ALL_VIDEOS } from "../reducer/actions";
import Loader from "../components/loader/Loader";
const Homepage = () => {
  const { login } = useAuth();
  const { state, dispatch, loader, setLoader } = useVideo();
  const [abc, setAbc] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const videoData = await axios.get(
          "https://videolibrarybackend.shubambhasin.repl.co/videos"
        );
        setLoader(false)

        console.log(videoData.data.data);
        setAbc(videoData.data.data);
        console.log(abc);
        dispatch({ type: ADD_ALL_VIDEOS, payload: videoData.data.data });
      } catch (err) {
        setLoader(false)
        console.log(err);
      }
    })();
  }, []);

  /*
   
  */

  return (
    <div className="homepage content-container">
      {/* <ChildNav/> */}
      <div className="video-card-container">
        {!loader && state.allVideos.map((data) => {
          return <VideoCard key={data._id} video={data} />;
        })}
        {loader && <Loader />}
      </div>
    </div>
  );
};

export default Homepage;
