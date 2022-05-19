import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY, API_URL } from '../../../../../config.json';
import Review from './Review';
import { useId } from '../../../../context/GlobalStore';

export default function ReviewsList() {
  const id = useId();
  const [reviews, setReviews] = useState();
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
  console.log(reviews);

  return (
    <>
      {reviews?.results.map((review, index) => <Review key={index} review={review} />)}
    </>
  );
}
