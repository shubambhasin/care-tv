import React from "react";
import { useVideo } from "../../context/videoLibraryContext";
import { Link } from "react-router-dom";
import VideoCardHorizontal from "../../components/VideoCardHorizontal";
import likedislike from "../../assets/likedislike.svg";
const Liked = () => {
  const { state } = useVideo();

  return (
    <div className="liked content-container">
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
          {state.likedVideos.map((data) => {
            return <VideoCardHorizontal video={data} />;
          })}
        </>
      )}
    </div>
  );
};

export default Liked;
