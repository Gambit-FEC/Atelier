import React, { useState } from 'react';

export default function ReviewTile({ review }) {
  const [readMore, setReadMore] = useState(false);
  function handleReadMoreClick() {
    setReadMore(!readMore);
  }

  return (
    <div className="reviews-tile">
      <div>{review.rating}</div>
      <div>{review.date}</div>
      {!readMore && <div>{review.summary}</div>}
      {readMore && <div>{review.body}</div>}
      {!readMore && <button type="button" onClick={handleReadMoreClick}>Read more</button>}
    </div>
  );
}
