import React from 'react'
import './Watch.scss'
import { useSearchParams } from 'react-router-dom'

const Watch = () => {

  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="row">
      <div className="col-8">
        <div className="watch-screen-player">
          <iframe
            src={`https://www.youtube.com/embed/${searchParams.get('v')}?autoplay=1`}
            title='Youtube Watch'
            frameBorder="0"
            allowFullScreen
            width='100%'
            id="youtube-player-screen"
            className='iframe'
            style={{aspectRatio: '1280/720'}}
          ></iframe>
        </div>
      </div>
      <div className="col-4"></div>
    </div>
  )
}

export default Watch  