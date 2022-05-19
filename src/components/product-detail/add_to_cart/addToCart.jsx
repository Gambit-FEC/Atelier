import React from 'react';
import { useId } from '../../../context/GlobalStore';

export default function AddToCart() {
  const [productId, setProductId] = useId();
  return (
    <>
      <h1>carts? {productId}</h1>
      <h2>add to cart test</h2>
      <div>wow carts</div>
      <p>hello carts</p>
    </>
  );
}
