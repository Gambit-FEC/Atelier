import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../../context/GlobalStore';
import { RatingsAndReviewsContext } from '../RatingsAndReviews';

export default function OverAllRating() {
  const { totalReviews, setTotalReviews } = useContext(RatingsAndReviewsContext);
  const { productId, setAvgRating } = useGlobalContext();
  useEffect(() => {
    axios.get(`/reviews/meta/${productId}`)
      .then(({data}) => {
        console.log('fetched average');
        console.log(data);
        setTotalReviews(data.totalReviews);
        setAvgRating(data.averageRating);
      })
      .catch((err) => {
        console.log('Error fetching average ratings:', err);
      });
  }, [productId, totalReviews]);
  return (
    <div className="ratings-overall"></div>
  );
}
