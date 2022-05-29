import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/GlobalStore';

export default function AddToCart({ productInfo, currentStyle }) {
  const { productId } = useGlobalContext();

  const onAddtoCart = () => {
    console.log('add me to cart hohoho', productInfo);
    console.log('add me to cart hohoho with style', productInfo[currentStyle].skus);
  }

  return (
    <Wrapper>
      <select value="Select Style">Select Style</select>
      <select>Select Size</select>
      <button value="click-addtocart" onClick={onAddtoCart}>Add to Cart</button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 4em;
  align-items: flex-end;
`;