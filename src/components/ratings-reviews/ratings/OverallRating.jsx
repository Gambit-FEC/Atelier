import React from 'react';
import { useGlobalContext } from '../../../context/GlobalStore';
import { StyledRatingStars } from '../../../styled-lib';
import { useRAndRContext } from '../../../context/RAndRContext';

export default function OverallRating() {
  const { reviewsMeta } = useRAndRContext();
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
      <StyledRatingStars size="xxx-large" rating={avgRating} border="2">★★★★★</StyledRatingStars>
      <span style={{ marginLeft: '20px', fontSize: '48px' }}>{avgRating}</span>
      {recommended && <div>{`${Math.floor((recommended.true / (recommended.true + recommended.false)) * 100)}% of reviews recommend this product`}</div>}
    </div>
  );
}
