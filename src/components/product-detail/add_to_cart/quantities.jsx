import React from 'react';

export default function SelectQuantity({ quantities }) {
  const max = 15;

  return (

    (!quantities.length) ? <select disabled>---</select> : (
      <select name="Select Quantity">
        <option defaultValue>---</option>
        {quantities.map((size, i) => <option value={size} key={i}>{size}</option>)}
      </select>
    )
  );
};