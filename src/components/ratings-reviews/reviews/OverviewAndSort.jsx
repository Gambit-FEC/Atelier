import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { RatingsAndReviewsContext } from '../RatingsAndReviews';
import { useGlobalContext } from '../../../context/GlobalStore';

export default function OverviewAndSort() {
  const { reviewsSort, setReviewsSort } = useContext(RatingsAndReviewsContext);
  const { productId } = useGlobalContext();
  const onChange = (event) => {
    setReviewsSort(event.target.value);
  };
  axios.get(`/reviews/meta/${productId}`)
    .then(({data}) => {
      console.log(data);
    })
    .catch((err) => {
      console.log('error fetching reviews meta data:', err);
    });
  return (
    <div className="reviews-overview-and-sort">
      <span>{ } total reviews sort by: </span>
      <select value={reviewsSort} onChange={onChange}>
        <option value="relevant">relevant</option>
        <option value="newest">newest</option>
        <option value="helpful">helpful</option>
      </select>
    </div>
  );
}
