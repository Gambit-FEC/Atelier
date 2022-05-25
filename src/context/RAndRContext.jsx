import React, { createContext, useState, useContext } from 'react';

const RAndRContext = createContext();

export function useRAndRContext() {
  return useContext(RAndRContext);
}

export function RAndRContextProvider({ children }) {
  const [reviewsSort, setReviewsSort] = useState(() => 'relevant');
  const [showAdd, setShowAdd] = useState(() => true);
  const [reviewsMeta, setReviewsMeta] = useState(() => { });
  const [totalRatings, setTotalRatings] = useState(() => 0);
  const [reviews, setReviews] = useState(() => []);
  const [page, setPage] = useState(() => 1);
  const [reviewsFilter, setReviewsFilter] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
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
    page,
    setPage,
    reviewsFilter,
    setReviewsFilter,
  };
  return (
    <RAndRContext.Provider value={value}>
      {children}
    </RAndRContext.Provider>
  );
}
