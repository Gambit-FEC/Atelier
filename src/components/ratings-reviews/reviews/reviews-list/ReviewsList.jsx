import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../../../context/GlobalStore';
import ReviewTile from './ReviewTile';

export default function ReviewsList() {
  const { productId } = useGlobalContext();
  const [reviews, setReviews] = useState([]);
  const fetchReviewsById = (prodId) => (
    axios.get(`/reviews/${prodId}`)
      .catch((err) => {
        console.log('error fetching reviews', err);
      })
  );

  useEffect(() => {
    fetchReviewsById(productId)
      .then(({ data }) => {
        setReviews(data.results);
      });
  }, []);

  return (
    <div className="reviews-list">
      {reviews.map((review, idx) => <ReviewTile key={idx} review={review} />)}
    </div>
  );
}
