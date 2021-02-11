import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

const PizzaItemStyles = styled.div`
  display: grid;

  @supports not (grid-template-rows: subgrid) {
    grid-template-rows: auto auto 1fr;
  }

  grid-template-rows: subgrid;
  grid-row: span 3;
  grid-gap: 1rem;

  h2,
  p {
    margin: 0;
  }
`;

const PizzaItem = (props) => {
  const {
    pizza: { name, toppings, slug, image },
  } = props;
  return (
    <PizzaItemStyles>
      <Link to={`/pizza/${slug.current}`}>
        <h2>
          <span className="mark">{name}</span>
        </h2>
      </Link>
      <p>{toppings.map((topping) => topping.name).join(', ')}</p>
      <Img fluid={image.asset.fluid} alt={name} />
    </PizzaItemStyles>
  );
};

export default PizzaItem;
