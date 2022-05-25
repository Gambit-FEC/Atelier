import React from 'react';
import ReviewTile from './ReviewTile';
import { useRAndRContext } from '../../../../context/RAndRContext';

export default function ReviewsList() {
  const { reviews, reviewsFilter } = useRAndRContext();
  return (
    <div className="reviews-list">
      {reviews.map((review, idx) => {
        if (Object.values(reviewsFilter).every((item) => item === false) || reviewsFilter[review.rating]) {
          return <ReviewTile key={idx} review={review} />
        }
      })}
    </div>
  );
}
