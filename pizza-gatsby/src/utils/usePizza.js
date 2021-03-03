import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';

const usePizza = (props) => {
  const { pizzas, inputs } = props;

  // 1. Create some state to hold our order
  // data lives in context
  const [order, setOrder] = useContext(OrderContext);

  // 2. Make a function add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  // 3. Make a function remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }

  // TODO 4. Send this data to a serverless function when user checks out

  return { order, addToOrder, removeFromOrder };
};

export default usePizza;
