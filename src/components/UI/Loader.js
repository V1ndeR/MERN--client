import React from 'react'

import './Loader.css'

export const Loader = () => {
    return (
        <>
            <div className="loader-wrapper">
                <div className="loader">
                    <div className="loader loader-inner"/>
                </div>
            </div>
            <div style={{height: '100vh'}}></div>
        </>
    )
}