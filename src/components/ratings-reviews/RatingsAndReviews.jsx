import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Reviews from './reviews/Reviews';
import Ratings from './ratings/Ratings';
import { useGlobalContext } from '../../context/GlobalStore';

export const RatingsAndReviewsContext = createContext();

export default function RatingsAndReviews() {
  const { productId } = useGlobalContext();

  const [reviewsShown, setReviewsShown] = useState(() => 2);
  const [reviewsSort, setReviewsSort] = useState(() => 'relevant');
  const [showAdd, setShowAdd] = useState(() => true);
  const [reviewsMeta, setReviewsMeta] = useState(() => { });
  const [totalReviews, setTotalReviews] = useState(() => 0);
  const [reviews, setReviews] = useState(() => []);

  useEffect(() => {
    axios.get(`/reviews/${productId}/${reviewsShown}/${reviewsSort}`)
      .then(({ data }) => {
        console.log('fetched reviews');
        setReviews(data.results);
        (reviewsShown < totalReviews) ? setShowAdd(true) : setShowAdd(false);
      })
      .catch((err) => {
        console.log('error fetching reviews', err);
      });
  }, [reviewsShown, reviewsSort]);

  const value = {
    reviewsShown,
    setReviewsShown,
    reviewsSort,
    setReviewsSort,
    showAdd,
    setShowAdd,
    reviewsMeta,
    setReviewsMeta,
    totalReviews,
    setTotalReviews,
    reviews,
    setReviews,
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
