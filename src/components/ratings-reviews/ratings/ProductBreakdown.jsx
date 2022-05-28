import React from 'react';
import { CharacteristicsBar, CharacteristicsPointer } from '../../../styled-lib';
import { useRAndRContext } from '../../../context/RAndRContext';

export default function ProductBreakdown() {
  const { reviewsMeta } = useRAndRContext();
  function calcPercent(value) {
    return Math.floor(parseFloat(value) * 20);
  }
  return (
    <div className="ratings-product-breakdown">
      {reviewsMeta && Object.keys(reviewsMeta.characteristics).map((item, index) => (
        <div key={index} id={`${item}-breakdown`}>
          <div>{item}</div>
          <CharacteristicsBar className={`${item}-characteristics-bar`}>
            <CharacteristicsPointer
              className={`${item}-bar-pointer`}
              position={calcPercent(reviewsMeta.characteristics[item].value)}
            />
          </CharacteristicsBar>
        </div>
      ))}
    </div>
  );
}
