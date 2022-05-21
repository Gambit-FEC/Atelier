import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { RatingsAndReviewsContext } from '../RatingsAndReviews';
import { useGlobalContext } from '../../../context/GlobalStore';

export default function OverviewAndSort() {
  const { reviewsSort, setReviewsSort, totalReviews } = useContext(RatingsAndReviewsContext);
  const onChange = (event) => {
    setReviewsSort(event.target.value);
  };
  return (
    <div className="reviews-overview-and-sort">
      <span>{ totalReviews } total reviews sort by: </span>
      <select value={reviewsSort} onChange={onChange}>
        <option value="relevant">relevant</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
    </div>
  );
}
