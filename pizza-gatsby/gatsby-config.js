import dotenv from 'dotenv';

dotenv.config();

export default {
  siteMetadata: {
    title: `Gatsby`,
    siteUrl: `https://www.gatsbyjs.com`,
    description: `Blazing fast modern site generator for React`,
  },
  plugins: [
    // allows gatsby to use styled components in finding the critical CSS
    'gatsby-plugin-styled-components',

    // plugin to connect sanity and gatsby
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `u7kiam8u`,
        dataset: `production`,
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
