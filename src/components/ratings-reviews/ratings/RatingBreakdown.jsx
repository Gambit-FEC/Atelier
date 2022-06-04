import React from 'react';
import { useRAndRContext } from '../../../context/RAndRContext';
import { RatingBar, StarButton } from '../../../styled-lib';

export default function RatingBreakdown() {
  const { reviewsMeta, setReviewsFilter, reviewsFilter } = useRAndRContext();
  function calcPercents(ratings) {
    const percents = [];
    let highestStar = 0;
    for (let i = 1; i <= 5; i++) {
      percents[i] = parseInt(ratings[i], 10) || 0;
      if (percents[i] > highestStar) {
        highestStar = percents[i];
      }
    }
    return percents.map((item) => Math.floor((item / highestStar) * 100));
  }
  function handleRatingClick(star) {
    setReviewsFilter(
      Object.assign(
        {},
        reviewsFilter,
        reviewsFilter[star] = !reviewsFilter[star]
      )
    );
  }
  function handleResetClick() {
    setReviewsFilter({
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    });
  }
  return (
    <div className="rating-breakdown">
      {reviewsMeta && (
        <>
          {calcPercents(reviewsMeta.ratings).map((item, index) => (
            <div id={`${index}-star`} key={index} style={{ fontSize: '20px' }}>
              <StarButton
                id={`${index}-star-filter-button`}
                className="underline-button"
                onClick={() => handleRatingClick(index.toString())}
              >
                {`${index} ★`}
              </StarButton>
              <span style={{ color: '#4a4a4a' }}>{` ${reviewsMeta.ratings[index] || 0}`}</span>
              <RatingBar id={`${index}-star-bar`} percent={item} />
            </div>
          ))}
          {Object.values(reviewsFilter).some((item) => item === true) && (
            <>
              <span>Filters applied </span>
              <button onClick={handleResetClick} className="underline-button">Reset Filters</button>
              <div id="rating-filters" style={{ marginTop: '5px' }}>
                {Object.values(reviewsFilter).map((item, index) => {
                  if (item === true) {
                    return <div key={index + 1}>{`${index + 1} ★`}</div>;
                  }
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
