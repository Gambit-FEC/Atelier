import React, { useContext } from 'react';
import { RatingsAndReviewsContext } from '../RatingsAndReviews';

export default function MoreAndAddReview() {
  const { reviewsShown, setReviewsShown, showAdd } = useContext(RatingsAndReviewsContext);
  const handleMoreClick = () => {
    setReviewsShown(() => reviewsShown + 2);
  };
  return (
    <div className="reviews-more-add">
      {showAdd && <button type="button" onClick={handleMoreClick}>Show more</button>}
      <button type="button">Write a Review</button>
    </div>
  );
}
