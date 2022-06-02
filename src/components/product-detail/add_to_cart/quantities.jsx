import React from 'react';
import styled from 'styled-components';

export default function SelectQuantity({ quantities, selectedSize }) {
  return (
    (!selectedSize) ? <Quantity disabled>---</Quantity> : (
      <Quantity name="Select Quantity">
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
