import React from 'react'
import './Subscription.scss'
import { useState } from 'react'
import { useEffect } from 'react'
import request from '../../../Database/Api'
import { useSelector } from 'react-redux'
import RequestLogin from '../../RequestLogin/RequestLogin'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import SkeltonSubscription from '../../Skeletons/SkeltonSubsctiption/SkeltonSubscription'

const Subscription = () => {
  const [subsData, setSubsData] = useState(null);
  const { accessToken } = useSelector(state => state.auth)
  useEffect(() => {
    try {
      const res = request('subscriptions', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          part: 'snippet,contentDetails',
          mine: true,
          maxResults: 10
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
  }, [accessToken]);

  const moreSubscription = () => {
    const res = request('subscriptions', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        part: 'snippet,contentDetails',
        mine: true,
        maxResults: 5,
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
          loader={<>
            {[...new Array(5)].map((element, index) => (
              <SkeltonSubscription key={index} />
            ))}
            <div className="d-flex w-100 justify-content-center overflow-hidden">
              <div className="spinner-border" role="status" style={{ color: '#525252' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </>}
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
        </InfiniteScroll> : <>
          {[...new Array(10)].map((element, index) => (
            <SkeltonSubscription key={index} />
          ))}
        </>}
    </>}

    {!accessToken && <RequestLogin />}
  </>)
}

export default Subscription