import React from 'react';
import useLatestData from '../utils/useLatestData';
import CurrentlySlicing from '../components/CurrentlySlicing';
import HotSlices from '../components/HotSlices';

import { HomePageGrid } from '../styles/Grids';

const HomePage = (props) => {
  const { slicemasters, hotSlices } = useLatestData();
  return (
    <div className="center">
      <h1>The Best Pizza Downtown!</h1>
      <p>Open 11am to 11pm Every Single Day</p>
      <HomePageGrid>
        <CurrentlySlicing slicemasters={slicemasters} />
        <HotSlices hotSlices={hotSlices} />
      </HomePageGrid>
    </div>
  );
};

export default HomePage;
