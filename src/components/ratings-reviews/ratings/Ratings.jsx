import React from 'react';
import OverallRating from './OverallRating';
import StarBars from './StarBars';
import SpecBars from './SpecBars';

export default function Ratings() {

  return (
    <div className="ratings">
      <OverallRating />
      <StarBars />
      <SpecBars />
    </div>
  );
}
