import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { StyledRatingStars } from '../../../../styled-lib';

export default function ReviewTile({ review }) {
  const [readMore, setReadMore] = useState(review.body.length > 250);
  const [showModal, setShowModal] = useState({ show: false, src: '' });
  function handleReadMoreClick() {
    setReadMore(!readMore);
  }
  function handlePhotoClick(event) {
    showModal.show ? document.body.style.overflow = 'auto' : document.body.style.overflow = 'hidden';
    setShowModal({ show: !showModal.show, src: event.target.src });
  }
  function showPhotos() {
    return review.photos.map((item) => <img style={{ cursor: 'pointer', height: '100px' }} key={item.id} src={item.url} alt={`review-${item.id}`} onClick={handlePhotoClick} />);
  }
  function handleHelpfulClick(e) {
    e.target.classList.add('clicked-link-button');
    e.target.removeAttribute('onClick');
    // PUT /reviews/:review_id/helpful
    console.log(e.target);
  }
  function handleReportClick(e) {
    e.target.classList.add('clicked-link-button');
    // PUT /reviews/:review_id/report
    console.log(e.target);
  }

  return (
    <>
      <div className="reviews-tile">
        <StyledRatingStars rating={review.rating} >★★★★★</StyledRatingStars>
        <div>{format(parseISO(review.date), 'MMM dd, yyyy')}</div>
        <div style={{ fontWeight: 'bold' }}>{review.summary}</div>
        {readMore && <p>{`${review.body.slice(0, 247)}...`}</p>}
        {!readMore && <p>{review.body}</p>}
        {readMore && <button type="button" onClick={handleReadMoreClick}>Read more</button>}
        {showPhotos()}
        {review.recommend && <div>I recommend this product ✔️</div>}
        <div>{review.reviewer_name}</div>
        {review.response && <div style={{ fontStyle: 'italic' }}>{`Response from seller: ${review.response}`}</div>}
        <div>
          <span>Was this review helpful? </span>
          <button className="link-button" type="button" onClick={handleHelpfulClick}> Yes </button>
          <span>{` ( ${review.helpfulness} ) `}</span>
          <span> | </span>
          <button className="link-button" type="button" onClick={handleReportClick}>Report</button>
        </div>

      </div>
      {showModal.show && (
        <div className="modal-bg" onClick={handlePhotoClick}>
          <div className="modal-image" onClick={(e) => e.stopPropagation()}>
            <img
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              src={showModal.src}

            />
          </div>
        </div>
      )}
    </>
  );
}
