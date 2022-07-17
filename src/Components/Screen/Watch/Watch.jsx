import React, { useEffect, useState } from 'react'
import './Watch.scss'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getVideosByCategory, getVideosList } from '../../../Redux/Actions/video.action'
import WatchSidebar from './WatchSidebar/WatchSidebar'
import request from '../../../Database/Api'

const Watch = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [iframeLoad, setIframeLoad] = useState(false);

  const dispatch = useDispatch();
  const { videos, loading, moreDetails, channelDetails, videoCategory } = useSelector(state => state.homeVideos);
  const { activeCategory } = useSelector(state => state.catgoryState);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    let videoDetails = { video: {}, channel: {} };
    const res = request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        id: searchParams.get('v')
      }
    });
    res.then(data => {
      let video = data.data.items[0];
      videoDetails.video = video;
      const get_channel_details = request("/channels", {
        params: {
          part: 'snippet',
          id: video.snippet.channelId
        }
      });
      get_channel_details.then(cdata => {
        let channel = cdata.data.items[0];
        videoDetails.channel = channel;
        setCurrentVideo(videoDetails);
        console.log(videoDetails)
      })
    });
  }, [searchParams]);

  useEffect(() => {
    if (videos.length === 0 || videoCategory !== activeCategory) {
      activeCategory === 'All' ? dispatch(getVideosList(activeCategory, 20)) : dispatch(getVideosByCategory(activeCategory, 20));
    }
  }, [dispatch, activeCategory, videoCategory, videos.length]);

  const publishedAt = (input) => {
    let date = new Date(input);
    let a = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()] + ' ' + date.getDay() + ' ' + date.getFullYear()
    return a;
  }

  const setDescription = (input) => {
    try{
      document.querySelector('.description').innerText = input;
    }catch{}
  }

  return (
    <div className="row">
      <div className="col-8">
        <div className="watch-screen-player">
          <iframe
            onLoad={() => { setIframeLoad(true) }}
            src={`https://www.youtube.com/embed/${searchParams.get('v')}?autoplay=1`}
            title='Youtube Watch'
            frameBorder="0"
            allowFullScreen
            width='100%'
            id="youtube-player-screen"
            className='iframe'
          ></iframe>
        </div>
        {currentVideo && iframeLoad && <>
          <h3>{currentVideo.video.snippet.title}</h3>
          <span>{currentVideo.video.statistics.viewCount} views</span>
          <span> • </span>
          <span>{publishedAt(currentVideo.video.snippet.publishedAt)}</span>
          <p className='description'>{setDescription(currentVideo.video.snippet.description)}</p>
        </>}

      </div>
      <div className="col-4">
        {iframeLoad && iframeLoad &&
          videos.map((videos, index) => (
            <div className='col' key={index}>
              <WatchSidebar videos={videos} loading={loading} moreDetails={moreDetails[index]} channelDetails={channelDetails[index]} />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Watch  