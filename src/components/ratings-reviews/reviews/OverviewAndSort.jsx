import React, { useState } from 'react';
import { useSort } from '../context/RatingsAndReviewsContext';

export default function OverviewAndSort() {
  const sortState = useSort();
  console.log(sortState);

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <div>
      <span>246 reviews </span>
      <select value={sort} onChange={handleSortChange}>
        <option value="Sort By">Sort By</option>
        <option value="Newest">Newest</option>
        <option value="Helpful">Helpful</option>
        <option value="Highest Rating">Highest Rating</option>
        <option value="Lowest Rating">Lowest Rating</option>
      </select>
    </div>
  );
}
