import React from 'react';

export default function SelectSize({ sizes }) {
  return (
    (!sizes.length) ? <select disabled>OUT OF STOCK</select> : (
      <select name="Select Size">
        {sizes.map((size, i) => <option value={size} key={i}>{size}</option>)}
      </select>
    )
  );
};