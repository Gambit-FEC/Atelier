import React from 'react';
import { useRAndRContext } from '../../../context/RAndRContext';

export default function MoreAndAddReview() {
  const { page, setPage, showAdd } = useRAndRContext();
  const handleMoreClick = () => {
    setPage(page + 1);
  };
  return (
    <div className="reviews-more-add">
      {showAdd && <button type="button" onClick={handleMoreClick}>Show more</button>}
      <button type="button">Write a Review</button>
    </div>
  );
}
