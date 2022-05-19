import React, { useState } from 'react';

export default function OverviewAndSort() {
  const [sortOption, setSortOption] = useState(() => 'Sort');
  return (
    <div>
      <label>
        246 reviews sorted by:
        <select defaultValue={sortOption}>
          <option value="Relevant">Newest</option>
          <option value="Helpful">Helpful</option>
          <option value="Highest Rating">Highest Rating</option>
          <option value="Lowest Rating">Lowest Rating</option>
        </select>
      </label>
    </div>
  );
}
