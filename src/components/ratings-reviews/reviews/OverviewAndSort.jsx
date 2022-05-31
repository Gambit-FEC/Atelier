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
    <div className="reviews-overview-and-sort" style={{ userSelect: 'none' }}>
      <span>
        {`${totalReviews || 0} Total reviews sort by: `}
      </span>
      <select value={reviewsSort} onChange={onChange}>
        <option value="relevant">Relevant</option>
        <option value="newest">Newest</option>
        <option value="helpful">Helpful</option>
      </select>
    </div>
  );
}
