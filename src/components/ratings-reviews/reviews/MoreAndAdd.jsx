import React, { useEffect } from 'react';
import { useRAndRContext } from '../../../context/RAndRContext';

export default function MoreAndAddReview() {
  const {
    reviews,
    page,
    setPage,
    showAdd,
    setShowAdd,
    setShowWriteReview,
  } = useRAndRContext();
  const handleMoreClick = () => {
    setPage(page + 1);
  };
  const handleAddClick = () => {
    document.body.style.overflow = 'hidden';
    setShowWriteReview(true);
  };
  useEffect(() => {
    setShowAdd((page * 2 < reviews.length));
  }, [page, reviews]);

  return (
    <div className="reviews-more-add">
      {showAdd && <button type="button" onClick={handleMoreClick}>Show more</button>}
      <button type="button" onClick={handleAddClick}>Write a Review</button>
    </div>
  );
}
