import path from 'path';

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

export async function createPages(params) {
  // create pages dynamically
  await Promise.all([
    // 1. Pizzas
    turnPizzasIntoPages(params),
    // 2. Toppings
    turnToppingsIntoPages(params),
    // 3. Slicemasters
    // turnSlicemastersIntoPages(params);
  ]);
}
