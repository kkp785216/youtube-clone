import React, { useEffect, useState } from 'react'
import './Watch.scss'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getVideosList } from '../../../Redux/Actions/video.action'
import WatchSidebar from './WatchSidebar/WatchSidebar'
import request from '../../../Database/Api'
import CategoriesBar from '../../CategoriesBar/CategoriesBar'
import StickyBox from "react-sticky-box";
import { MdOutlineThumbUpOffAlt, MdThumbUp, MdOutlineThumbDownAlt, MdThumbDown } from 'react-icons/md'
import { BiShare } from 'react-icons/bi'

const Watch = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let [iframeLoad, setIframeLoad] = useState(false);
  let [liked, setLiked] = useState(false);
  let [disliked, setDisliked] = useState(false);

  const dispatch = useDispatch();
  const { videos, loading, moreDetails, channelDetails, videoCategory } = useSelector(state => state.homeVideos);
  const { activeCategory } = useSelector(state => state.catgoryState);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [descriptionState, setDescriptionState] = useState('close');

  const handleDescription = () => {
    descriptionState === 'close' ? setDescriptionState('open') : setDescriptionState('close');
  }

  const handleLike = () => {
    liked ? setLiked(false) : setLiked(true);
    disliked && setDisliked(false)
  }

  const handleDislike = () => {
    disliked ? setDisliked(false) : setDisliked(true);
    liked && setLiked(false)
  }

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
      })
    });
  }, [searchParams]);

  useEffect(() => {
    if (videos.length === 0) {
      dispatch(getVideosList(activeCategory, 20));
    }
  }, [dispatch, activeCategory, videoCategory, videos.length]);

  const publishedAt = (input) => {
    let date = new Date(input);
    let a = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()] + ' ' + date.getDay() + ', ' + date.getFullYear()
    return a;
  }

  const setDescription = (input) => {
    let span = document.createElement('span');
    span.innerText = input
    return span.innerHTML;
  }

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

  return (
    <div className="row">
      <div className="col col-8">
        <StickyBox offsetTop={84} offsetBottom={24}>
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
          {currentVideo && iframeLoad && <div className='watch-screen-content'>
            <h3>{currentVideo.video.snippet.title}</h3>
            <span className='watch-duration'>
              <span>{currentVideo.video.statistics.viewCount} views</span>
              <span> • </span>
              <span>{publishedAt(currentVideo.video.snippet.publishedAt)} </span>
            </span>
            <span className={`watch-description ${descriptionState}`} dangerouslySetInnerHTML={{ __html: setDescription(currentVideo.video.snippet.description) }}></span>
            <span className={`watch-description-more ${descriptionState}`} onClick={handleDescription}></span>
            <div className='watch-tools'>
              <span onClick={handleLike}>{liked ? <MdThumbUp size={23} /> : <MdOutlineThumbUpOffAlt size={23} />} {count(liked ? parseInt(currentVideo.video.statistics.likeCount) + 1 : currentVideo.video.statistics.likeCount)}</span>
              {console.log(currentVideo)}
              <span onClick={handleDislike}>{disliked ? <MdThumbDown size={23} /> : <MdOutlineThumbDownAlt size={23} />} Dislike</span>
              <span>{<BiShare size={23} style={{ transform: 'scaleX(-1)' }} />} Share</span>
            </div>
          </div>}
        </StickyBox>
      </div>

      <div className='col col-4'>
        <StickyBox offsetTop={84} offsetBottom={24}>
          <CategoriesBar className='watch-category-bar' />
          {iframeLoad && iframeLoad &&
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