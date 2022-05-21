import React from 'react';

export default function relatedCard(info) {
  return (
    <div className="related-items-card">
      <p className="card-category">
        { info.category }
      </p>
      <p className="card-name">
        { info.name }
      </p>
      <p className="card-cost">
        { info.default_price }
      </p>
    </div>
  );
}
