import React from 'react';

export default function SelectSize({ sizes, onChange }) {
  return (
    (!sizes.length) ? <select disabled>OUT OF STOCK</select> : (
      <select name="Select Size" onChange={(e) => onChange(e)}>
        <option defaultValue>Select Size</option>
        {sizes.map((size, i) => <option value={size} key={i}>{size}</option>)}
      </select>
    )
  );
};