import React from 'react';
// import { RatingsAndReviewsProvider } from './context/RatingsAndReviewsContext';
import Reviews from './reviews/Reviews';
import { useId, updateId } from '../../context/GlobalStore';

export default function RatingsAndReviews() {
  const id = useId();
  const setId = updateId();
  return (
    <>
      <h1>{id}</h1>
      <button type="button" onClick={() => setId(id + 1)}>Increment</button>
    </>
    // <RatingsAndReviewsProvider>
    //   {/* <Ratings /> */}
    //   {/* <Reviews /> */}
    // </RatingsAndReviewsProvider>
  );
}
