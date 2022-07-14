import React, { useEffect } from 'react'
import './HomeScreen.scss'
import { Col } from 'react-bootstrap'
import CategoriesBar from '../../CategoriesBar/CategoriesBar'
import Video from '../../Video/Video'
import { useDispatch, useSelector } from 'react-redux'
import { getVideosByCategory } from '../../../Redux/Actions/video.action'
import InfiniteScroll from 'react-infinite-scroll-component'
import SkeletonVideo from '../../Skeletons/SkeletonVideo'

const Home = () => {
  const dispatch = useDispatch();
  const { videos, loading, moreDetails, channelDetails, videoCategory } = useSelector(state => state.homeVideos);
  const {activeCategory} = useSelector(state => state.catgoryState);

  useEffect(() => {
    if (videos.length === 0 || videoCategory !== activeCategory) {
      dispatch(getVideosByCategory(activeCategory, 20));
    }
  }, [dispatch, activeCategory, videoCategory, videos.length]);

  const fetchData = () => {
    dispatch(getVideosByCategory(activeCategory, 8));
  }

  return (
    <div>
      <CategoriesBar />
      <div key={activeCategory}>
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={true}
          next={fetchData}
          loader={<>
            {[...new Array(videos.length >= 20 ? 8 : 20)].map((element, index) => (
              <Col key={index}>
              {console.log(videos.length)}
                <SkeletonVideo />
              </Col>
            ))}
            <div className="d-flex w-100 justify-content-center">
              <div className="spinner-border" role="status" style={{ color: '#878787' }}>
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
                <Video videos={videos} loading={loading} moreDetails={moreDetails[index]} channelDetails={channelDetails[index]} />
              </Col>
            ))
          }
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Home