import React, { useEffect } from "react";
import VideoCard from "../components/VideoCard";
import axios from "axios";
import { useVideo } from "../context/videoLibraryContext";
import { ADD_ALL_VIDEOS } from "../reducer/actions";
import Loader from "../components/loader/Loader";
import { useAuth } from "../context/AuthContext";
import { useSidebar } from "../context/sidebarContext";
import { instance } from "../api/axiosapi";
import { notify } from "../utils/notification";

const Homepage = () => {
  const { state, dispatch, loader, setLoader } = useVideo();
  const { authToken } = useAuth();
  const { fullwindow, sidebarOpen } = useSidebar();
  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const response = await instance.get("/videos");
        setLoader(false);
        console.log(response);
        if(response.data.success)
        {
          notify("Data fetched successfully ✅")
          dispatch({ type: ADD_ALL_VIDEOS, payload: response.data.data });
        }
        else{

        }
      } catch (error) {
        setLoader(false);
        notify("error occured ❌")
        console.log("error from homepage", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div
        className={`homepage  ${!sidebarOpen && "full-container"} ${
          sidebarOpen && "content-container"
        }`}
      >
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
    </div>
  );
};

export default Homepage;
