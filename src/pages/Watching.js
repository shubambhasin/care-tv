import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import Player from "../components/Player";
import { useSidebar } from "../context/sidebarContext";
import { useVideo } from "../context/videoLibraryContext";
import { ADD_ALL_VIDEOS } from "../reducer/actions";

const Watching = () => {
  const { state, dispatch } = useVideo();
  const { videoId } = useParams();
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  useEffect(() => {
    (async () => {
      try {
        // setLoader(true);
        const videoData = await axios.get(
          "https://videolibrarybackend.shubambhasin.repl.co/videos"
        );
        // setLoader(false)

        console.log(videoData.data.data);
        // setAbc(videoData.data.data);
        // console.log(abc);
        dispatch({ type: ADD_ALL_VIDEOS, payload: videoData.data.data });
      } catch (err) {
        // setLoader(false)
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      handleResize();
    };
  }, [window.innerWidth]);

  return (
    <div
      className={`watching ${!sidebarOpen && "full-container"} ${
        sidebarOpen && "content-container"
      }`}
    >
      {state.allVideos
        .filter((data) => data.videoId === videoId)
        .map((video) => {
          return <Player key={video.videoId} video={video} />;
        })}
    </div>
  );
};

export default Watching;
