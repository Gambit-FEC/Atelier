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
      {reviewsMeta && Object.keys(reviewsMeta.characteristics).map((characteristic, index) => (
        <div key={index} id={`${characteristic}-breakdown`}>
          <div style={{ fontWeight: 'bold' }}>{characteristic}</div>
          <CharacteristicsBar className={`${characteristic}-characteristics-bar`}>
            <CharacteristicsPointer
              className={`${characteristic}-bar-pointer`}
              position={calcPercent(reviewsMeta.characteristics[characteristic].value)}
            />
          </CharacteristicsBar>
          <div className="first-and-last-char">
            <div className="first-char">{characteristicsMeaning[characteristic][0]}</div>
            <div className="last-char">{characteristicsMeaning[characteristic][4]}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
