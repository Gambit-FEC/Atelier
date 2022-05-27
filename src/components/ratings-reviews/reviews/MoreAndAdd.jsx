import React, { useEffect } from 'react';
import { useRAndRContext } from '../../../context/RAndRContext';

export default function MoreAndAddReview() {
  const {
    reviews,
    count,
    setCount,
    showAdd,
    setShowAdd,
    setShowWriteReview,
  } = useRAndRContext();
  const handleMoreClick = () => {
    setCount(count + 2);
  };
  const handleAddClick = () => {
    document.body.style.overflow = 'hidden';
    setShowWriteReview(true);
  };
  useEffect(() => {
    setShowAdd((count < reviews.length));
  }, [count, reviews]);

  return (
    <div className="reviews-more-add">
      {showAdd && <button type="button" onClick={handleMoreClick}>Show more</button>}
      <button type="button" onClick={handleAddClick}>Write a Review</button>
    </div>
  );
}
