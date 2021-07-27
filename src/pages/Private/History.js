import React, { useEffect, useState } from "react";
import VideoCardHorizontal from "../../components/VideoCardHorizontal";
import { useVideo } from "../../context/videoLibraryContext";

import history from "../../assets/history.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ADD_TO_HISTORY } from "../../reducer/actions";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/loader/Loader";
import { instance } from "../../api/axiosapi";
import { notify } from "../../utils/notification";
import { useSidebar } from "../../context/sidebarContext";
const History = () => {
  const { state, dispatch, loader, setLoader } = useVideo();
  const { login } = useAuth();
  const { sidebarOpen } = useSidebar();
  const navigate = useNavigate();
  const [error, setError] = useState({
    auth: "",
  });

  useEffect(() => {
    if (login) {
      (async () => {
        try {
          setLoader(true);
          const response = await instance.get("/history");

          if (response.data.error) {
            navigate(`/login`);
          }
          if (response.data.success) {
            setLoader(false);
            if (response.data.history.length !== 0) {
              dispatch({
                type: ADD_TO_HISTORY,
                payload: response.data.history[0].videos,
              });
            }
            if (response.data.history.length === 0) {
              dispatch({ type: ADD_TO_HISTORY, payload: [] });
            }
          }
        } catch (error) {
          console.log({ error });
        }
      })();
    } else {
      navigate(`/login`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  const clearHistory = async () => {
    try {
      const response = await instance.delete("/history");
      if (response.data.success) {
        notify("History deleted successfully ✅");
        dispatch({ type: ADD_TO_HISTORY, payload: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`history ${sidebarOpen && " content-container"} ${
        !sidebarOpen && "full-container"
      }`}
    >
      <h1 className="h1 f-red t-center">{error.auth}</h1>
      {loader && <Loader />}
      {!loader && (
        <div className="flex flex-col">
          {state.history.length === 0 ? (
            <span className="center-banners flex-col f-grey">
              <img src={history} className="default-img" alt="history-png" />
              <p className="mtb2-rem">
                Looks like you are busy these days 😅😅
              </p>
              <Link to="/" className="btn outline">
                Watch something here{" "}
              </Link>
            </span>
          ) : (
            <>
              <div className="flex aic gap-3 mb1-rem">
                <h1 className="h2">History</h1>
                <button className="btn btn-outline" onClick={clearHistory}>
                  Clear History
                </button>
              </div>
              {state.history.map((data) => {
                return <VideoCardHorizontal key={data._id} video={data} />;
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default History;
