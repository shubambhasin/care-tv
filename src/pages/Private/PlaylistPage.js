import React from "react";
import VideoCard from "../../components/VideoCard";
import { usePlaylist } from "../../context/playlist/PlaylistContext";
import { useSidebar } from "../../context/sidebarContext";

const PlaylistPage = () => {
  const { playlistState } = usePlaylist();
  const { sidebarOpen } = useSidebar();
  return (
    <div
      className={`playlist-page ${sidebarOpen && " content-container"} ${
        !sidebarOpen && "full-container"
      }`}
    >
      <h1>Playlists</h1>
      {playlistState.playlist.map((playlist) => {
        return (
          <div key={playlist.id}>
            <h2 className="h2">{playlist.playlistName}</h2>
            <div className="flex gap-1">
              {playlist.videos.map((video) => {
                return <VideoCard video={video} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistPage;
