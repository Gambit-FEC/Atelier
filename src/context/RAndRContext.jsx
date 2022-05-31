import React, { createContext, useState, useContext, useCallback } from 'react';

const RAndRContext = createContext();

export function useRAndRContext() {
  return useContext(RAndRContext);
}

export function RAndRContextProvider({ children }) {
  const [reviews, setReviews] = useState(() => []);
  const [reviewsMeta, setReviewsMeta] = useState();
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
  const [reviewFeedback, setReviewFeedback] = useState(() => ({
    helpful: [],
    reported: [],
  }));
  const [showCollapse, setShowCollapse] = useState(() => false);
  const [shownReviews, setShownReviews] = useState(() => []);
  const [characteristicsMeaning] = useState(() => ({
    Size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  }));
  const [lastReviewIdx, setLastReviewIdx] = useState(() => 0);

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
    showCollapse,
    setShowCollapse,
    shownReviews,
    setShownReviews,
    characteristicsMeaning,
    lastReviewIdx,
    setLastReviewIdx,
  };
  return (
    <RAndRContext.Provider value={value}>
      {children}
    </RAndRContext.Provider>
  );
}
