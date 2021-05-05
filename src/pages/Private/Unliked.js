import React, { useEffect } from "react";
import { useVideo } from "../../context/videoLibraryContext";
import likedislike from "../../assets/likedislike.svg";
import { Link } from "react-router-dom";
import VideoCardHorizontal from "../../components/VideoCardHorizontal";
import axios from "axios";
import { ADD_TO_UNLIKED_VIDEOS } from "../../reducer/actions";
const Unliked = () => {
  const { state, dispatch, loader, setLoader } = useVideo();

  useEffect(() => {
    ( async () => {
      // setIsLoader(true);
      try {
        setLoader(true);
        const { data } = await axios.get(
          "https://videolibrarybackend.shubambhasin.repl.co/unliked"
        );
        setLoader(false);
        console.log(data);
        dispatch({ type: ADD_TO_UNLIKED_VIDEOS, payload: data });
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);



  return (
    <div className="unliked content-container">
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
            return <VideoCardHorizontal video={data} />;
          })}
        </>
      )}
    </div>
  );
};

export default Unliked;
