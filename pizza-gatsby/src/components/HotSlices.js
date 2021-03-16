import React from 'react';
import LoadingGrid from './LoadingGrid';

const HotSlices = (props) => {
  const { hotSlices } = props;
  console.log(props);
  return (
    <div>
      {/* LOADING STATE */}
      {!hotSlices && <LoadingGrid count={4} />}
      {/* LOADED BUT NO DATA */}
      {hotSlices && !hotSlices?.length && <p>Nothin' in the Case</p>}
      {/* LOADED AND WORKING */}
    </div>
  );
};

export default HotSlices;
