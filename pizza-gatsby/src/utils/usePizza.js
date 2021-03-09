import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';
import calculateOrderTotal from './calculateOrderTotal';

const usePizza = (props) => {
  // pizzas - all pizzas from graphql
  // values - values from the form
  const { pizzas, values } = props;

  // 1. Hold order data
  // state / data persists through context
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 2. add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }

  // 3. remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before the item we want to remove
      ...order.slice(0, index),
      // everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }

  // 4. Get state and body ready to submit data
  function getSubmitReady() {
    setLoading(true);
    setError(null);
    setMessage(null);
    const body = {
      order,
      total: calculateOrderTotal(order, pizzas.nodes),
      name: values.name,
      email: values.email,
    };
    return body;
  }

  // Run when user submits form
  // 5. Send this data to a serverless function when user checks out
  async function submitOrder(e) {
    e.preventDefault();
    const body = getSubmitReady();

    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = await JSON.parse(await res.text());

    // check if everything worked
    if (res.status >= 400 && res.status < 600) {
      // ERROR
      setLoading(false);
      setError(text.message);
    } else {
      // SUCCESS
      setLoading(false);
      setMessage('Success! Come on down and get your pizza!');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    submitOrder,
    error,
    loading,
    message,
  };
};

export default usePizza;
