import React from 'react';

export default function SelectQuantity({ quantities, onChange }) {
  return (

    (!quantities.length) ? <select disabled>---</select> : (
      <select name="Select Quantity" onChange={(e) => onChange(e)}>
        <option defaultValue>1</option>
        {quantities.map((size, i) => <option value={size} key={i}>{size}</option>)}
      </select>
    )
  );
};
