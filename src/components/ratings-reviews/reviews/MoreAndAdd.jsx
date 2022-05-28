import React, { useEffect } from 'react';
import { useRAndRContext } from '../../../context/RAndRContext';

export default function MoreAndAddReview() {
  const {
    count,
    setCount,
    showAdd,
    setShowWriteReview,
    showCollapse,
    shownReviews,
  } = useRAndRContext();
  const handleMoreClick = () => {
    setCount(count + 2);
  };
  const handleAddClick = () => {
    document.body.style.overflow = 'hidden';
    setShowWriteReview(true);
  };
  const handleCollapse = () => {
    setCount(2);
  };

  useEffect(() => {
    if (count !== 2) {
      const lastReview = document.getElementById(`review-${shownReviews[count - 1].key}`);
      lastReview.scrollIntoView();
    }
  }, [count]);

  return (
    <div className="reviews-more-add">
      {showAdd && <button type="button" onClick={handleMoreClick}>Show more</button>}
      <button type="button" onClick={handleAddClick}>Write a Review</button>
      {showCollapse && <button type="button" onClick={handleCollapse}>Collapse List</button>}
    </div>
  );
}
