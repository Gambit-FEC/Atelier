import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/GlobalStore';

export default function AddToCart() {
  const { productId } = useGlobalContext();
  return (
    <>
      <h2>add to cart test</h2>
      <div>wow carts</div>
      <p>hello carts</p>
    </>
  );
}
