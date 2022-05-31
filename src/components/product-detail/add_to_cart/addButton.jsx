import React from 'react';
import styled from 'styled-components';

export default function AddButton({ size, quantity }) {
  console.log('add to cart works?', size);
  console.log('add to cart works?', quantity);
  if (!size && !quantity) {
  } else {
    return (
      <Add>Add to Cart</Add>
    );
  }
}

const Add = styled.button`
  max-width: 150px;
  height: 20px;
`;
