import React, { useEffect } from "react";
import VideoCard from "../components/VideoCard";
import axios from "axios";
import { useVideo } from "../context/videoLibraryContext";
import { ADD_ALL_VIDEOS } from "../reducer/actions";
import Loader from "../components/loader/Loader";
import { useAuth } from "../context/AuthContext";

const Homepage = () => {
  const { state, dispatch, loader, setLoader } = useVideo();
  const { authToken } = useAuth()
  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const videoData = await axios.get(
          "https://videolibrarybackend.shubambhasin.repl.co/videos", {
            headers: {
              authorization: authToken
            }
          }
        );
        setLoader(false);
        console.log(videoData.data.data);     
        dispatch({ type: ADD_ALL_VIDEOS, payload: videoData.data.data });
      } catch (err) {
        setLoader(false);
        console.log(err);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="homepage content-container">
      {/* <ChildNav/> */}
        {loader && <Loader />}
      {/* <Sidebar /> */}
      <div className="video-card-container">
        {!loader &&
          state.allVideos.map((data) => {
            return <VideoCard key={data._id} video={data} />;
          })}
      </div>
    </div>
  );
};

export default Homepage;
