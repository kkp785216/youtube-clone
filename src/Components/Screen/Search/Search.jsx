import React, { useEffect } from 'react'
import './Search.scss'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getVideosBySearch, getVideosBySearchNext } from '../../../Redux/Actions/search.action';
import SingleSearch from './SingleSearch';
import InfiniteScroll from 'react-infinite-scroll-component'

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { videos, nextPage, videoCategory, moreDetails, channelDetails } = useSelector(state => state.searchVideos);

    // load search result for the first time
    const dispatch = useDispatch();
    let query = searchParams.get('q');
    useEffect(() => {
        if (videos.length === 0 || videoCategory !== query) {
            dispatch(getVideosBySearch(query, 20));
        }
    }, [query, dispatch, videos.length, videoCategory]);

    const fetchData = () => {
        dispatch(getVideosBySearchNext(query, nextPage, 8));
    }

    return (<>
        <InfiniteScroll className='search-card-wrapper'
            dataLength={videos.length}
            hasMore={true}
            next={fetchData}
            loader={<>
                <div className="d-flex w-100 justify-content-center">
                    <div className="spinner-border" role="status" style={{ color: '#525252' }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </>}
        >
            {videos.map((video, index) => (
                <SingleSearch key={index} video={video} moreDetails={moreDetails[index]} channelDetails={channelDetails[index]} />
            ))}
        </InfiniteScroll>
    </>)
}

export default Search