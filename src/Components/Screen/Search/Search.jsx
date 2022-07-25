import React, { useEffect, useState } from 'react'
import './Search.scss'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getVideosBySearch, getVideosBySearchNext } from '../../../Redux/Actions/search.action';
import SingleSearch from './SingleSearch';
import InfiniteScroll from 'react-infinite-scroll-component'
import SkeltonSearch from '../../Skeletons/SkeltonSearch/SkeltonSearch';
import SkeltonSearchMobile from '../../Skeletons/SkeltonSearch/SkeltonSearchMobile';

const Search = ({ progress, setProgress }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { videos, nextPage, videoCategory, moreDetails, channelDetails, loading, isFirst } = useSelector(state => state.searchVideos);
    const [responsive, setResponsive] = useState(false)

    // load search result for the first time
    const dispatch = useDispatch();
    let query = searchParams.get('q');
    useEffect(() => {
        if (videos.length === 0 || videoCategory !== query) {
            dispatch(getVideosBySearch(query, 20, true));
        }
    }, [query, dispatch, videos.length, videoCategory]);

    useEffect(() => {
        if (videoCategory !== query) {
            setProgress(10);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoCategory, query]);

    useEffect(() => {
        if (!loading && isFirst && progress === 10) {
            setProgress(100);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, isFirst])

    const fetchData = () => {
        dispatch(getVideosBySearchNext(query, nextPage, 8, false));
    }

    // Skelton for mobile device set
    const handleResponsive = () => {
        window.innerWidth > 512 ? setResponsive(false) : setResponsive(true);
    }
    window.onresize = handleResponsive;
    useEffect(() => {
        handleResponsive()
        console.log('hii')
    }, []);

    return (<>
        <InfiniteScroll className='search-card-wrapper'
            dataLength={videos.length}
            hasMore={true}
            next={fetchData}
            loader={<>
                {[...new Array(isFirst ? 20 : 8)].map((element, index) => (
                    <div className='col' key={index}>
                        {responsive ? <SkeltonSearchMobile /> : <SkeltonSearch />}
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