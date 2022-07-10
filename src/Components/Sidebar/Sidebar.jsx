import React from 'react'
import './_sidebar.scss'
import { MdHome, MdSubscriptions, MdThumbUp, MdHistory, MdLibraryBooks, MdSentimentDissatisfied, MdExitToApp } from 'react-icons/md'
import { AiOutlineMenu } from 'react-icons/ai'
import header_logo from "../../Media/img/youtube_logo.svg"

const Sidebar = ({ sidebar, handleSidebar, handleClose }) => {
  return (
    <>
      {
        [1, 2].map((element, index) => {
          return (
            <nav className={`sidebar${index === 1 ? ' float-nav' : ' small'}${sidebar ? ' open' : ''}`} key={index}>

              <div className='header_left'>
                <div className='round-animt d-inline' onClick={() => { handleSidebar() }}>
                  <AiOutlineMenu className='header_menu' size={40} />
                </div>
                <img src={header_logo} alt="YouTube" className="header_logo" width="102px" title="YouTube Home" />
              </div>
              <li onClick={() => { handleClose(window.innerWidth) }} title="Home">
                <MdHome size={23} />
                <span>Home</span>
              </li>

              <li onClick={() => { handleClose(window.innerWidth) }} title="Subscription">
                <MdSubscriptions size={23} />
                <span>Subscription</span>
              </li>

              <li onClick={() => { handleClose(window.innerWidth) }} title="Liked Videos">
                <MdThumbUp size={23} />
                <span>Liked Videos</span>
              </li>

              <li onClick={() => { handleClose(window.innerWidth) }} title="History">
                <MdHistory size={23} />
                <span>History</span>
              </li>

              <li onClick={() => { handleClose(window.innerWidth) }} title="Library">
                <MdLibraryBooks size={23} />
                <span>Library</span>
              </li>

              <li onClick={() => { handleClose(window.innerWidth) }} title="I don't know">
                <MdSentimentDissatisfied size={23} />
                <span>I don't know</span>
              </li>

              <hr />

              <li onClick={() => { handleClose(window.innerWidth) }} title="Logout">
                <MdExitToApp size={23} />
                <span>Logout</span>
              </li>

              <hr />
            </nav>
          )
        })
      }
      <div className={`nav-overlay${sidebar ? ' open' : ''}`} onClick={handleSidebar}></div>
    </>
  )
}

export default Sidebar