import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useId } from '../../../../context/GlobalStore';
import ReviewTile from './ReviewTile';

export default function ReviewsList() {
  const id = useId();
  const [reviews, setReviews] = useState([]);
  const fetchReviewsById = (id) => (
    axios.get(`/reviews/${id}`)
      .catch((err) => {
        console.log('error fetching reviews', err);
      })
  );

  useEffect(() => {
    fetchReviewsById(id)
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
