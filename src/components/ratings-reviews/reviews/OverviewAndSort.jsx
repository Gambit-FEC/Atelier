import React, { useContext } from 'react';
import { RatingsAndReviewsContext } from '../RatingsAndReviews';

export default function OverviewAndSort() {
  const { reviewsSort, setReviewsSort, totalRatings } = useContext(RatingsAndReviewsContext);
  const onChange = (event) => {
    setReviewsSort(event.target.value);
  };
  return (
    <div className="reviews-overview-and-sort">
      <span>
        {totalRatings}
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
