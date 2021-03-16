import React from 'react';
import ItemGrid from './ItemGrid';
import LoadingGrid from './LoadingGrid';

const HotSlices = (props) => {
  const { hotSlices } = props;
  return (
    <div>
      <h2>
        <span className="mark tilt">Hot Slices</span>
      </h2>
      <p>Come on by, by the slice!</p>
      {/* LOADING STATE */}
      {!hotSlices && <LoadingGrid count={4} />}
      {/* LOADED BUT NO DATA */}
      {hotSlices && !hotSlices?.length && <p>Nothin' in the Case</p>}
      {/* LOADED AND WORKING */}
      {hotSlices && hotSlices?.length && <ItemGrid items={hotSlices} />}
    </div>
  );
};

export default HotSlices;
