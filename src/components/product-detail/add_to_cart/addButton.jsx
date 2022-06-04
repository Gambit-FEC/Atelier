/* eslint-disable no-else-return */
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

export default function AddButton({ size, quantity }) {
  const onAddtoCart = () => {
    alert('Added to cart!');
    axios.post('/cart')
      .then((result) => { console.log('Added to cart', result); })
      .catch((err) => { console.error('ERROR: Did not correctly send item to cart', err); });
  };
  if (!size) {
    return (<Text>Please select a size</Text>);
  } else if (size && !quantity) {
    return (<Text>Please select a quantity</Text>);
  } else if (size && quantity) {
    return (<Add onClick={() => onAddtoCart()}>Add to Cart</Add>);
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
  &: hover {
    color: #9F2B68;
    box-shadow: #9F2B68 0px 0px 10px
  };
`;
