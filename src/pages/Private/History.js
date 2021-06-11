import React, { useEffect, useState } from "react";
import VideoCardHorizontal from "../../components/VideoCardHorizontal";
import { useVideo } from "../../context/videoLibraryContext";

import history from "../../assets/history.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { ADD_TO_HISTORY } from "../../reducer/actions";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/loader/Loader";
const History = () => {
  const { state, dispatch, loader, setLoader } = useVideo();
  const { isUserLoggedIn, authToken } = useAuth();
  const [error, setError] = useState({
    auth: "",
  });

  useEffect(() => {
    (async () => {
      // setIsLoader(true);
      try {
        setLoader(true)
        const response = await axios.get(
          "https://videolibrarybackend.shubambhasin.repl.co/history",
          {
            headers: {
              authorization: authToken,
            },
          }
        );

        console.log(response.data[0].videos)
        if (response.error) {
          setError({
            ...error,
            auth: "Authentication error, please login again",
          });
        } else {

          setLoader(false);
          dispatch({ type: ADD_TO_HISTORY, payload: response.data[0].videos });
        }
      } catch (error) {
        console.log({ error });
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedIn]);

  return (
    <div className="history content-container">
      <h1 className="h1 f-red t-center">{error.auth}</h1>
      {loader && <Loader />}
      {!loader && (
        <span>
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
              History
              {state.history.map((data) => {
                return <VideoCardHorizontal key={data._id} video={data} />;
              })}
            </>
          )}
        </span>
      )}
    </div>
  );
};

export default History;
