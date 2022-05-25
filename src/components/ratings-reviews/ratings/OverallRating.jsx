import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../../context/GlobalStore';
import { RatingsAndReviewsContext } from '../RatingsAndReviews';
import { StyledRatingStars } from '../../../styled-lib';

export default function OverallRating() {
  const { reviewsMeta } = useContext(RatingsAndReviewsContext);
  const { avgRating } = useGlobalContext();
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
      <StyledRatingStars size="xxx-large" rating={avgRating} border="2">★★★★★</StyledRatingStars>
      {recommended && <div>{`${Math.floor((recommended.true / (recommended.true + recommended.false)) * 100)}% of reviews recommend this product`}</div>}
    </div>
  );
}
