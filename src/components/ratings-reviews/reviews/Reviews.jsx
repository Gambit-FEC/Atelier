import React from 'react';
import OverviewAndSort from './OverviewAndSort';
import ReviewsList from './reviews-list/ReviewsList';
import MoreAndAddReview from './MoreAndAdd';

export default function Reviews() {
  return (
    <div className="reviews-list">
      <OverviewAndSort />
      <ReviewsList />
      <MoreAndAddReview />
    </div>
  );
}
