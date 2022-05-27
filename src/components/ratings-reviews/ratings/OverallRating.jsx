import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../context/GlobalStore';
import { StyledRatingStars } from '../../../styled-lib';
import { useRAndRContext } from '../../../context/RAndRContext';

export default function OverallRating() {
  const { reviewsMeta } = useRAndRContext();
  const { avgRating } = useGlobalContext();
  const [recommended, setRecommended] = useState(0);
  useEffect(() => {
    if (reviewsMeta) {
      setRecommended(
        Math.floor(
          (parseInt(reviewsMeta.recommended.true, 10)
            / (parseInt(reviewsMeta.recommended.true, 10)
              + parseInt(reviewsMeta.recommended.false, 10)))
          * 100,
        ),
      );
    }
  }, [reviewsMeta]);
  return (
    <div className="ratings-overall">
      <StyledRatingStars size="xxx-large" rating={avgRating} border="2">★★★★★</StyledRatingStars>
      <span style={{ marginLeft: '20px', fontSize: '48px' }}>{avgRating}</span>
      <div>{`${recommended}% of reviews recommend this product`}</div>
    </div>
  );
}
