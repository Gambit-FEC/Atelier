import React, { useContext } from 'react';
import { RatingBar } from '../../../styled-lib';
import { RatingsAndReviewsContext } from '../RatingsAndReviews';

export default function StarBars() {
  const { reviewsMeta, setReviewsFilter, reviewsFilter } = useContext(RatingsAndReviewsContext);
  function calcPercents(ratings) {
    var percents = [];
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
    if (star === reviewsFilter) setReviewsFilter('');
    else setReviewsFilter(star);
  }
  return (
    <div className="ratings-star-bars">
      {reviewsMeta && (
        <>
          {calcPercents(reviewsMeta.ratings).map((item, index) => (
            <div id={`star-bar-${index}`} key={index} onClick={() => handleRatingClick(index.toString())}>
              {index === 1 && <div>{`${index} Star`}</div>}
              {index !== 1 && <div>{`${index} Stars`}</div>}
              <RatingBar percent={item} />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
