import React from 'react';
import OverviewAndSort from './OverviewAndSort';
import ReviewsList from './reviews-list/ReviewsList';
import MoreAndAddReview from './MoreAndAdd';

export default function Reviews() {
  return (
    <div>
      <OverviewAndSort />
      <ReviewsList />
      <MoreAndAddReview />
    </div>
  );
}
