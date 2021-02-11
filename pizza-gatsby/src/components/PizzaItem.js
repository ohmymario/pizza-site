import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

const PizzaItem = (props) => {
  const {
    pizza: { name, toppings, slug, image },
  } = props;
  return (
    <div>
      <Link to={`/pizza/${slug.current}`}>
        {/* Name */}
        <h2>
          <span className="mark">{name}</span>
        </h2>
        {/* Toppings */}
        <p>{toppings.map((topping) => topping.name).join(', ')}</p>
        {/* Image */}
        <Img fluid={image.asset.fluid} alt={name} />
      </Link>
    </div>
  );
};

export default PizzaItem;
