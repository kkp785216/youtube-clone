import React, {useEffect} from 'react'
import './Login.scss'
import logo from '../../../Media/img/logo192.png'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../Redux/Actions/auth.action'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector(state=>state.auth.accessToken);

  const handleLogin = () => {
    dispatch(login());
  }

  const Navigate = useNavigate();
  useEffect(() => {
    if(accessToken) {
      Navigate('/');
    }
  }, [accessToken, Navigate]);
  
  return (
    <div className="login">
      <div className="login__container">
        <img src={logo} alt="" />
        <h2>YouTube Clone</h2>
        <button onClick={handleLogin}>Login with google</button>
        <p>This Project is made using YouTube Data API</p>
      </div>
    </div>
  )
}

export default Login