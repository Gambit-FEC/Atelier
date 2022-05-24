import React from 'react';

export default function relatedCard(info) {
  // console.log(info);
  return (
    <div className="related-items-card">
      <p className="card-category">
        { info.info.category }
      </p>
      <p className="card-name">
        { info.info.name }
      </p>
      <p className="card-cost">
        { info.info.default_price }
      </p>
    </div>
  );
}
