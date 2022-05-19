import React, { useState } from 'react';

export default function OverviewAndSort() {

  return (
    <div>
      <span>246 reviews </span>
      <select>
        <option value="Sort By">Sort By</option>
        <option value="Newest">Newest</option>
        <option value="Helpful">Helpful</option>
        <option value="Highest Rating">Highest Rating</option>
        <option value="Lowest Rating">Lowest Rating</option>
      </select>
    </div>
  );
}
