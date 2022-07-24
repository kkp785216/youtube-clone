import React, { useEffect, useState } from 'react'
import './Watch.scss'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getVideosList } from '../../../Redux/Actions/video.action'
import WatchSidebar from './WatchSidebar/WatchSidebar'
import request from '../../../Database/Api'
import CategoriesBar from '../../CategoriesBar/CategoriesBar'
import StickyBox from "react-sticky-box";
import WatchInfo from './WatchInfo/WatchInfo'
// import LoadingBar from 'react-top-loading-bar'

const Watch = ({ setProgress }) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { videos, loading, moreDetails, channelDetails, videoCategory } = useSelector(state => state.homeVideos);
  const { activeCategory } = useSelector(state => state.catgoryState);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [currentVideoComments, setCurrentVideoComments] = useState(null);

  let query = searchParams.get('v');

  useEffect(() => {
    const videoDetails = { video: {}, channel: {} };
    const res = request("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        id: query
      }
    });
    res.then(data => {
      let video = data.data.items[0];
      videoDetails.video = video;
      const get_channel_details = request("/channels", {
        params: {
          part: 'snippet,statistics',
          id: video.snippet.channelId
        }
      });
      get_channel_details.then(cdata => {
        let channel = cdata.data.items[0];
        videoDetails.channel = channel;
        setCurrentVideo(videoDetails);

        // fetch comments
        const res = request("/commentThreads", {
          params: {
            part: "snippet,replies",
            videoId: query,
            maxResults: 10
          }
        });
        setCurrentVideoComments(res);
      })
    });
  }, [query]);

  useEffect(() => {
    if (videos.length === 0 || videoCategory !== activeCategory.title) {
      dispatch(getVideosList(activeCategory, 20));
    }
  }, [dispatch, activeCategory, videoCategory, videos.length]);

  useEffect(() => {
    setProgress(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    window.scroll({ top: 0 });
  }, []);

  return (
    <div className="row">
      <div className="col col-8">
        <StickyBox offsetTop={84} offsetBottom={24}>
          <div className="watch-screen-player">
            <iframe
              src={`https://www.youtube.com/embed/${query}?autoplay=1&mute=0`}
              title='Youtube Watch'
              frameBorder="0"
              allowFullScreen
              width='100%'
              id="youtube-player-screen"
              className='iframe'
              onLoad={() => { setProgress(100); window.scroll({ top: 0 }) }}
            ></iframe>
            <div className="iframe-overlay"></div>
          </div>
          <WatchInfo currentVideo={currentVideo} currentVideoComments={currentVideoComments} />
        </StickyBox>
      </div>

      <div className='col col-4'>
        <StickyBox offsetTop={84} offsetBottom={24}>
          <CategoriesBar className='watch-category-bar' />
          {
            videos.map((videos, index) => (
              <div className='col' key={index}>
                <WatchSidebar videos={videos} loading={loading} moreDetails={moreDetails[index]} channelDetails={channelDetails[index]} />
              </div>
            ))
          }
        </StickyBox>
      </div>
    </div>
  )
}

export default Watch  