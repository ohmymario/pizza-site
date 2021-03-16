import React from 'react';
import ItemGrid from './ItemGrid';
import LoadingGrid from './LoadingGrid';

const CurrentlySlicing = (props) => {
  const { slicemasters } = props;
  return (
    <div>
      <h2>
        <span className="mark tilt">Slicemasters On</span>
      </h2>
      <p>Standing by, ready to slice you up!</p>

      {/* LOADING STATE */}
      {!slicemasters && <LoadingGrid count={4} />}
      {/* LOADED BUT NO DATA */}
      {slicemasters && !slicemasters?.length && (
        <p>No one is working right now!</p>
      )}
      {/* LOADED AND WORKING */}
      {slicemasters && slicemasters?.length && (
        <ItemGrid items={slicemasters} />
      )}
    </div>
  );
};

export default CurrentlySlicing;
