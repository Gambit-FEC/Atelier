/* eslint-disable no-else-return */
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function AddButton({ size, quantity }) {
  const onAddtoCart = () => {
    alert('Added to cart!');
    axios.post('/cart')
      .then((result) => {
        // console.log('axios post works?', result);
      })
      .catch((err) => { console.log('add to cart button did not send correctly', err); });
  };

  if (!size) {
    return (
      <Text>Please select a size</Text>
    );
  } else if (size && !quantity) {
    return (
      <Text>Please select a quantity</Text>
    );
  } else if (size && quantity) {
    return (
      <Add onClick={() => onAddtoCart()}>Add to Cart</Add>
    );
  }
}

const Text = styled.div`
  color: rgba(102, 91, 165, 1);
`;

const Add = styled.button`
  width: 335px;
  height: 35px;
  cursor: pointer;
  border-radius: 5px;
  padding: 10px 20px 10px 20px;
  &: hover {background-color: #9F2B68;};
`;
