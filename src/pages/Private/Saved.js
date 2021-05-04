import React, { useEffect } from "react";
import VideoCardHorizontal from "../../components/VideoCardHorizontal";
import { useVideo } from "../../context/videoLibraryContext";
import saved from "../../assets/saved.svg";
import { Link } from "react-router-dom";
import { ADD_TO_SAVED_VIDEOS } from "../../reducer/actions";
import axios from "axios";
const Saved = () => {
  const { state, dispatch } = useVideo();

  
  useEffect(() => {
    ( async () => {
      // setIsLoader(true);
      try {
        const { data } = await axios.get(
          "https://videolibrarybackend.shubambhasin.repl.co/saved"
        );
        console.log(data);
        dispatch({ type: ADD_TO_SAVED_VIDEOS, payload: data });
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  return (
    <div className="saved content-container">
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
    </div>
  );
};

export default Saved;
