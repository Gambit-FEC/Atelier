import React from 'react';
import { useRAndRContext } from '../../../context/RAndRContext';

export default function MoreAndAddReview() {
  const { page, setPage, showAdd, setShowWriteReview } = useRAndRContext();
  const handleMoreClick = () => {
    setPage(page + 1);
  };
  const handleAddClick = () => {
    setShowWriteReview(true);
  }
  return (
    <div className="reviews-more-add">
      {showAdd && <button type="button" onClick={handleMoreClick}>Show more</button>}
      <button type="button" onClick={handleAddClick}>Write a Review</button>
    </div>
  );
}
