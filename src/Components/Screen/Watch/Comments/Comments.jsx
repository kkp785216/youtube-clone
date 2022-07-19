import React from 'react'
import './Comments.scss'
import { Link } from 'react-router-dom'

const Comments = ({currentVideo}) => {
    return (
        <div className="watch-comments">
            <span>{currentVideo.video.statistics.commentCount} Comments</span>
            <div className="comment-card-wrapper">
                <img src="" alt="" width='45' height='45' />
                <div className='comment-card-content'>
                    <h5><Link to='/'>Hello</Link><span> a year ago</span></h5>
                    <p className='close'>I really like the way you teach most complex topics in the most simplest way. Neither i have any programing exprience nor i am from programing background but watching your videos has motivated me so much that I have learnt HTML, CSS, JS, Bootstrap and Python Django. Currently, I am working in finance domain with a MNC and have 4 years of experience. Thanks to you that now i am confident enough to change my domain and will soon start to look out for jobs related to full stack developer. 🙏🏽</p>
                    <span>Read more</span>
                </div>
            </div>
        </div>
    )
}

export default Comments