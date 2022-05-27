import React from 'react';
import { useGlobalContext } from '../../../context/GlobalStore';
import { useRAndRContext } from '../../../context/RAndRContext';

export default function OverviewAndSort() {
  const { totalReviews } = useGlobalContext();
  const { reviewsSort, setReviewsSort } = useRAndRContext();
  const onChange = (event) => {
    setReviewsSort(event.target.value);
  };
  return (
    <div className="reviews-overview-and-sort">
      <span>
        {`${totalReviews || 0} total reviews sort by: `}
      </span>
      <select value={reviewsSort} onChange={onChange}>
        <option value="relevant">relevant</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
    </div>
  );
}
