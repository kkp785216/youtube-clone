import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './SkeletonVideo.scss'

const SkeletonVideo = () => {
    return (
        <div className='skeleton-wrapper'>
            <SkeletonTheme baseColor='#ebebeb' highlightColor='#f5f5f5'>
                <div className='position-relative overflow-hidden' style={{ paddingBottom: '56.25%', height: '0'}}>
                    <Skeleton width='100%' className='position-absolute' style={{ height: '-webkit-fill-available' }} />
                </div>
                <div className='skeleton-div'>
                    <Skeleton circle width={33} height={33} style={{ margin: '0.5rem' }} />
                    <Skeleton width='75%' height={27} style={{ position: 'relative', top: '3px' }} />
                    <Skeleton width='56%' height={13} style={{ position: 'relative', left: '49px' }} />
                    <Skeleton width='66%' height={13} style={{ position: 'relative', left: '49px' }} />
                </div>
            </SkeletonTheme>
        </div>
    )
}

export default SkeletonVideo