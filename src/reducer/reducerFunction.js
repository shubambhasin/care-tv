import {
    ADD_TO_LIKED_VIDEOS,
    ADD_TO_SAVED_VIDEOS,
    ADD_TO_UNLIKED_VIDEOS,
    REMOVE_FROM_SAVED_VIDEOS,
    REMOVE_FROM_LIKED_VIDEOS,
    REMOVE_FROM_UNLIKED_VIDEOS,
    ADD_TO_HISTORY,
    REMOVE_FROM_HISTORY,
    ADD_ALL_VIDEOS,
  } from "./actions";
  
  export const reducerFunction = (state, { type, payload }) => {
    switch (type) {
      case ADD_ALL_VIDEOS: 
      return {

        ...state,
        allVideos: [...payload]

      }
      case ADD_TO_SAVED_VIDEOS:
        return {
          ...state,
          //TODO: savedVideos: [...payload],
          savedVideos: payload,
        };
      case REMOVE_FROM_SAVED_VIDEOS:
        return {
          ...state,
          savedVideos: state.savedVideos.filter((data) => data._id !== payload._id),
        };
      case ADD_TO_LIKED_VIDEOS:
        return {
          ...state,
          likedVideos: [...payload],
        };
      case REMOVE_FROM_LIKED_VIDEOS:
        return {
          ...state,
          likedVideos: state.likedVideos.filter((data) => data._id !== payload._id),
        };
  
      case ADD_TO_UNLIKED_VIDEOS:
        return {
          ...state,
          unlikedVideos: [...payload],
        };
      case REMOVE_FROM_UNLIKED_VIDEOS:
        return {
          ...state,
          unlikedVideos: state.unlikedVideos.filter(
            (data) => data._id !== payload._id
          ),
        };
      case ADD_TO_HISTORY:
        return {
          ...state,
          history: payload,
        };
      case REMOVE_FROM_HISTORY:
        return {
          ...state,
          history: state.history.filter((data) => data._id !== payload._id),
        };
  
      default:
        alert("UNKNOWN ACTION, PLEASE CHECK");
    }
  };
  