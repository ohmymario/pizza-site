import styled from 'styled-components/macro';

const OrderStyles = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  fieldset {
    display: grid;
    gap: 1rem;
    grid-column: span 2;
    max-height: 600px;
    overflow: auto;
    label {
      display: grid;
      gap: 1rem;
      align-content: start;
    }
    label + label {
      margin-top: 1rem;
    }
    &.order,
    &.menu {
      grid-column: span 1;
      align-content: start;
      /* Chrome is weird about Grid and fieldsets, so we add a fixed height to fix it :)  */
      height: 600px;
    }
  }
  .a_password {
    display: none;
  }
  @media (max-width: 950px) {
    fieldset.menu,
    fieldset.order {
      grid-column: span 2;
    }
  }
`;
export default OrderStyles;
