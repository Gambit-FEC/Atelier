import React, { useEffect, useState } from 'react';
import ReviewTile from './ReviewTile';
import { useRAndRContext } from '../../../../context/RAndRContext';

export default function ReviewsList() {
  const { reviews, reviewsFilter, page } = useRAndRContext();
  const [shownReviews, setShownReviews] = useState(() => [<div />]);

  useEffect(() => {
    setShownReviews(
      reviews.filter((review, idx) => (Object.values(reviewsFilter).every((item) => item === false)
        || reviewsFilter[review.rating]) && idx < page * 2)
        .map((review) => <ReviewTile key={review.review_id} review={review} />),
    );
  }, [reviews, page, reviewsFilter]);

  return (
    <div className="reviews-list">
      {shownReviews}
    </div>
  );
}
