import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../../context/GlobalStore';
import { RatingsAndReviewsContext } from '../RatingsAndReviews';
import { StyledRatingStars } from '../../../styled-lib';

export default function OverallRating() {
  const { setReviewsMeta, reviewsMeta } = useContext(RatingsAndReviewsContext);
  const { productId, setAvgRating, avgRating } = useGlobalContext();
  useEffect(() => {
    axios.get(`/reviews/meta/${productId}`)
      .then(({ data }) => {
        console.log('fetched reviews meta:', data);
        setReviewsMeta(data);
        setAvgRating(data.averageRating);
      })
      .catch((err) => {
        console.log('Error fetching average ratings:', err);
      });
  }, []);
  let recommended;
  if (reviewsMeta) {
    recommended = {
      true: parseInt(reviewsMeta.recommended.true, 10),
      false: parseInt(reviewsMeta.recommended.false, 10),
    };
  }
  return (
    <div className="ratings-overall">
      <span style={{ fontSize: '48px' }}>{avgRating}</span>
      <StyledRatingStars size="xxx-large" rating={avgRating}>★★★★★</StyledRatingStars>
      {recommended && <div>{`${Math.floor((recommended.true / (recommended.true + recommended.false)) * 100)}% of reviews recommend this product`}</div>}
    </div>
  );
}
