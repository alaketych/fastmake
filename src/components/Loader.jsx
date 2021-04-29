import React from 'react'
import ContentLoader from 'react-content-loader'

function Loader() {
    return (
        <ContentLoader 
            speed={2}
            width={300}
            height={455}
            viewBox="0 0 300 455"
            backgroundColor="#e6e6e6"
        >
            <rect x="24"  y="300" rx="7"  ry="7" width="260" height="24"  /> 
            <rect x="24"  y="350" rx="7"  ry="7" width="260" height="21"  /> 
            <rect x="24"  y="410" rx="7"  ry="7" width="70"  height="26"  /> 
            <rect x="24"  y="15"  rx="7"  ry="7" width="260" height="265" /> 
            <rect x="215" y="410" rx="7"  ry="7" width="67"  height="23"  />
        </ContentLoader>
    )
}

export default Loader