import React, { useEffect} from 'react'
import './_sidebar.scss'
import { MdHome, MdSubscriptions, MdThumbUp, MdHistory, MdLibraryBooks, MdExitToApp } from 'react-icons/md'
import { AiFillApi } from 'react-icons/ai'
import { AiOutlineMenu } from 'react-icons/ai'
import header_logo from "../../Media/img/youtube_logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Redux/Actions/auth.action'
import { selectApi } from '../../Redux/Actions/api.action'

const Sidebar = ({ sidebar, handleSidebar, handleClose }) => {

  const Navigate = useNavigate();
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      Navigate('/auth');
    }, 0);
  }

  // Change api key if api limit has been exeeded
  const {apiState} = useSelector(state=>state.apiState)
  const handleChangeApi = (e) => {
    dispatch(selectApi(e.target.value));
    window.localStorage.setItem('selectApi', e.target.value);
  }
  useEffect(()=> {
    let currentApi = window.localStorage.getItem('selectApi') ? window.localStorage.getItem('selectApi') : "1";
    dispatch(selectApi(currentApi));
  },[dispatch]);

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
                <Link className='logo' to="/"><img src={header_logo} alt="YouTube" className="header_logo" width="102px" title="YouTube Home" /></Link>
              </div>

              <Link to="/" onClick={() => { handleClose(window.innerWidth) }} title="Home">
                <MdHome size={23} />
                <span>Home</span>
              </Link>

              <Link to="/feed/subscription" onClick={() => { handleClose(window.innerWidth) }} title="Subscription">
                <MdSubscriptions size={23} />
                <span>Subscription</span>
              </Link>

              <Link to="/playlist?list=LL" onClick={() => { handleClose(window.innerWidth) }} title="Liked Videos">
                <MdThumbUp size={23} />
                <span>Liked Videos</span>
              </Link>

              <Link to="/feed/history" onClick={() => { handleClose(window.innerWidth) }} title="History">
                <MdHistory size={23} />
                <span>History</span>
              </Link>

              <Link to="/feed/library" onClick={() => { handleClose(window.innerWidth) }} title="Library">
                <MdLibraryBooks size={23} />
                <span>Library</span>
              </Link>

              <li onClick={() => { handleClose(window.innerWidth) }} title="I don't know">
                <div className="d-flex position-relative api-box">
                  <AiFillApi size={23} />
                  <sub>{apiState}</sub>
                </div>
                <span>
                  <select name="changeApi" id="changeApi" onChange={handleChangeApi} value={apiState}>
                    <option value="1">API 1</option>
                    <option value="2">API 2</option>
                    <option value="3">API 3</option>
                    <option value="4">API 4</option>
                  </select>
                </span>
              </li>

              <hr />

              <li onClick={() => { handleClose(window.innerWidth); handleLogout() }} title="Logout">
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