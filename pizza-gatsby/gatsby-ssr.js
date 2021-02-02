import React from 'react';
import Layout from './src/components/Layout';

/* eslint-disable react/jsx-props-no-spreading */
const wrapPageElement = ({ element, props }) => (
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  <Layout {...props}>{element}</Layout>
);
export { wrapPageElement };
