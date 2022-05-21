import React, { useContext } from 'react';
import { RatingsAndReviewsContext } from '../RatingsAndReviews';

export default function MoreAndAddReview() {
  const { reviewsCount, setReviewsCount } = useContext(RatingsAndReviewsContext);
  const handleMoreClick = () => {
    setReviewsCount(() => reviewsCount + 2);
  };
  return (
    <div className="reviews-more-add">
      <button type="button" onClick={handleMoreClick}>Show more</button>
      <button type="button">Write a Review</button>
    </div>
  );
}
