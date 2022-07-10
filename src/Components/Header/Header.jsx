import React from 'react'
import './_header.scss'
import { AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdNotifications, MdApps } from 'react-icons/md'
import { BiArrowBack } from 'react-icons/bi'
import header_logo from "../../Media/img/youtube_logo.svg"
import user_logo from "../../Media/img/user.png"

const Header = (props) => {
  return (
    <>
      <header className='header'>
        <div className="header-wrapper">
          <div className='header_left'>
            <div className='round-animt d-inline' onClick={()=>{props.handleSidebar()}}>
              <AiOutlineMenu className='header_menu' size={40} />
            </div>
            <img src={header_logo} alt="YouTube" className="header_logo" width="102px" title="YouTube Home"/>
          </div>
          <form className='header_middle'>
            <div className='search-container'>
              <div className="input_back round"><BiArrowBack size={23} /></div>
              <div className='search-box'>
                <input id='search' type="text" onFocus={() => { document.querySelector('.search-box').classList.add('on') }} onBlur={() => { document.querySelector('.search-box').classList.remove('on') }} name='search' placeholder='Search' />
                <span><AiOutlineSearch size={20} /></span>
              </div>
              <button type='submit'><AiOutlineSearch size={22} /></button>
            </div>
          </form>
          <div className="header_icons header_right">
            <MdNotifications size={40} />
            <MdApps size={40} />
            <img src={user_logo} alt="avtar" width="50px" />
          </div>
        </div>
      </header>
      <div className="fix-manage"></div>
    </>
  )
}

export default Header