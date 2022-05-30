import React from 'react';
import { CharacteristicsBar, CharacteristicsPointer } from '../../../styled-lib';
import { useRAndRContext } from '../../../context/RAndRContext';

export default function ProductBreakdown() {
  const { reviewsMeta, characteristicsMeaning } = useRAndRContext();
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
          <div className="first-and-last-char">
            <div className="first-char">{characteristicsMeaning[item][0]}</div>
            <div className="last-char">{characteristicsMeaning[item][4]}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
