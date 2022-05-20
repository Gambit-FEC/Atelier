import React from 'react';
import { useGlobalContext } from '../../../context/GlobalStore';

export default function ImageGallery() {
  const { productId } = useGlobalContext();
  return (
    <>
      <h1>
        imageGallery?
        {' '}
        {productId}
      </h1>
      <h2>image gallery test</h2>
      <div>wow images</div>
      <p>hello images</p>
    </>
  );
}
