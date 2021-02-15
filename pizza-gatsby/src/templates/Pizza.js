import React from 'react';
import { graphql } from 'gatsby';

const SinglePizzaPage = (props) => {
  console.log(props.data);
  return (
    <div>
      <p>Single Pizza</p>
    </div>
  );
};

export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;

export default SinglePizzaPage;
