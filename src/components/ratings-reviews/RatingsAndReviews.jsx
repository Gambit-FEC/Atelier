import React from 'react';
// import { RatingsAndReviewsProvider } from './context/RatingsAndReviewsContext';
import Reviews from './reviews/Reviews';

export default function RatingsAndReviews() {
  return (
    <div className="ratings-and-reviews">
      {/* <Ratings /> */}
      <Reviews />
    </div>
  );
}
