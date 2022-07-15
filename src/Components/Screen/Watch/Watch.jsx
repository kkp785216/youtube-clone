import React from 'react'

const Watch = () => {

  return (
    <div className="row">
      <div className="col-8">
        <div className="watch-screen-player">
          <iframe
            src="https://www.youtube.com/embed/ER9SspLe4Hg?autoplay=1"
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