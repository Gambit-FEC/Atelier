import React, { createContext, useState } from 'react';
import Reviews from './reviews/Reviews';
import Ratings from './ratings/Ratings';

export const RatingsAndReviewsContext = createContext();

export default function RatingsAndReviews() {
  const [reviewsCount, setReviewsCount] = useState(() => 5);
  const [reviewsSort, setReviewsSort] = useState(() => 'relevant');
  const value = {
    reviewsCount, setReviewsCount
  };
  return (
    <RatingsAndReviewsContext.Provider value={value}>
      <div className="ratings-and-reviews">
        <Ratings />
        <Reviews />
      </div>
    </RatingsAndReviewsContext.Provider>
  );
}
