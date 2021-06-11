import React, { useEffect, useState } from "react";
import { useVideo } from "../../context/videoLibraryContext";
import { Link } from "react-router-dom";
import VideoCardHorizontal from "../../components/VideoCardHorizontal";
import likedislike from "../../assets/likedislike.svg";
import axios from "axios";
import { ADD_TO_LIKED_VIDEOS } from "../../reducer/actions";
import Loader from "../../components/loader/Loader";
import { useAuth } from "../../context/AuthContext";
const Liked = () => {
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
          "https://videolibrarybackend.shubambhasin.repl.co/liked",
          {
            headers: {
              authorization: authToken,
            },
          }
        );
        console.log(response.data);
        if (response.data.error) {
          setError({
            ...error,
            auth: "Authentication error, please login again",
          });
        } else {
          setLoader(false);
          console.log(response.data);
          dispatch({
            type: ADD_TO_LIKED_VIDEOS,
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
    <div className="liked content-container">
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
