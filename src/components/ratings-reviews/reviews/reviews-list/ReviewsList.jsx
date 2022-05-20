import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useId } from '../../../../context/GlobalStore';
import ReviewTile from './ReviewTile';
import config from '../../../../../config';
const {API_URL, API_KEY} = config;

export default function ReviewsList() {
  const id = useId();
  const [reviews, setReviews] = useState([]);
  const fetchReviewsById = (product_id) => (
    axios.get(`${API_URL}reviews/`, { params: { product_id }, headers: { Authorization: API_KEY } })
      .catch((err) => {
        console.log('error fetching reviews', err);
      })
  );

  useEffect(() => {
    fetchReviewsById(id)
      .then(({ data }) => {
        setReviews(data);
      });
  }, []);

  return (
    <div className="reviews-list">
      {reviews.results.map((review, index) => <ReviewTile key={index} review={review} />)}
    </div>
  );
}
