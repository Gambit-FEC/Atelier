import React from 'react';
import { RatingBar } from '../../../styled-lib';
import OverallRating from './OverallRating';
import RatingBreakdown from './RatingBreakdown';
import ProductBreakdown from './ProductBreakdown';

export default function Ratings() {
  return (
    <div className="ratings">
      <OverallRating />
      <RatingBreakdown />
      <ProductBreakdown />
    </div>
  );
}
