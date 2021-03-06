import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import SEO from '../components/SEO';
import PizzaOrder from '../components/PizzaOrder';

import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';

import useForm from '../utils/useForm';
import usePizza from '../utils/usePizza';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';
import calculateOrderTotal from '../utils/calculateOrderTotal';

const OrderPage = (props) => {
  const {
    data: { pizzas },
  } = props;

  const { values, updateValue } = useForm({
    name: '',
    email: '',
    a_password: '',
  });

  const {
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    error,
    loading,
    message,
  } = usePizza({
    pizzas,
    values,
  });

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <>
      <SEO title="Order a Pizza!" />

      {/* FORM */}
      <OrderStyles>
        {/* YOUR INFO */}
        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>
          <input
            type="a_password"
            name="a_password"
            id="a_password"
            className="a_password"
            value={values.a_password}
            tabIndex="-1"
            autoComplete="new-password"
            onChange={updateValue}
          />
        </fieldset>
        {/* MENU */}
        <fieldset className="menu" disabled={loading}>
          <legend>Menu</legend>
          {pizzas.nodes.map(({ name, id, image, price }) => (
            <MenuItemStyles key={id}>
              <Img
                width="50"
                height="50"
                fluid={image.asset.fluid}
                alt={name}
              />
              <div>
                <h2>{name}</h2>
              </div>
              <div className="order-btn">
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() =>
                      addToOrder({
                        name,
                        price: formatMoney(calculatePizzaPrice(price, size)),
                        id,
                        size,
                        image: image.asset.fluid.src,
                      })
                    }
                  >
                    {size} {formatMoney(calculatePizzaPrice(price, size))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        {/* ORDER */}
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          <PizzaOrder
            order={order}
            pizzas={pizzas}
            removeFromOrder={removeFromOrder}
          />
        </fieldset>
        {/* ORDER TOTAL */}
        <fieldset disabled={loading}>
          <h3>Your total is {calculateOrderTotal(order, pizzas.nodes)}</h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading} onClick={submitOrder}>
            {loading ? 'Placing Order...' : 'Order Ahead'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
};

export const query = graphql`
  query {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default OrderPage;
