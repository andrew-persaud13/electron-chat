import React from 'react';
import Loader from './Loader'

function LoadingView({message}) {
  return (
    <div className="loading-screen">
      <div className="loading-view">
        <div className="loading-view-container">
          <div className="mb-3">
            {message}
            <Loader />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingView;