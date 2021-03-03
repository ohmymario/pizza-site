import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import formatMoney from '../utils/formatMoney';

const PizzaOrder = (props) => {
  const { order, pizzas, removeFromOrder } = props;
  return (
    <>
      {order.map((singleOrder, i) => {
        const selectedPizza = pizzas.nodes.find(
          (pizza) => pizza.id === singleOrder.id
        );

        return (
          <MenuItemStyles key={`${singleOrder.id}-${i}`}>
            <Img fluid={selectedPizza.image.asset.fluid} />
            <h2>{selectedPizza.name}</h2>
            <p>
              {formatMoney(
                calculatePizzaPrice(selectedPizza.price, singleOrder.size)
              )}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${selectedPizza.name} from Order`}
                onClick={() => removeFromOrder(i)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
};

export default PizzaOrder;
