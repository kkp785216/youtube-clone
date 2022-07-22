import React from 'react'
import { Link } from 'react-router-dom'

const RequestLogin = () => {
  return (
    <div>
        <p>Please Login to view this page</p>
        <Link to='/auth'>Login</Link>
    </div>
  )
}

export default RequestLogin