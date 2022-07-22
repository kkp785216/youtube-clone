import React from 'react'
import './SkeltonSubscription.scss'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeltonSubscription = () => {
    return (
        <div className='skeleton-wrapper mb-2 p-3'>
            <SkeletonTheme baseColor='#e0e0e0' highlightColor='#ededed'>
                <div>
                    <Skeleton height={130} className='me-2' style={{borderRadius: '0'}} />
                </div>
            </SkeletonTheme>
        </div>
    )
}

export default SkeltonSubscription