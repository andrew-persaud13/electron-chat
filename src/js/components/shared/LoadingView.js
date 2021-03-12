import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from './Loader';

function LoadingView({ message }) {
  const { isDarkTheme } = useSelector(({ settings }) => settings);
  return (
    <div className={isDarkTheme ? 'dark' : 'light'}>
      <div className='loading-screen'>
        <div className='loading-view'>
          <div className='loading-view-container'>
            <div className='mb-3'>
              {message}
              <Loader />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingView;
