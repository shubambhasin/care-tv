import React from "react";
import ChildNav from "../components/ChildNav";
import VideoCard from "../components/VideoCard";
import { videoData } from "../data/Data";

const Homepage = () => {
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
