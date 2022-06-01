import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function AddButton({ size, quantity }) {
  console.log('add to cart works?', size);
  console.log('add to cart works?', quantity);

  const onAddtoCart = () => {
    alert('Added to cart!');
    axios.post('/cart')
      .then((result) => {
        console.log('axios post works?', result);
      })
      .catch((err) => { console.log('add to cart button did not send correctly', err); });
  };

  if (!size && !quantity) {
    return (
      <div>Please select size</div>
    );
  }
  return (
    <Add onClick={() => onAddtoCart()}>Add to Cart</Add>
  );
}

const Add = styled.button`
  max-width: 200px;
  height: 30px;
  cursor: pointer;
`;
