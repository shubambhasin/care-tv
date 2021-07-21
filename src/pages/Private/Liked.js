import React, { useEffect, useState } from "react";
import { useVideo } from "../../context/videoLibraryContext";
import { Link } from "react-router-dom";
import VideoCardHorizontal from "../../components/VideoCardHorizontal";
import likedislike from "../../assets/likedislike.svg";
import axios from "axios";
import { ADD_TO_LIKED_VIDEOS } from "../../reducer/actions";
import Loader from "../../components/loader/Loader";
import { useAuth } from "../../context/AuthContext";
import { instance } from "../../api/axiosapi";
import { notify } from "../../utils/notification";
import { useSidebar } from "../../context/sidebarContext";
const Liked = () => {
  const { state, dispatch, loader, setLoader } = useVideo();
  const { isUserLoggedIn, authToken } = useAuth();
  const { sidebarOpen } = useSidebar();
  const [error, setError] = useState({
    auth: "",
  });

  useEffect(() => {
    (async () => {
      // setIsLoader(true);
      try {
        setLoader(true);
        const response = await instance.get("/liked");
        setLoader(false);
        console.log(response);
        if (response.data.success) {
          notify("Data fetched successfully ✅");
          dispatch({
            type: ADD_TO_LIKED_VIDEOS,
            payload: response.data.videos[0].videos,
          });
          if (response.data.error) {
            notify("Cannot fetch data, error occured ❌     ");
            setError({
              ...error,
              auth: "Authentication error, please login again",
            });
          }
        }
      } catch (error) {
        console.log({ error });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn]);

  const clearLiked = async () => {
    try {
      const response = await instance.delete("/liked");
      if (response.data.success) {
        notify("Cleared successfully ✅");
        dispatch({ type: ADD_TO_LIKED_VIDEOS, payload: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`liked  ${sidebarOpen && " content-container"} ${
        !sidebarOpen && "full-container"
      }`}
    >
      <h1 className="h1 f-red t-center">{error.auth}</h1>
      {loader && <Loader />}
      {!loader && (
        <>
          {state.likedVideos.length === 0 ? (
            <span className="center-banners flex-col f-grey">
              <img src={likedislike} className="default-img" alt="like-png" />
              <p className="mtb2-rem">Very busy hmmmmmmm... 😅😅</p>
              <Link to="/" className="btn outline">
                Watch something here{" "}
              </Link>
            </span>
          ) : (
            <>
              <div className="flex aic gap-3 mb1-rem">
                <h1 className="h2">Liked</h1>
                <button className="btn btn-outline" onClick={clearLiked}>
                  Clear Liked Videos
                </button>
              </div>

              {state.likedVideos.map((data, index) => {
                return <VideoCardHorizontal key={index} video={data} />;
              })}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Liked;
