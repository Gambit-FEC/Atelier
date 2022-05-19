import React from 'react';
import Review from './Review';
import { useId } from '../../../../context/GlobalStore';
import { useSort, useFilter, useStar } from '../../context/RatingsAndReviewsContext';

export default function ReviewsList() {
  return (
    <>
      <div></div>
      <Review />
    </>
  );
}
