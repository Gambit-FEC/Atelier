import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';

export default function ReviewTile({ review }) {
  const [readMore, setReadMore] = useState(() => false);
  function handleReadMoreClick() {
    setReadMore(!readMore);
  }
  console.log(review);
  function showPhotos() {
    return review.photos.map((item) => <img key={item.id} src={item.url} alt={`review-${item.id}`} />);
  }
  return (
    <div className="reviews-tile">
      <div>
        {review.rating}
        ⭐
      </div>
      <div>{format(parseISO(review.date), 'MMM dd, yyyy')}</div>
      {!readMore && <div style={{ fontWeight: 'bold' }}>{review.summary}</div>}
      {readMore && <p>{review.body}</p>}
      {readMore && (
        <>
          {showPhotos()}
        </>
      )}
      {!readMore && <button type="button" onClick={handleReadMoreClick}>Read more</button>}
    </div>
  );
}
