import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';

const SingleSearch = ({ video, moreDetails, channelDetails }) => {
    const [videoDetails, setVideoDetails] = useState(null);
    const [channel, setChannel] = useState({ channelImg: '', id: '' });

    // Use more video detals
    useEffect(() => {
        moreDetails.then((res) => {
            setVideoDetails(res.data.items[0])
        });
    }, [moreDetails]);

    // fetch channel icons
    useEffect((channel) => {
        channelDetails.then((res) => {
            setChannel({
                ...channel,
                channelImg: res.data.items[0].snippet.thumbnails.default.url,
                id: res.data.items[0].id
            });
        });
    }, [channelDetails]);

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

    function duration(input) {
        const seconds = moment.duration(input).asSeconds();
        const _duration = moment.utc(seconds * 1000).format("mm:ss");
        return _duration;
    }

    return (
        <div className="search-card">
            <div className="search-card-thumbnail" title={video.snippet.title}>
                <Link to={`/watch?v=${video ? video.id.videoId === undefined ? video.id : video.id.videoId : ''}`}>
                    <img src={video.snippet.thumbnails.high.url} alt="" />
                    <span>{videoDetails && duration(videoDetails.contentDetails.duration)}</span>
                </Link>
            </div>
            <div className="search-card-content" title={video.snippet.title}>
                <h2><Link to={`/watch?v=${video ? video.id.videoId === undefined ? video.id : video.id.videoId : ''}`}>{video.snippet.title}</Link></h2>
                <Link to={`/watch?v=${video ? video.id.videoId === undefined ? video.id : video.id.videoId : ''}`}>
                    <span>{count(videoDetails && videoDetails.statistics.viewCount) + " views"}</span>
                    <span> • </span>
                    <span>{moment(video.snippet.publishedAt).fromNow()}</span>
                </Link>
                <div className='d-flex align-items-center search-channel-wrapper my-2'>
                    <Link to={`/c/${channel.id}`} className='me-2 search-channel'><img className='rounded-circle' src={channel.channelImg} width="27px" height="27px" alt="" /></Link>
                    <span><Link to={`/c/${channel.id}`} className='channel__title'>{video.snippet.channelTitle}</Link></span>
                </div>
                <p>{video.snippet.description}</p>
            </div>
        </div>
    )
}

export default SingleSearch