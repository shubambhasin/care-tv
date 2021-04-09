import React from "react";
import { useParams } from "react-router";
import Player from "../components/Player";
import { videoData } from "../data/Data";

const Watching = () => {
  const { videoId } = useParams();
  return (
    <div className="watching content-container ">
      

      {videoData.filter((data) => data.id === videoId).map((video) => {
          return(
              <Player video={video} />
          )
      })}

    </div>
  );
};

export default Watching;
