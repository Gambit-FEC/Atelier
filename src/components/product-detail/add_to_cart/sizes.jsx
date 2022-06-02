import React from 'react';
import styled from 'styled-components';

export default function SelectSize({ sizes, selectedSize, onChange }) {
  return (
    (!sizes.length)
      ? <Size disabled>OUT OF STOCK</Size>
      : (
        <Size name="Select Size" onChange={(e) => onChange(e)}>
          <option defaultValue>Select Size</option>
          {sizes.map((size, i) => <option value={size} key={i}>{size}</option>)}
        </Size>
      )
  );
}

const Size = styled.select`
  width: 240px;
  height: 30px;
`;
