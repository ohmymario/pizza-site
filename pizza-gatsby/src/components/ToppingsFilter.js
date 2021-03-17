import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  // Target Link from styled-components
  a {
    display: grid;
    // auto - name / 1fr quantity
    grid-template-columns: auto 1fr;
    gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    text-decoration: none;
    font-size: clamp(1.4rem, 1vw, 2.5rem);
    .count {
      background: white;
      padding: 2px 5px;
    }
    /* aria-current given by LINK */
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

const countPizzasWithTopping = (pizzas) => {
  // Return the pizzas in count
  const onlyToppings = pizzas.map((pizza) => pizza.toppings).flat();
  const countedToppings = onlyToppings.reduce((acc, { id, name }) => {
    if (acc[id]) {
      // Found - Increment
      acc[id].count += 1;
    } else {
      // Not Found - New entry
      acc[id] = { name, count: 1, id };
    }
    return acc;
  }, {});

  const sortedCountedToppings = Object.values(countedToppings).sort(
    (a, b) => b.count - a.count
  );

  return sortedCountedToppings;
};

const ToppingsFilter = (props) => {
  const { activeTopping } = props;

  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  const toppingsWithCounts = countPizzasWithTopping(pizzas.nodes);
  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link key={topping.id} to={`/topping/${topping.name}`}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
};

export default ToppingsFilter;
