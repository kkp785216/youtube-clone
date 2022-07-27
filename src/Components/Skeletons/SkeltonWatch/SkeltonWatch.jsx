import React from 'react'
import './SkeltonWatch.scss'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeltonWatch = () => {
    return (
        <div className='skeleton-wrapper skeleton-wrapper-search'>
            <SkeletonTheme baseColor='#e0e0e0' highlightColor='#ededed' >
                <div>
                    <div className='position-relative overflow-hidden skeleton-div' style={{ paddingBottom: '56.25%' }}>
                        <Skeleton width='100%' className='position-absolute h-100' style={{ borderRadius: '0' }} />
                    </div>
                </div>
                <div>
                    <div className="d-flex align-items-center mt-2 skeleton-div-second">
                        <div className='skeleton-div' style={{ flex: 'auto' }}>
                            <Skeleton width='90%' height={17} style={{ borderRadius: '2px' }} />
                        </div>
                    </div>
                    <div className="d-flex align-items-center mt-2 skeleton-div-second">
                        <div className='skeleton-div' style={{ flex: 'auto' }}>
                            <Skeleton width='60%' className='mt-2' height={15} style={{ borderRadius: '2px' }} />
                        </div>
                    </div>
                </div>
            </SkeletonTheme>
        </div>
    )
}

export default SkeltonWatch