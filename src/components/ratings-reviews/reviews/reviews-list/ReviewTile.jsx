import React, { useState } from 'react';

export default function ReviewTile({ review }) {
  const [readMore, setReadMore] = useState(false);
  function handleReadMoreClick() {
    setReadMore(!readMore);
  }

  return (
    <div className="review-tile">
      <div>{review.rating}</div>
      <div>{review.summary}</div>
      <button type="button" onClick={handleReadMoreClick}>Read more</button>
    </div>
  );
}
