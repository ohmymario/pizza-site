import path from 'path';
import fetch from 'isomorphic-fetch';

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // 1. Get a template for this page
  const pizzaTemplate = path.resolve('./src/templates/Pizza.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loops over each pizza and create a page for that pizza
  data.pizzas.nodes.forEach((pizza) => {
    createPage({
      // What is the URL for this new page
      path: `pizza/${pizza.slug.current}`,
      component: pizzaTemplate,
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};

const turnToppingsIntoPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  // 1. Get a template for this page
  const toppingsTemplate = path.resolve('./src/pages/pizzas.js');
  // 2. Query all pizzas
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);
  // 3. Loops over each pizza and create a page for that pizza
  data.toppings.nodes.forEach((topping) => {
    createPage({
      path: `topping/${topping.name}`,
      component: toppingsTemplate,
      context: {
        topping: topping.name,
      },
    });
  });
};

const fetchBeersAndTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;
  // 1. Fetch a List of beers
  const beerAPI = 'https://api.sampleapis.com/beers/ale';
  const res = await fetch(beerAPI);
  const beersData = await res.json();
  // 2. Loop over each one
  beersData.forEach((beer) => {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };
    // 3. Create a node for that beer
    createNode({ ...beer, ...nodeMeta });
  });
};

const turnSlicemastersIntoPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const { data } = await graphql(`
    query MyQuery {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  data.slicemasters.nodes.forEach((slicemaster) => {
    createPage({
      path: `/slicemaster/${slicemaster.slug.current}`,
      component: path.resolve('./src/templates/Slicemaster.js'),
      context: {
        name: slicemaster.person,
        slug: slicemaster.slug.current,
      },
    });
  });

  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);

  Array.from({ length: pageCount }).forEach((_, i) => {
    createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('./src/pages/slicemasters.js'),
      context: {
        // how many employees to skip to get the needed ones for the page
        skip: i * pageSize,
        // What page you are on
        currentPage: i + 1,
        // how many employees per page
        pageSize,
      },
    });
  });
};

export const sourceNodes = async (params) => {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
};

export async function createPages(params) {
  // create pages dynamically
  await Promise.all([
    // 1. Pizzas
    turnPizzasIntoPages(params),
    // 2. Toppings
    turnToppingsIntoPages(params),
    // 3. Slicemasters
    turnSlicemastersIntoPages(params),
  ]);
}
