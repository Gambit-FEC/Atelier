import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../../context/GlobalStore';
import { RatingsAndReviewsContext } from '../RatingsAndReviews';

export default function OverAllRating() {
  const { totalReviews, setTotalReviews } = useContext(RatingsAndReviewsContext);
  const { productId, avgRating, setAvgRating } = useGlobalContext();
  useEffect(() => {
    axios.get(`/reviews/averageRating/${productId}`)
      .then(({data}) => {
        console.log('fetched average')
        setTotalReviews(data.totalReviews);
        setAvgRating(data.average);
      })
      .catch((err) => {
        console.log('Error fetching average ratings:', err);
      });
  }, [productId, totalReviews]);
  return (
    <div className="ratings-overall"></div>
  );
}
