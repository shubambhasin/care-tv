import React, { useState } from "react";
import {
  CREATE_NEW_PLAYLIST,
  ADD_VIDEO_TO_PLAYLIST,
  isVideoInPlaylist,
} from "../../context/playlist/playlistActions";
import { usePlaylist } from "../../context/playlist/PlaylistContext";
import { notify } from "../../utils/notification";

const Playlist = ({ video }) => {
  const [newPlaylist, setNewPlaylist] = useState("");
  const { playlistState, dispatchPlaylist, setShowPlaylist } = usePlaylist();

  const addNewPlaylist = () => {
    //TODO: toast alert
    dispatchPlaylist({ type: CREATE_NEW_PLAYLIST, payload: newPlaylist });
    console.log(playlistState.playlist);
  };

  const addVideoToPlaylist = (video, playlistId) => {
    if (isVideoInPlaylist(video, playlistId, playlistState, dispatchPlaylist)) {
      notify("Video already in playlist ✅");
    } else {
      notify("Video added in playlist ✅");
      dispatchPlaylist({
        type: ADD_VIDEO_TO_PLAYLIST,
        payload: { video: video, playlistId: playlistId },
      });
    }
  };

  return (
    <div className="playlist-bg container ">
      <div className="playlist p1-rem relative">
        <div className="relative">
          <h1 className="f-white">Playlists</h1>
          <button
            className="btn btn-sm btn-red absolute top05-rem right05-rem"
            onClick={() => setShowPlaylist(false)}
          >
            x
          </button>
        </div>
        {playlistState.playlist.map((data) => {
          return (
            <div key={data._id} className="flex gap-1 aic f-white mt1-rem">
              <input
                type="checkbox"
                name="playlist-check"
                onChange={() => addVideoToPlaylist(video, data._id)}
              />
              <p>{data.playlistName}</p>
            </div>
          );
        })}
        <div className="absolute bottom05-rem flex aic gap-1 jcc">
          <input
            type="text"
            className="input input-red"
            value={newPlaylist}
            placeholder="Enter a name..."
            onChange={(e) => setNewPlaylist(e.target.value)}
          />
          <button
            className="btn btn-md btn-red"
            onClick={() => addNewPlaylist()}
          >
            New playlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
