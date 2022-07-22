import React from 'react'
import './Subscription.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import request from '../../../Database/Api'
import { useSelector } from 'react-redux'
import RequestLogin from '../../RequestLogin/RequestLogin'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeltonSubscription from '../../Skeletons/SkeltonSubscription'

const Subscription = () => {
  const [subsData, setSubsData] = useState(null);
  const { accessToken, user } = useSelector(state => state.auth)
  useEffect(() => {
    try {
      const res = request('subscriptions', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          part: 'snippet,contentDetails',
          mine: true,
          maxResults: 15
        }
      })
      res.then(data => {
        setSubsData({
          data: data.data.items,
          pageToken: data.data.nextPageToken,
          pageInfo: data.data.pageInfo
        })
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const moreSubscription = () => {
    const res = request('subscriptions', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        part: 'snippet,contentDetails',
        mine: true,
        maxResults: 10,
        pageToken: subsData.pageToken
      }
    });
    res.then((data) => {
      setSubsData({
        ...subsData.data,
        data: [...subsData.data, ...data.data.items],
        pageToken: data.data.nextPageToken,
        pageInfo: data.data.pageInfo
      })
    });
    console.log(subsData)
  }

  return (<>
    {accessToken && <>
      {subsData ?
        <InfiniteScroll
          dataLength={subsData.data.length}
          next={moreSubscription}
          hasMore={subsData.data.length < parseInt(subsData.pageInfo.totalResults)}
          loader={
            <div className="d-flex w-100 justify-content-center overflow-hidden">
              <div className="spinner-border" role="status" style={{ color: '#525252' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>}
          scrollableTarget="scrollableDiv"
        >
          {subsData.data.map((element, index) => (
            <div className='subscription-wrapper' key={index}>
              <div className="subscription-channel"><Link to={`/c/${element.snippet.channelId}`}><img src={element.snippet.thumbnails.medium.url} alt="" /></Link></div>
              <div className="subscription-content">
                <h3><Link to={`/c/${element.snippet.channelId}`}>{element.snippet.title}</Link></h3>
                <p>{element.snippet.description}</p>
                <span>{element.contentDetails.totalItemCount} videos</span>
              </div>
            </div>
          ))}
        </InfiniteScroll> :
        <>
        {/* {[...new Array(15)].map((element, index)=>(
          <SkeltonSubscription key={index}/>
        ))} */}
        </>
      }
    </>}

    {!accessToken && <RequestLogin />}
  </>)
}

export default Subscription