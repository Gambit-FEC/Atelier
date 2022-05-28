import React from 'react';
import OverviewAndSort from './OverviewAndSort';
import ReviewsList from './reviews-list/ReviewsList';
import MoreAndAddReview from './MoreAndAdd';
import ReviewSearch from './ReviewSearch';

export default function Reviews() {
  return (
    <div className="reviews">
      <OverviewAndSort />
      <ReviewSearch />
      <ReviewsList />
      <MoreAndAddReview />
    </div>
  );
}
