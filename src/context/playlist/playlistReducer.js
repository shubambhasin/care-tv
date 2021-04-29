import {
  ADD_VIDEO_TO_PLAYLIST,
  CREATE_NEW_PLAYLIST,
  REMOVE_VIDEO_FROM_PLAYLIST,
} from "./playlistActions";
import { v4 } from "uuid";

export const playlistReducer = (playlistState, { type, payload }) => {
  switch (type) {
    case CREATE_NEW_PLAYLIST:
      return {
        ...playlistState,
        playlist: playlistState.playlist.concat({
          id: v4(),
          playlistName: payload,
          videos: [],
        }),
      };
    case ADD_VIDEO_TO_PLAYLIST:
      return {
        ...playlistState,
        playlist: playlistState.playlist.map((playlist) => {
          if (payload.playlistId === playlist.id) {
            if (
              playlist.videos.filter((video) => video.id === payload.video.id)
                .length > 0
            ) {
              return {
                ...playlist,
                videos: playlist.videos.filter(
                  (video) => video.id !== payload.video.id
                ),
              };
            }
            return {
                ...playlist, videos: [...playlist.videos, payload.video]
            }
          }
          return {...playlist}
        })

      };
    case REMOVE_VIDEO_FROM_PLAYLIST:
      return {};
    default:
      console.log("Unknown action please check again !");
  }
};
