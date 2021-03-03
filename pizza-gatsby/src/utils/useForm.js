import { useState } from 'react';

export default function useForm(defaults) {
  // defaults - object with form
  const [values, setValues] = useState(defaults);

  function updateValue(e) {
    // destructure needed data
    let { value, name, type } = e.target;
    // if value is a number make sure to convert
    if (type === 'number') {
      value = parseInt(value);
    }
    setValues({
      // keep the existing values
      ...values,
      // update the new value with the name of the input
      [name]: value,
    });
  }

  return { values, updateValue };
}
