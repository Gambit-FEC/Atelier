import React from 'react';
import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/GlobalStore';

export default function AddToCart() {
  const { productId } = useGlobalContext();
  return (
    <>
      <h1>
        carts?
        {' '}
        {productId}
      </h1>
      <h2>add to cart test</h2>
      <div>wow carts</div>
      <p>hello carts</p>
    </>
  );
}
