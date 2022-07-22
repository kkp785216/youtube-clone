import React, { useState } from 'react'
import './WatchInfo.scss'
import { MdOutlineThumbUpOffAlt, MdThumbUp, MdOutlineThumbDownAlt, MdThumbDown } from 'react-icons/md'
import { BiShare } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import Comments from '../Comments/Comments'

const WatchInfo = ({ currentVideo, currentVideoComments }) => {
    const [descriptionState, setDescriptionState] = useState('close');
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    const handleDescription = () => {
        descriptionState === 'close' ? setDescriptionState('open') : setDescriptionState('close');
    }

    const handleLike = () => {
        liked ? setLiked(false) : setLiked(true);
        disliked && setDisliked(false)
    }

    const handleDislike = () => {
        disliked ? setDisliked(false) : setDisliked(true);
        liked && setLiked(false)
    }

    const publishedAt = (input) => {
        let date = new Date(input);
        let a = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][date.getMonth()] + ' ' + date.getDay() + ', ' + date.getFullYear()
        return a;
    }

    const setDescription = (input) => {
        let span = document.createElement('span');
        span.innerText = input
        return span.innerHTML;
    }

    const count = (input) => {
        if (input < 1000) {
            return input
        }
        else if (input < 1000000) {
            return parseInt(input / 1000) + "K"
        }
        else if (input < 1000000000) {
            return parseInt(input / 1000000) + "M"
        }
        else if (input < 1000000000000) {
            return parseInt(input / 1000000000) + "B"
        }
    }

    const lineCount = (input) => {
        let span = document.createElement('span');
        span.innerHTML = input
        let count = Array.from(span.childNodes).filter(data=>data.nodeName === '#text').length
        return count
    }

    return (
        <>
            {currentVideo && <div className='watch-screen-content'>
                <h3>{currentVideo.video.snippet.title}</h3>
                <span className='watch-duration'>
                    <span>{currentVideo.video.statistics.viewCount} views</span>
                    <span> • </span>
                    <span>{publishedAt(currentVideo.video.snippet.publishedAt)} </span>
                </span>
                <span className={`watch-description ${descriptionState}`} dangerouslySetInnerHTML={{ __html: setDescription(currentVideo.video.snippet.description) }}></span>
                {lineCount(setDescription(currentVideo.video.snippet.description)) >= 2 && <span className={`watch-description-more ${descriptionState}`} onClick={handleDescription}></span>}
                <div className='watch-tools'>
                    <span onClick={handleLike}>{liked ? <MdThumbUp /> : <MdOutlineThumbUpOffAlt />} {count(liked ? parseInt(currentVideo.video.statistics.likeCount) + 1 : currentVideo.video.statistics.likeCount)}</span>
                    {/* {console.log(currentVideo)} */}
                    <span onClick={handleDislike}>{disliked ? <MdThumbDown /> : <MdOutlineThumbDownAlt />} Dislike</span>
                    <span>{<BiShare style={{ transform: 'scaleX(-1)' }} />} Share</span>
                </div>
                <div className="subscribe-comment overflow-hidden">
                    <div className="row">
                        <div className="col channel-info">
                            <div className="row m-0">
                                <div className="col">
                                    <Link to={`/c/${currentVideo.channel.id}`}><img src={currentVideo.channel.snippet.thumbnails.default.url} alt="" width='40' height='40' /></Link>
                                    <div>
                                        <h3><Link to={`/c/${currentVideo.channel.id}`}>{currentVideo.channel.snippet.title}</Link></h3>
                                        <span>{count(currentVideo.channel.statistics.subscriberCount)} subscribers</span>
                                    </div>
                                </div>
                                <div className="col">
                                    <button className={`${subscribed ? 'subscribed':''}`} onClick={()=>{setSubscribed(!subscribed)}}>{subscribed?'Subscribed':'Subscribe'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {currentVideoComments && <Comments currentVideo={currentVideo} currentVideoComments={currentVideoComments}/>}
            </div>}
        </>
    )
}

export default WatchInfo