import React from 'react';
import Layout from './src/components/Layout';
import { OrderProvider } from './src/components/OrderContext';

/* eslint-disable react/jsx-props-no-spreading */
const wrapPageElement = ({ element, props }) => (
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  <Layout {...props}>{element}</Layout>
);

const wrapRootElement = ({ element }) => (
  <OrderProvider>{element}</OrderProvider>
);

export { wrapPageElement, wrapRootElement };
