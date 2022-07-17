import React, { useEffect } from 'react'
import './_sidebar.scss'
import { MdHome, MdSubscriptions, MdThumbUp, MdHistory, MdLibraryBooks, MdExitToApp } from 'react-icons/md'
import { AiFillApi } from 'react-icons/ai'
import { AiOutlineMenu } from 'react-icons/ai'
import header_logo from "../../Media/img/youtube_logo.svg"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Redux/Actions/auth.action'
import { selectApi } from '../../Redux/Actions/api.action'
import { apiKeys } from '../../Database/Api'

const Sidebar = (props) => {
  const { sidebar, handleSidebar, handleClose } = props;

  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('ytc_access_token');
    localStorage.removeItem('ytc_user');
    localStorage.removeItem('ytc_loading');
  }

  // Change api key if api limit has been exeeded
  const { apiState } = useSelector(state => state.apiState);
  const handleChangeApi = (e) => {
    dispatch(selectApi(e.target.value));
    window.localStorage.setItem('selectApi', e.target.value);
  }
  useEffect(() => {
    let currentApi = window.localStorage.getItem('selectApi') ? window.localStorage.getItem('selectApi') : "1";
    dispatch(selectApi(currentApi));
  }, [dispatch]);

  const { user } = useSelector(state => state.auth);

  return (
    <>
      {
        [1, 2].map((element, index) => {
          return (
            <nav className={`sidebar${index === 1 ? ' float-nav' : ' small'}${props.navClass ? ' '+props.navClass : ''}${sidebar ? ' open' : ''}`} key={index}>

              <div className='header_left'>
                <div className='round-animt d-inline' onClick={() => { handleSidebar() }}>
                  <AiOutlineMenu className='header_menu' size={40} />
                </div>
                <Link to="/" className='logo'><img src={header_logo} alt="YouTube" className="header_logo" width="102px" title="YouTube Home" /></Link>
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

              <li title="Api Sources">
                <div className="d-flex position-relative api-box">
                  <AiFillApi size={23} />
                  <sub className='position-absolute top-0' style={{ right: '-8px' }}>{apiState}</sub>
                </div>
                <span>
                  <select name="changeApi" id="changeApi" onChange={handleChangeApi} value={apiState}>
                    {
                      apiKeys.map((element, index) => {
                        return (
                          <option value={index + 1} key={index}>Api {index + 1}</option>
                        )
                      })
                    }
                  </select>
                </span>
              </li>

              <hr />

              {user ?
                <li onClick={() => { handleClose(window.innerWidth); handleLogout() }} title="Logout">
                  <MdExitToApp size={23} />
                  <span>Logout</span>
                </li> :
                <Link to='/auth' onClick={() => { handleClose(window.innerWidth) }} title="Login">
                  <MdExitToApp size={23} />
                  <span>Login</span>
                </Link>
              }

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