import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

// Custom Input Components

// Given in sanity docs
// https://www.sanity.io/docs/custom-input-widgets
const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set(Number(value)));

const formatMoney = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format;

const PriceInput = (props) => {
  // All props needed and given by Sanity
  const { type, value, onChange, inputComponent } = props;
  return (
    <div>
      <h2>
        {type.title} - {value ? formatMoney(value / 100) : ''}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFrom(event.target.value))}
        ref={inputComponent}
      />
    </div>
  );
};

PriceInput.focus = () => {
  this._inputElement.focus();
};

export default PriceInput;
