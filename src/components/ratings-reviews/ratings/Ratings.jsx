import React from 'react';
import { RatingBar } from '../../../styled-lib';
import OverallRating from './OverallRating';
import RatingBreakdown from './RatingBreakdown';
import SpecBars from './SpecBars';

export default function Ratings() {
  return (
    <div className="ratings">
      <OverallRating />
      <RatingBreakdown />
      <SpecBars />
    </div>
  );
}
