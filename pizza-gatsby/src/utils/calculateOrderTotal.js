import formatMoney from './formatMoney';
import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // reduce
  // Loop over each item in the order
  const total = order.reduce((acc, curr) => {
    // Find the price for that item and add to acc
    const { price } = pizzas.find((pizza) => pizza.id === curr.id);
    return acc + calculatePizzaPrice(price, curr.size);
  }, 0);

  // return one value
  return formatMoney(total);
}
