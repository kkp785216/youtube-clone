import React from 'react'
import './HomeScreen.scss'
import { Row, Col } from 'react-bootstrap'
import CategoriesBar from '../../CategoriesBar/CategoriesBar'
import Video from '../../Video/Video'

const Home = () => {
  return (
    <div>
      <CategoriesBar />
      <Row className='video-container'>
        {
          [...new Array(20)].map((element, index) => (
            <Col key={index}>
              <Video />
            </Col>
          ))
        }
      </Row>
    </div>
  )
}

export default Home