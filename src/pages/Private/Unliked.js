import React, { useEffect, useState } from "react";
import { useVideo } from "../../context/videoLibraryContext";
import likedislike from "../../assets/likedislike.svg";
import { Link } from "react-router-dom";
import VideoCardHorizontal from "../../components/VideoCardHorizontal";
import axios from "axios";
import { ADD_TO_UNLIKED_VIDEOS } from "../../reducer/actions";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/loader/Loader";
const Unliked = () => {
  const { state, dispatch, loader, setLoader } = useVideo();
  const { isUserLoggedIn, authToken } = useAuth();
  const [error, setError] = useState({
    auth: "",
  });
  useEffect(() => {
    console.log(authToken);

    (async () => {
      // setIsLoader(true);
      try {
        setLoader(true);
        const { data } = await axios.get(
          "https://videolibrarybackend.shubambhasin.repl.co/unliked",
          {
            headers: {
              authorization: authToken,
            },
          }
        );
        if (data.error) {
          setError({
            ...error,
            auth: "Authentication error, please login again",
          });
        } else {
          setLoader(false);
          console.log(data);
          dispatch({ type: ADD_TO_UNLIKED_VIDEOS, payload: data });
        }
      } catch (error) {
        console.log({ error });
      }
    })();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn]);

  return (
    <div className="unliked content-container">
      <h1 className="h1 f-red t-center">{error.auth}</h1>
      {loader && <Loader />}
      {!loader && (
        <span>
          {" "}
          {state.unlikedVideos.length === 0 ? (
            <span className="center-banners flex-col f-grey">
              <img src={likedislike} className="default-img" alt="like-png" />
              <p className="mtb2-rem">Very busy hmmmmmmm... 😅😅</p>
              <Link to="/" className="btn outline">
                Watch something here{" "}
              </Link>
            </span>
          ) : (
            <>
              {state.unlikedVideos.map((data) => {
                return <VideoCardHorizontal key={data._id} video={data} />;
              })}
            </>
          )}
        </span>
      )}
    </div>
  );
};

export default Unliked;
