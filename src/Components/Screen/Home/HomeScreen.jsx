import React, { useEffect } from 'react'
import './HomeScreen.scss'
import { Col } from 'react-bootstrap'
import CategoriesBar from '../../CategoriesBar/CategoriesBar'
import Video from '../../Video/Video'
import { useDispatch, useSelector } from 'react-redux'
import { getVideosList } from '../../../Redux/Actions/video.action'
import InfiniteScroll from 'react-infinite-scroll-component'
import SkeletonVideo from '../../Skeletons/SkeltonVidoe/SkeletonVideo'

const Home = ({progress, setProgress}) => {
  const dispatch = useDispatch();
  const { videos, moreDetails, channelDetails, videoCategory, loading, isFirst } = useSelector(state => state.homeVideos);
  const { activeCategory } = useSelector(state => state.catgoryState);

  useEffect(() => {
    if (videos.length === 0 || videoCategory !== activeCategory.title) {
      dispatch(getVideosList(activeCategory, 20, true));
      setProgress(70);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, activeCategory]);

  useEffect(()=>{
    if(!loading && isFirst && progress === 70){
        setProgress(100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isFirst]);

  const fetchData = () => {
    dispatch(getVideosList(activeCategory, 8, false));
  }

  return (
    <div>
      <CategoriesBar />
      <div key={activeCategory.title}>
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={true}
          next={fetchData}
          loader={<>
            {[...new Array(videos.length <= 0 ? 20 : 8)].map((element, index) => (
              <Col key={index}>
                <SkeletonVideo />
              </Col>
            ))}
            <div className="d-flex w-100 justify-content-center">
              <div className="spinner-border" role="status" style={{ color: '#525252' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </>}
          className="video-container row"
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {
            videos.map((videos, index) => (
              <Col key={index}>
                <Video videos={videos} moreDetails={moreDetails[index]} channelDetails={channelDetails[index]} />
              </Col>
            ))
          }
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Home