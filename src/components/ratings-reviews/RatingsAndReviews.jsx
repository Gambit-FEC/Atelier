import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Reviews from './reviews/Reviews';
import Ratings from './ratings/Ratings';
import { useGlobalContext } from '../../context/GlobalStore';

export const RatingsAndReviewsContext = createContext();

export default function RatingsAndReviews() {
  const { productId, setProductId, setAvgRating } = useGlobalContext();

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
    5: false
  });
  console.log('ratings and reviews [rendered]');

  useEffect(() => {
    axios.get(`/reviews/meta/${productId}`)
      .then(({ data }) => {
        console.log('meta', data)
        setReviewsMeta(data);
        setAvgRating(data.averageRating);
      })
      .catch((err) => {
        console.log('Error fetching average ratings:', err);
      });
  }, []);

  useEffect(() => {
    if (page === 1) {
      axios.get(`/reviews/${productId}/${page}/${reviewsSort}`)
        .then(({ data }) => {
          if (data.results.length < 2) setShowAdd(false);
          setReviews(data.results);
        })
        .catch((err) => {
          console.log('error fetching reviews', err);
        });
    } else {
      setPage(1);
      setReviews([]);
      setShowAdd(true);
    }
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
    reviewsFilter,
    setReviewsFilter,
  };

  return (
    <RatingsAndReviewsContext.Provider value={value}>
      <div id="ratings-and-reviews">
        <Ratings />
        <Reviews />
      </div>
    </RatingsAndReviewsContext.Provider>
  );
}
