import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Reviews from './reviews/Reviews';
import Ratings from './ratings/Ratings';
import { useGlobalContext } from '../../context/GlobalStore';

export const RatingsAndReviewsContext = createContext();

export default function RatingsAndReviews() {
  const { productId } = useGlobalContext();

  const [reviewsSort, setReviewsSort] = useState(() => 'relevant');
  const [showAdd, setShowAdd] = useState(() => true);
  const [reviewsMeta, setReviewsMeta] = useState(() => { });
  const [totalRatings, setTotalRatings] = useState(() => 0);
  const [reviews, setReviews] = useState(() => []);
  const [page, setPage] = useState(() => 1);
  console.log('ratings and reviews [rendered]');

  useEffect(() => {
    setPage(1);
    setReviews([]);
  }, [reviewsSort]);

  useEffect(() => {
    axios.get(`/reviews/${productId}/${page}/${reviewsSort}`)
      .then(({ data }) => {
        if (data.results.length < 2) setShowAdd(false);
        setReviews(reviews.concat(...data.results));
      })
      .catch((err) => {
        console.log('error fetching reviews', err);
      });
  }, [page]);

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
