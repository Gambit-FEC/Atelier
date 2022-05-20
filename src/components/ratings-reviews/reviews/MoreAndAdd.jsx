import React from 'react';

export default function MoreAndAddReview({ handleMoreClick }) {
  return (
    <div className="reviews-more-add">
      <button type="button" onClick={handleMoreClick}>Show more</button>
      <button type="button">Write a Review</button>
    </div>
  );
}
