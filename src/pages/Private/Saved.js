import React, { useEffect, useState } from "react";
import VideoCardHorizontal from "../../components/VideoCardHorizontal";
import { useVideo } from "../../context/videoLibraryContext";
import saved from "../../assets/saved.svg";
import { Link } from "react-router-dom";
import { ADD_TO_SAVED_VIDEOS } from "../../reducer/actions";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { useAuth } from "../../context/AuthContext";

const Saved = () => {
  const { state, dispatch, loader, setLoader } = useVideo();
  const { isUserLoggedIn, authToken } = useAuth();
  const [error, setError] = useState({
    auth: "",
  });

  useEffect(() => {
    (async () => {
      // setIsLoader(true);
      try {
        setLoader(true);
        const response = await axios.get(
          "https://videolibrarybackend.shubambhasin.repl.co/saved",
          {
            headers: {
              authorization: authToken,
            },
          }
        );

        // console.log("Line 32", response);
        if (response.error) {
          setError({
            ...error,
            auth: "Authentication error, please login again",
          });
        } else {
          setLoader(false);
          // console.log(response.data);
          dispatch({
            type: ADD_TO_SAVED_VIDEOS,
            payload: response.data.videos[0].videos,
          });
        }
      } catch (error) {
        console.log({ error });
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn]);

  return (
    <div className="saved content-container">
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
