import React from 'react'
import './_video.scss'

const Video = () => {
  return (
    <div className="video">

      <div className="video__top">
        <img src={"https://i.ytimg.com/vi/4F2m91eKmts/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDaafw-b__ydDsmTRZgUB1sFb4i7A"} width="100%" alt="" />
        <span>02:57</span>
      </div>

      <div className="video__details">
        <div className="video__channel">
          <img src={"https://yt3.ggpht.com/6Gng7cjMwXWCiPTnOSKkq7yhSGEdMMKFSUNN5evj8UTHcUvU-csrbkzggaERvBr0itptDqsiRA=s68-c-k-c0x00ffffff-no-rj"} width="33px" alt="" />
        </div>

        <div className="video__title">
          <h3>Create a Professional MERN Full Stack Web App</h3>
          <div className='video__title__info'>
            <span>Code With Harry</span>
            <span>5M views</span>
            <span> • </span>
            <span>5 days ago</span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Video