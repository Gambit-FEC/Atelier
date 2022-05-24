import React, { useContext } from 'react';
import ReviewTile from './ReviewTile';
import { RatingsAndReviewsContext } from '../../RatingsAndReviews';

export default function ReviewsList() {
  const { reviews, reviewsFilter } = useContext(RatingsAndReviewsContext);
  console.log('filter:', reviewsFilter)
  return (
    <div className="reviews-list">
      {reviews.map((review, idx) => {
        if (reviewsFilter === '' || review.rating == reviewsFilter) {
          return <ReviewTile key={idx} review={review} />
        }
      })}
    </div>
  );
}
