import React from 'react';

export default function SelectQuantity({ quantities }) {
  return (
    (!quantities.length) ? <select disabled>---</select> : (
      <select name="Select Quantity">
        {quantities.map((size, i) => <option value={size} key={i}>{size}</option>)}
      </select>
    )
  );
};