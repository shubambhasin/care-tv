import React from "react";
import VideoCard from "../../components/VideoCard";
import { usePlaylist } from "../../context/playlist/PlaylistContext";

const PlaylistPage = () => {
  const { playlistState } = usePlaylist();
  return (
    <div className="playlist-page content-container">
      <h1>Playlists</h1>
      {playlistState.playlist.map((playlist) => {
        return (
          <div key={playlist.id}>
            <h2 className="h2">{playlist.playlistName}</h2>
            <div>
              {playlist.videos.map((video) => {
                return <VideoCard video={video} />
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistPage;
