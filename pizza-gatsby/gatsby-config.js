import dotenv from 'dotenv';

dotenv.config();

export default {
  siteMetadata: {
    title: `Slicks Slices`,
    siteUrl: `https://www.gatsbyjs.com`,
    description: `The best pizza you'll ever have!`,
  },
  plugins: [
    // allows gatsby to use styled components in finding the critical CSS
    'gatsby-plugin-styled-components',

    // react helmet server side rendering support
    'gatsby-plugin-react-helmet',

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
