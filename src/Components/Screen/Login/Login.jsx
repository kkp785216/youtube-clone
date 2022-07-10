import React from 'react'
import './Login.scss'
import logo from '../../../Media/img/youtube_logo.svg'

const Login = () => {
  return (
    <div className="login">
        <div className="login__container">
            <img src={logo} alt="" />
            <button>Login with google</button>
            <p>This Project is made using YouTube Data API</p>
        </div>
    </div>
  )
}

export default Login