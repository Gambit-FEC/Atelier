import React, { createContext, useState, useContext } from 'react';

const RAndRContext = createContext();

export function useRAndRContext() {
  return useContext(RAndRContext);
}

export function RAndRContextProvider({ children }) {
  const [reviews, setReviews] = useState(() => []);
  const [reviewsMeta, setReviewsMeta] = useState(() => { });
  const [page, setPage] = useState(() => 1);
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
    page,
    setPage,
    reviewsFilter,
    setReviewsFilter,
    showWriteReview,
    setShowWriteReview,
  };
  return (
    <RAndRContext.Provider value={value}>
      {children}
    </RAndRContext.Provider>
  );
}
