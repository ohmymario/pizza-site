import React from 'react';
import styled from 'styled-components';
import PizzaItem from './PizzaItem';

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const PizzaList = (props) => {
  const { pizzas } = props;
  return (
    <PizzaGridStyles>
      {pizzas.nodes.map((pizza) => (
        <PizzaItem key={pizza.id} pizza={pizza} />
      ))}
    </PizzaGridStyles>
  );
};

export default PizzaList;
