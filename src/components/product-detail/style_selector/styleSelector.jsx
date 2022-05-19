import React from 'react';
import { useId } from '../../../context/GlobalStore';

export default function StyleSelector() {
  const productId = useId();
  return (
    <>
      <h1>style selector? {productId}</h1>
      <h2>style selector test</h2>
      <div>wow style selectors</div>
      <p>hello styleselector</p>
    </>
  );
}
