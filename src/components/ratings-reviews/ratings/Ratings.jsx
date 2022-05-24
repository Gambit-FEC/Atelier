import React from 'react';
import OverAllRating from './OverallRating';
import StarBars from './StarBars';
import SpecBars from './SpecBars';

export default function Ratings() {

  return (
    <div className="ratings">
      <OverAllRating />
      <StarBars />
      <SpecBars />
    </div>
  );
}
