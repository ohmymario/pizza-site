import React from 'react';
import LoadingGrid from './LoadingGrid';

const CurrentlySlicing = (props) => {
  const { slicemasters } = props;
  console.log(slicemasters);
  return (
    <div>
      {/* LOADING STATE */}
      {!slicemasters && <LoadingGrid count={4} />}
      {/* LOADED BUT NO DATA */}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now!</p>
      )}
      {/* LOADED AND WORKING */}
    </div>
  );
};

export default CurrentlySlicing;
