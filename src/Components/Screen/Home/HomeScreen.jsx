import React, {useEffect} from 'react'
import './HomeScreen.scss'
import { Row, Col } from 'react-bootstrap'
import CategoriesBar from '../../CategoriesBar/CategoriesBar'
import Video from '../../Video/Video'
import { useDispatch, useSelector } from 'react-redux'
import { getVideosByCategory } from '../../../Redux/Actions/video.action'

const Home = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getVideosByCategory("All"));
  },[dispatch]);

  const {videos} = useSelector(state=>state.homeVideos);
  return (
    <div>
      <CategoriesBar />
      <Row className='video-container'>
        {
          videos.map((videos, index) => (
            <Col key={videos.id.videoId}>
              <Video videos={videos}/>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export default Home