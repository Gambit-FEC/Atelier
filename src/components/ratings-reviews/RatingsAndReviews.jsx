import React, { useEffect } from 'react';
import axios from 'axios';
import Reviews from './reviews/Reviews';
import Ratings from './ratings/Ratings';
import WriteReview from './write-review/WriteReview';
import { useGlobalContext } from '../../context/GlobalStore';
import { useRAndRContext } from '../../context/RAndRContext';

export default function RatingsAndReviews() {
  const { productId, setAvgRating, setTotalReviews } = useGlobalContext();
  const {
    setReviewsMeta,
    setReviews,
    reviewsSort,
    showWriteReview,
    reviewFeedback,
    setReviewFeedback,
  } = useRAndRContext();
  useEffect(() => {
    axios.get(`/reviews/meta/${productId}`)
      .then(({ data }) => {
        setReviewsMeta(data);
        setAvgRating(data.averageRating);
        axios.get(`/reviews/${productId}/1/${data.totalRatings}/${reviewsSort}`)
          .then(({ data }) => {
            setReviews(data.results.map((item) => ({ ...item, response: item.response || '' })));
            setTotalReviews(data.results.length);
          })
          .catch((err) => {
            console.log('Error fetching reviews', err);
          });
      })
      .catch((err) => {
        console.log('Error fetching average ratings:', err);
      });
  }, [productId, reviewsSort, showWriteReview, reviewFeedback.helpful]);

  useEffect(() => {
    setReviewFeedback({
      helpful: JSON.parse(localStorage.getItem('helpful')) || [],
      reported: JSON.parse(localStorage.getItem('reported')) || [],
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('helpful', JSON.stringify(reviewFeedback.helpful));
    localStorage.setItem('reported', JSON.stringify(reviewFeedback.reported));
  }, [reviewFeedback]);
  return (
    <div id="ratings-and-reviews">
      <Ratings />
      <Reviews />
      {showWriteReview && <WriteReview />}
    </div>
  );
}
