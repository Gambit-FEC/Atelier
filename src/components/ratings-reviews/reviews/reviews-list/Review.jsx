import React, { useState } from 'react';

export default function Review({ review }) {
  const [readMore, setReadMore] = useState(false);
  function handleReadMoreClick() {
    setReadMore(!readMore);
  }

  return (
    <div>
      <div>{review.rating}</div>
      <div>{review.summary}</div>
      <button type="button" onClick={handleReadMoreClick}>Read more</button>
    </div>
  );
}
