import React from 'react';
import { useId } from '../../../context/GlobalStore';

export default function ProductInfo() {
  const productId = useId();
  return (
    <>
      <h1>product info? {productId}</h1>
      <h2>product info test</h2>
      <div>wow product info</div>
      <p>hello product info</p>
    </>
  );
}
