import React from 'react';
import styled from 'styled-components/macro';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

const PizzaGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const SinglePizzaPage = ({ data }) => {
  const {
    pizza: { name, image, toppings },
  } = data;

  return (
    <>
      <SEO title={name} image={image?.asset?.fluid?.src} />
      <PizzaGrid>
        <Img fluid={image.asset.fluid} />
        <div>
          <h2 className="mark">{name}</h2>
          <ul>
            {toppings.map((topping) => (
              <li key={topping.id}>{topping.name}</li>
            ))}
          </ul>
        </div>
      </PizzaGrid>
    </>
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
