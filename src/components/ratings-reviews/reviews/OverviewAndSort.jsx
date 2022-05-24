import React, { useContext } from 'react';
import { RatingsAndReviewsContext } from '../RatingsAndReviews';

export default function OverviewAndSort() {
  const { reviewsSort, setReviewsSort, reviewsMeta } = useContext(RatingsAndReviewsContext);
  const onChange = (event) => {
    setReviewsSort(event.target.value);
  };
  return (
    <div className="reviews-overview-and-sort">
      <span>
        {reviewsMeta ? reviewsMeta.totalRatings : 0}
        {' '}
        total reviews** sort by:
        {' '}
      </span>
      <select value={reviewsSort} onChange={onChange}>
        <option value="relevant">relevant</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
    </div>
  );
}
