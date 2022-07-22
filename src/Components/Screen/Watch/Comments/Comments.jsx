import React from 'react'
import './Comments.scss'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import moment from 'moment'

const Comments = ({ currentVideo, currentVideoComments }) => {
    const [currentComments, setCurrentComment] = useState(null);
    const [commentState, setCommentState] = useState('close');
    useEffect(() => {
        currentVideoComments.then(data => {
            setCurrentComment(data.data.items);
        });
    }, [currentVideoComments]);

    const lineCount = (input) => {
        let span = document.createElement('span');
        span.innerHTML = input
        let count = Array.from(span.childNodes).filter(data=>data.nodeName === '#text').length
        return count
    }

    const handleCommentState = () => {
        commentState === 'close' ? setCommentState('open') : setCommentState('close');
    }

    return (<>
        {currentComments &&
            <div className="watch-comments">
                <span className='d-block mb-4'>{currentVideo.video.statistics.commentCount} Comments</span>
                {currentComments.map((comments, index) => (
                <div className="comment-card-wrapper" key={index}>
                    <Link to={`/c/${comments.snippet.topLevelComment.snippet.authorChannelId.value}`}><img src={comments.snippet.topLevelComment.snippet.authorProfileImageUrl} alt='' title={comments.snippet.topLevelComment.snippet.authorDisplayName} width='45' height='45' /></Link>
                    <div className='comment-card-content'>
                        <h5><Link to={`/c/${comments.snippet.topLevelComment.snippet.authorChannelId.value}`}>{comments.snippet.topLevelComment.snippet.authorDisplayName}</Link><span> {moment(comments.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h5>
                        <p className={`${commentState}`} dangerouslySetInnerHTML={{__html: comments.snippet.topLevelComment.snippet.textDisplay}}></p>
                        {lineCount(comments.snippet.topLevelComment.snippet.textDisplay) > 3 && <span className='comment-read-more' onClick={handleCommentState}>{commentState === 'close' ? 'Read more':'Show less'}</span>}
                    </div>
                </div>
                ))}
            </div>
        }
    </>)
}

export default Comments