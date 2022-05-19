import React from 'react';
import { RatingsAndReviewsProvider } from './context/RatingsAndReviewsContext';
import Reviews from './reviews/Reviews';
import { useId, useIdUpdate } from '../../context/GlobalStore';

export default function RatingsAndReviews() {
  const id = useId();
  const updateId = useIdUpdate();
  return (
    <>
    <h1>{id}</h1>
    <button onClick={updateId}></button>
    </>
    // <RatingsAndReviewsProvider>
    //   {/* <Ratings /> */}
    //   {/* <Reviews /> */}
    // </RatingsAndReviewsProvider>
  );
}
