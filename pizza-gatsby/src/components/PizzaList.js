import React from 'react';
import PizzaItem from './PizzaItem';

const PizzaList = (props) => {
  const { pizzas } = props;
  return (
    <div>
      {pizzas.nodes.map((pizza) => (
        <PizzaItem key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
};

export default PizzaList;
