import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import Logo from './Logo';

const NavStyles = styled.nav`
  margin-bottom: 3rem;
  .logo {
    transform: translateY(-25%);
  }
  ul {
    margin: 0;
    padding: 0;
    text-align: center;
    list-style: none;

    display: grid;
    /* link link logo link link */
    grid-template-columns: 1fr 1fr auto 1fr 1fr;
    grid-gap: 2rem;
    align-items: center;
    margin-top: -6rem;
  }
  li {
    transform: rotate(-2deg);
    order: 1;
    &:nth-child(1) {
      transform: rotate(1.2deg);
    }
    &:nth-child(2) {
      transform: rotate(-2.5deg);
    }
    &:nth-child(4) {
      transform: rotate(2.5deg);
    }
    &:hover {
      transform: rotate(3deg);
    }
  }
  a {
    font-size: 3rem;
    text-decoration: none;
    &:hover {
      color: var(--red);
    }
  }
`;

const Nav = () => (
  <NavStyles>
    <ul>
      <li>
        <Link to="/">Hot Now</Link>
      </li>
      <li>
        <Link to="/pizzas">Pizza Menus</Link>
      </li>
      <li>
        <Link to="/">
          <Logo />
        </Link>
      </li>
      <li>
        <Link to="/slicemasters">SliceMasters</Link>
      </li>
      <li>
        <Link to="/order">Order Ahead</Link>
      </li>
    </ul>
  </NavStyles>
);

export default Nav;
