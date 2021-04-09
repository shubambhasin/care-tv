import React from "react";
import VideoCardHorizontal from "../components/VideoCardHorizontal";
import { useVideo } from "../context/videoLibraryContext";
import saved from '../assets/saved.svg'
import { Link } from "react-router-dom";
const Saved = () => {
  const { state } = useVideo();

  return (
    <div className="saved content-container">
<div className="saved-card-container">

{state.savedVideos.length === 0 ? <span className="center-banners flex-col f-grey">
            <img src={saved} className="default-img" alt="like-png" />
            <p className="mtb2-rem">Hey busy you...🤨</p>
            <Link to="/" className="btn outline">Watch something here </Link>

          </span> : <>
          {state.savedVideos.map((data) => {
        return <VideoCardHorizontal video={data} />;
      })}
          </>}





</div>
    </div>
  );
};

export default Saved;
