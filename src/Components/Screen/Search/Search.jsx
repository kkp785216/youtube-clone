import React, { useEffect } from 'react'
import './Search.scss'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getVideosBySearch, getVideosBySearchNext } from '../../../Redux/Actions/search.action';
import SingleSearch from './SingleSearch';
import InfiniteScroll from 'react-infinite-scroll-component'
import SkeltonSearch from '../../Skeletons/SkeltonSearch/SkeltonSearch';

const Search = ({ progress, setProgress }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { videos, nextPage, videoCategory, moreDetails, channelDetails, loading, isFirst } = useSelector(state => state.searchVideos);

    // load search result for the first time
    const dispatch = useDispatch();
    let query = searchParams.get('q');
    useEffect(() => {
        if (videos.length === 0 || videoCategory !== query) {
            dispatch(getVideosBySearch(query, 20, true));
        }
    }, [query, videoCategory]);

    useEffect(() => {
        if (videoCategory !== query) {
            setProgress(70);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoCategory, query]);

    useEffect(() => {
        if (!loading && isFirst && progress === 70) {
            setProgress(100);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, isFirst])

    const fetchData = () => {
        dispatch(getVideosBySearchNext(query, nextPage, 8, false));
    }

    return (<>
        <InfiniteScroll className='search-card-wrapper'
            dataLength={videos.length}
            hasMore={true}
            next={fetchData}
            loader={<>
                {[...new Array(8)].map((element, index) => (
                    <div className='w-100' key={index}>
                        <SkeltonSearch/>
                    </div>
                ))}
                <div className="d-flex w-100 justify-content-center search-loader">
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