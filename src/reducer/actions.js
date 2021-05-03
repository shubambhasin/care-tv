export const ADD_TO_SAVED_VIDEOS = "SAVED_VIDEOS";
export const ADD_ALL_VIDEOS = "ADD_ALL_VIDEOS";
export const REMOVE_FROM_SAVED_VIDEOS = "REMOVE_FROM_SAVED_VIDEOS";
export const ADD_TO_HISTORY = "ADD_TO_HISTORY";
export const REMOVE_FROM_HISTORY = "REMOVE_FROM_HISTORY";
export const ADD_TO_LIKED_VIDEOS = "ADD_TO_LIKED_VIDEOS";
export const REMOVE_FROM_LIKED_VIDEOS = "REMOVE_FROM_LIKED_VIDEOS";
export const ADD_TO_UNLIKED_VIDEOS = "ADD_TO_UNLIKED_VIDEOS";
export const REMOVE_FROM_UNLIKED_VIDEOS = "REMOVE_FROM_UNLIKED_VIDEOS";
export const ADD_TO_PLAYLIST = "ADD_TO_PLAYLISTS";

export const isVideoInSaved = (state, video) => {
  if (state.savedVideos.filter((data) => data.id === video.id).length === 0) {
    return false;
  } else {
    return true;
  }
};

export const isVideoInLiked = (state, video) => {
  if (state.likedVideos.filter((data) => data.id === video.id).length === 0) {
    return false;
  } else {
    return true;
  }
};

export const isVideoInUnliked = (state, video) => {
  if (state.unlikedVideos.filter((data) => data.id === video.id).length === 0) {
    return false;
  } else {
    return true;
  }
};

export const isWatched = (state, video) => {
  if (state.history.filter((data) => data.id === video.id).length === 0) {
    return false;
  } else {
    return true;
  }
};

export const checkLogin = (login, setLogin) => {
  if (login) {
    setLogin(false);
  }
};

export const getFilteredData = (videos, category) => {
  return videos
    .filter((video) => (video.category === category))
};