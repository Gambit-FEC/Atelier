import React from 'react';
import { useId } from '../../context/GlobalStore';

export default function RelatedItems() {
  const [productId, setProductId] = useId();
  return (
    <>
      <h1>{productId}</h1>
    </>
  );
}
