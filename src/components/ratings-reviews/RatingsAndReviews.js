import React, { useState, useContext } from 'react';
import GlobalContext from '../../context/GlobalStore';

export default function RatingsAndReviews() {
  const productId = useContext(GlobalContext);
  return (
    <>
      <h1>{productId}</h1>
      <div className="Ratings" />
    </>
  );
}
