import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function AddButton({ size, quantity }) {
  // console.log('add to cart works?', size);
  // console.log('add to cart works?', quantity);

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
  width: 337px;
  height: 35px;
  cursor: pointer;
  border-radius: 5px;
  padding: 10px 20px 10px 20px;
  &: hover {background-color: #9F2B68;};
`;
