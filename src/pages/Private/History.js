import React, { useEffect } from "react";
import VideoCardHorizontal from "../../components/VideoCardHorizontal";
import { useVideo } from "../../context/videoLibraryContext";

import history from "../../assets/history.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { ADD_TO_HISTORY } from "../../reducer/actions";
const History = () => {
  const { state, dispatch } = useVideo();

  useEffect(() => {
    ( async () => {
      // setIsLoader(true);
      try {
        const { data } = await axios.get(
          "https://videolibrarybackend.shubambhasin.repl.co/history"
        );
        console.log(data.data);
        dispatch({ type: ADD_TO_HISTORY, payload: data });
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  return (
    <div className="history content-container">
      {state.history.length === 0 ? (
        <span className="center-banners flex-col f-grey">
          <img src={history} className="default-img" alt="history-png" />
          <p className="mtb2-rem">Looks like you are busy these days 😅😅</p>
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
    </div>
  );
};

export default History;
