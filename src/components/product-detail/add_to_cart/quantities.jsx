import React from 'react';
import styled from 'styled-components';

export default function SelectQuantity({ quantities, selectedSize, onChange }) {
  return (
    (!selectedSize)
      ? (
        <Quantity disabled>
          <option defaultValue>---</option>
        </Quantity>
      )
      : (
        <Quantity name="Select Quantity" onChange={(e) => onChange(e)}>
          <option defaultValue>---</option>
          {quantities.map((size, i) => <option value={size} key={i}>{size}</option>)}
        </Quantity>
      )
  );
}

const Quantity = styled.select`
  width: 80px;
  height: 30px;
`;
