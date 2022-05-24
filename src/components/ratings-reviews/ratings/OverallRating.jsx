import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../../context/GlobalStore';
import { RatingsAndReviewsContext } from '../RatingsAndReviews';

export default function OverAllRating() {
  const { setReviewsMeta } = useContext(RatingsAndReviewsContext);
  const { productId, setAvgRating } = useGlobalContext();
  useEffect(() => {
    axios.get(`/reviews/meta/${productId}`)
      .then(({ data }) => {
        console.log('fetched average', data);
        setReviewsMeta(data);
        setAvgRating(data.averageRating);
      })
      .catch((err) => {
        console.log('Error fetching average ratings:', err);
      });
  }, []);
  return (
    <div className="ratings-overall"></div>
  );
}
