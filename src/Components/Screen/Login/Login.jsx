import React from 'react'
import './Login.scss'
import logo from '../../../Media/img/logo192.png'

const Login = () => {
  return (
    <div className="login">
        <div className="login__container">
            <img src={logo} alt="" />
            <h2>YouTube Clone</h2>
            <button>Login with google</button>
            <p>This Project is made using YouTube Data API</p>
        </div>
    </div>
  )
}

export default Login