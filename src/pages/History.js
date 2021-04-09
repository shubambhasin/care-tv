import React from 'react'
import VideoCardHorizontal from '../components/VideoCardHorizontal'
import { useVideo } from '../context/videoLibraryContext'


import history from "../assets/history.svg"
import { Link } from 'react-router-dom'
const History = () => {

    const { state, } = useVideo()
    return (
        <div className="history content-container">
            {state.history.length === 0 ?<span className="center-banners flex-col f-grey">
            <img src={history} className="default-img" alt="history-png" />
            <p className="mtb2-rem">Looks like you are busy these days 😅😅</p>
            <Link to="/" className="btn outline">Watch something here </Link>

          </span> : <>
            History

            {state.history.map((data) => {
                return(
                    <VideoCardHorizontal video={data} />
                )
            })}
            </>}
        </div>
    )
}

export default History
