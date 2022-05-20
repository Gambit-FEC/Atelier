import React from 'react';

export default function relatedCard({ info }) {
  return (
    <div className="related-items-card">
      <div>{info.id}</div>
    </div>
  );
}
