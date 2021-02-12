import React from 'react';
import { graphql } from 'gatsby';
import PizzaList from '../components/PizzaList';
import ToppingsFilter from '../components/ToppingsFilter';

const PizzasPage = (props) => {
  const { data } = props;
  return (
    <>
      <ToppingsFilter />
      <PizzaList pizzas={data.pizzas} />
    </>
  );
};

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        price
        id
        slug {
          current
        }
        toppings {
          id
          name
          vegetarian
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default PizzasPage;
