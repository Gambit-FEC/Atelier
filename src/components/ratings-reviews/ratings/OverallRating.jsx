import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../../context/GlobalStore';
import { RatingsAndReviewsContext } from '../RatingsAndReviews';
import StyledRatingStars from '../../../styled-lib';

export default function OverallRating() {
  const { setReviewsMeta } = useContext(RatingsAndReviewsContext);
  const { productId, setAvgRating, avgRating } = useGlobalContext();
  useEffect(() => {
    axios.get(`/reviews/meta/${productId}`)
      .then(({ data }) => {
        console.log('fetched average');
        setReviewsMeta(data);
        setAvgRating(data.averageRating);
      })
      .catch((err) => {
        console.log('Error fetching average ratings:', err);
      });
  }, []);

  return (
    <div className="ratings-overall">
      <span style={{ fontSize: '48px' }}>{avgRating}</span>
      <StyledRatingStars rating={avgRating}>☆☆☆☆☆</StyledRatingStars>
    </div>
  );
}
