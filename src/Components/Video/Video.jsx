import React, { useState, useEffect } from 'react'
import request from '../../Database/Api'
import './_video.scss'
import moment from 'moment'

const Video = ({ videos }) => {

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

  const [videoDetails, setVideoDetails] = useState(null);
  // Fetch more video details
  useEffect(() => {
    const get_video_details = async () => {
      const res = await request('/videos', {
        params: {
          part: 'contentDetails,statistics',
          id: videos.id.videoId
        }
      });
      console.log(res.data.items[0]);
      setVideoDetails(res.data.items[0]);
    }
    get_video_details();
  }, [videos.id.videoId]);

  function duration(input) {
    const seconds = moment.duration(input).asSeconds();
    const _duration = moment.utc(seconds * 1000).format("mm:ss");
    return _duration;
  }

  const [channelImg, setChannelImg] = useState("");
  // fetch channel icons
  useEffect(() => {
    const get_channel_details = async () => {
      const res = await request('/channels', {
        params: {
          part: 'snippet',
          id: videos.snippet.channelId
        }
      });
      setChannelImg(res.data.items[0].snippet.thumbnails.default.url);
    }
    get_channel_details();
  }, [videos.snippet.channelId]);


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