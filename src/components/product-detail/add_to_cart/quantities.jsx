import React from 'react';
import styled from 'styled-components';

export default function SelectQuantity({ quantities }) {
  return (
    (!quantities.length) ? <Quantity disabled>---</Quantity> : (
      <Quantity name="Select Quantity">
        <option defaultValue>1</option>
        {quantities.map((size, i) => <option value={size} key={i}>{size}</option>)}
      </Quantity>
    )
  );
}

const Quantity = styled.select`
  max-width: 150px;
  height: 30px;
`;
