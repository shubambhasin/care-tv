import React, { useEffect, useState } from "react";
import VideoCardHorizontal from "../../components/VideoCardHorizontal";
import { useVideo } from "../../context/videoLibraryContext";
import saved from "../../assets/saved.svg";
import { Link } from "react-router-dom";
import { ADD_TO_SAVED_VIDEOS } from "../../reducer/actions";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { useAuth } from "../../context/AuthContext";
import { instance } from "../../api/axiosapi";
import { notify } from "../../utils/notification";
import { useSidebar } from "../../context/sidebarContext";

const Saved = () => {
  const { state, dispatch, loader, setLoader } = useVideo();
  const { isUserLoggedIn } = useAuth();
  const { sidebarOpen } = useSidebar();
  const [error, setError] = useState({
    auth: "",
  });

  useEffect(() => {
    (async () => {
      // setIsLoader(true);
      try {
        setLoader(true);
        const response = await instance.get("/saved");
        setLoader(false);
        if (response.data.success) {
          dispatch({
            type: ADD_TO_SAVED_VIDEOS,
            payload: response.data.videos[0].videos,
          });
        }
        if (response.data.error) {
          notify("Some thing bad happened");
          setError({
            ...error,
            auth: "Authentication error, please login again",
          });
        }
      } catch (error) {
        console.log({ error });
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn]);

  const clearSaved = async () => {
    try {
      const response = await instance.delete("/saved");
      if (response.data.success) {
        notify("Saved videos cleared successfully ✅");
        dispatch({ type: ADD_TO_SAVED_VIDEOS, payload: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`saved ${sidebarOpen && "content-container"} ${
        !sidebarOpen && "full-container"
      } `}
    >
      <h1 className="h1 f-red t-center">{error.auth}</h1>
      {loader && <Loader />}
      {!loader && (
        <div className="saved-card-container">
          {state.savedVideos.length === 0 ? (
            <span className="center-banners flex-col f-grey">
              <img src={saved} className="default-img" alt="like-png" />
              <p className="mtb2-rem">Hey busy you...🤨</p>
              <Link to="/" className="btn outline">
                Watch something here{" "}
              </Link>
            </span>
          ) : (
            <>
              <div className="flex  mb1-rem gap-3 aic">
                <h1 className="h2">Saved videos</h1>
                <button onClick={clearSaved} className="btn btn-outline">
                  Clear All
                </button>
              </div>
              {state.savedVideos.map((data) => {
                return <VideoCardHorizontal key={data._id} video={data} />;
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Saved;
