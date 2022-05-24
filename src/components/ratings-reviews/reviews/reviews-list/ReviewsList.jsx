import React, { useContext } from 'react';
import ReviewTile from './ReviewTile';
import { RatingsAndReviewsContext } from '../../RatingsAndReviews';

export default function ReviewsList() {
  const { reviews, reviewsFilter } = useContext(RatingsAndReviewsContext);
  console.log('filter:', reviewsFilter);
  console.log('reviews', reviews)
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
