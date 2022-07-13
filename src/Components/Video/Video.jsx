import React, { useState, useEffect } from 'react'
import './_video.scss'
import moment from 'moment'

const Video = ({ videos, moreDetails, channelDetails }) => {

  const count = (input) => {
    if (input < 1000) {
      return input
    }
    else if (input < 1000000) {
      return parseInt(input / 1000) + "K"
    }
    else if (input < 1000000000) {
      return parseInt(input / 1000000) + "M"
    }
    else if (input < 1000000000000) {
      return parseInt(input / 1000000000) + "B"
    }
  }

  function duration(input) {
    const seconds = moment.duration(input).asSeconds();
    const _duration = moment.utc(seconds * 1000).format("mm:ss");
    return _duration;
  }

  // Use more video detals
  const [videoDetails, setVideoDetails] = useState(null);
  useEffect(() => {
    moreDetails.then((res) => {
      setVideoDetails(res.data.items[0])
    });
  }, [moreDetails]);

  // fetch channel icons
  const [channelImg, setChannelImg] = useState("");
  useEffect(() => {
    channelDetails.then((res) => {
      setChannelImg(res.data.items[0].snippet.thumbnails.default.url);
    });
  }, [channelDetails]);


  return (
    <div className="video">

      <div className="video__top">
        <img src={videos.snippet.thumbnails.high.url} width="100%" alt="" />
        <span>{videoDetails && duration(videoDetails.contentDetails.duration)}</span>
      </div>

      <div className="video__details">
        <div className="video__channel">
          <img src={channelImg} width="33px" alt="" />
        </div>

        <div className="video__title">
          <h3>{videos.snippet.title}</h3>
          <div className='video__title__info'>
            <span>{videos.snippet.channelTitle}</span>
            <span>{count(videoDetails && videoDetails.statistics.viewCount) + " views"}</span>
            <span> • </span>
            <span>{moment(videos.snippet.publishedAt).fromNow()}</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Video