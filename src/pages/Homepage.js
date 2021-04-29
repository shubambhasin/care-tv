import React from "react";
import VideoCard from "../components/VideoCard";
import { useAuth } from "../context/AuthContext";
import { videoData } from "../data/Data";

const Homepage = () => {

  const { login } = useAuth()
  return (
    <div className="homepage content-container">
      {/* <ChildNav/> */}
      <div className="video-card-container">
        {videoData.map((data) => {
          return <VideoCard video={data} />;
        })}
      </div>
    </div>
  );
};

export default Homepage;
