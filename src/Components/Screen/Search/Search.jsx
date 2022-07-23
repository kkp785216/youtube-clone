import React, {useEffect} from 'react'
import {useSearchParams, Link} from 'react-router-dom'
import { useSelector } from 'react-redux';

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const {videos, nextPage} = useSelector(state=>state.searchVideos);
    useEffect(()=>{
        console.log(searchParams.get('q'));
    },[searchParams]);
  return (<>
    {videos.map((video, index)=>(
        <div className='search-card-wrapper' key={index}>
            <div className="search-card">
                <div className="search-card-thumbnail" title={video.snippet.title}><Link to={`/watch?v=${video ? video.id.videoId === undefined ? video.id : video.id.videoId : ''}`}><img src={video.snippet.thumbnails.high.url} alt="" /></Link></div>
                <div className="search-card-content"  title={video.snippet.title}>
                    <h2><Link to={`/watch?v=${video ? video.id.videoId === undefined ? video.id : video.id.videoId : ''}`}>{video.snippet.title}</Link></h2>
                </div>
            </div>
        </div>
    ))}
  </>)
}

export default Search