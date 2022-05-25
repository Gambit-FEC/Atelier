import React, { useContext } from 'react';
import { RatingsAndReviewsContext } from '../RatingsAndReviews';
import { CharacteristicsBar, CharacteristicsPointer } from '../../../styled-lib';

export default function ProductBreakdown() {
  const { reviewsMeta } = useContext(RatingsAndReviewsContext)
  console.log('reviews meta:', reviewsMeta);
  function calcPercent(value) {
    return Math.floor(parseFloat(value) * 20);
  }
  console.log(calcPercent(reviewsMeta?.characteristics.Comfort.value))
  return (
    <div className="ratings-product-breakdown">
      {reviewsMeta && Object.keys(reviewsMeta.characteristics).map((item) => (
        <div id={`${item}-breakdown`}>
          <div>{item}</div>
          <CharacteristicsBar>
            <CharacteristicsPointer position={calcPercent(reviewsMeta.characteristics[item].value)}>
            </CharacteristicsPointer>
          </CharacteristicsBar>
        </div>
      ))}
    </div>
  );
}
