import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../../../context/GlobalStore';
import ReviewTile from './ReviewTile';
import { RatingsAndReviewsContext } from '../../RatingsAndReviews';

export default function ReviewsList() {
  const { productId } = useGlobalContext();
  const [reviews, setReviews] = useState([]);
  const { reviewsSort } = useContext(RatingsAndReviewsContext);
  const { reviewsCount } = useContext(RatingsAndReviewsContext);
  const fetchReviewsById = (prodId) => (
    axios.get(`/reviews/${prodId}/${reviewsCount}/${reviewsSort}`)
      .catch((err) => {
        console.log('error fetching reviews', err);
      })
  );

  useEffect(() => {
    fetchReviewsById(productId)
      .then(({ data }) => {
        setReviews(data.results);
      });
  }, [reviewsCount]);

  return (
    <div className="reviews-list">
      {reviews.map((review, idx) => <ReviewTile key={idx} review={review} />)}
    </div>
  );
}
