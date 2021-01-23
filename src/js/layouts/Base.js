import React from 'react';
import Navbar from '../components/Navbar'

function Base({ children, ...props}) {
  return (
    <>
      <Navbar { ...props } />
      {children}
    </>
  );
}

const extractName = Component => Component.name || Component.displayName || 'Component'
export const withBaseLayout = (Component, config) => 
   props => 
      <>
      <Navbar {...config} view={extractName(Component)}  />
      <Component {...props} />
      </>
   
  




export default Base;