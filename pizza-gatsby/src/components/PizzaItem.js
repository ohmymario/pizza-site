import React from 'react';
import { Link } from 'gatsby';

const PizzaItem = (props) => {
  const {
    pizza: { name, toppings, slug },
  } = props;
  return (
    <div>
      <Link to={`/pizza/${slug.current}`}>
        <h2>
          <span className="mark">{name}</span>
        </h2>
        <p>{toppings.map((topping) => topping.name).join(', ')}</p>
      </Link>
    </div>
  );
};

export default PizzaItem;
