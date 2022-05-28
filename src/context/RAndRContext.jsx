import React, { createContext, useState, useContext } from 'react';

const RAndRContext = createContext();

export function useRAndRContext() {
  return useContext(RAndRContext);
}

export function RAndRContextProvider({ children }) {
  const [reviews, setReviews] = useState(() => []);
  const [reviewsMeta, setReviewsMeta] = useState(() => { });
  const [count, setCount] = useState(() => 2);
  const [reviewsSort, setReviewsSort] = useState(() => 'relevant');
  const [reviewsFilter, setReviewsFilter] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const [totalRatings, setTotalRatings] = useState(() => 0);
  const [showAdd, setShowAdd] = useState(() => true);
  const [showWriteReview, setShowWriteReview] = useState(() => false);
  const [reviewSearch, setReviewSearch] = useState(() => '');
  const [reviewFeedback, setReviewFeedback] = useState({
    helpful: [],
    reported: [],
  });

  const value = {
    reviewsSort,
    setReviewsSort,
    showAdd,
    setShowAdd,
    reviewsMeta,
    setReviewsMeta,
    totalRatings,
    setTotalRatings,
    reviews,
    setReviews,
    count,
    setCount,
    reviewsFilter,
    setReviewsFilter,
    showWriteReview,
    setShowWriteReview,
    reviewSearch,
    setReviewSearch,
    reviewFeedback,
    setReviewFeedback,
  };
  return (
    <RAndRContext.Provider value={value}>
      {children}
    </RAndRContext.Provider>
  );
}
