import React, { useState } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { StyledRatingStars } from '../../../../styled-lib';
import { useRAndRContext } from '../../../../context/RAndRContext';

function HighlightText({ text, highlight, bold = false }) {
  if (highlight === '' || highlight === null) {
    return (
      <span style={bold ? { fontWeight: 'bold' } : {}}>{text}</span>
    );
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <span style={bold ? { fontWeight: 'bold' } : {}}>
      {parts.filter((part) => part).map((part, index) => {
        if (part.toLowerCase() === highlight.toLowerCase()) {
          return <mark key={index}>{part}</mark>;
        }
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}
export default function ReviewTile({ review, hidden, search }) {
  const [readMore, setReadMore] = useState(review.body.length > 250);
  const [showModal, setShowModal] = useState({ show: false, src: '' });
  const { reviewFeedback, setReviewFeedback } = useRAndRContext();
  function handleReadMoreClick() {
    setReadMore(!readMore);
  }
  function handlePhotoClick(event) {
    showModal.show ? (
      document.body.style.overflowX = 'hidden',
      document.body.style.overflowY = 'auto'
    ) : document.body.style.overflow = 'hidden';
    setShowModal({ show: !showModal.show, src: event.target.src });
  }
  function showPhotos() {
    return review.photos.map((item) => <img style={{ cursor: 'pointer', height: '100px' }} loading="lazy" key={item.id} src={item.url} alt={`review-${item.id}`} onClick={handlePhotoClick} />);
  }
  function handleHelpfulClick(e) {
    e.target.classList.add('clicked-link-button');
    e.target.removeAttribute('onClick');
    axios.put(`/reviews/${review.review_id}/helpful`)
      .then(() => {
        review.helpfulness++;
        setReviewFeedback({
          reported: reviewFeedback.reported,
          helpful: [...reviewFeedback.helpful, review.review_id],
        });
      })
      .catch((err) => {
        console.log('Error trying to mark review as helpful:', err);
      });
  }
  function handleReportClick(e) {
    e.target.classList.add('clicked-link-button');
    setReviewFeedback({
      helpful: reviewFeedback.helpful,
      reported: [...reviewFeedback.reported, review.review_id],
    });
    axios.put(`/reviews/${review.review_id}/report`)
      .then(() => {
        setReviewFeedback({
          helpful: reviewFeedback.helpful,
          reported: [...reviewFeedback.reported, review.review_id],
        });
      })
      .catch((err) => console.log('Error trying to report review:', err));
  }
  function whichButton(name) {
    if (name === 'helpful') {
      return reviewFeedback.helpful.includes(review.review_id)
        ? <button className="feedback-helpful" type="button" style={{ userSelect: 'none' }}> 👍 </button>
        : <button className="underline-button grey-button" type="button" onClick={handleHelpfulClick}> Yes </button>;
    }
    if (name === 'report') {
      return reviewFeedback.reported.includes(review.review_id)
        ? <button className="feedback-report" type="button">Thank you for your feedback</button>
        : <button className="underline-button grey-button" type="button" onClick={handleReportClick}>Report</button>;
    }
    return <div />;
  }
  return (
    <>
      <div id={`review-${review.review_id}`} className="review-tile" hidden={hidden}>
        <div className="review-tile-top-bar">
          <StyledRatingStars className="review-tile-rating" rating={review.rating}>★★★★★</StyledRatingStars>
          <div>
            <HighlightText bold text={review.reviewer_name} highlight={search} className="review-tile-reviewer" />
            <span> | </span>
            <span className="review-tile-date">{format(parseISO(review.date), 'MMM dd, yyyy')}</span>
          </div>
        </div>
        <HighlightText bold text={review.summary} highlight={search} />
        {readMore && (
          <div>
            <HighlightText text={review.body.slice(0, 247)} highlight={search} />
            <span>...</span>
          </div>
        )}
        {!readMore && <HighlightText text={review.body} highlight={search} />}
        <div className="review-tile-photos">
          {showPhotos()}
        </div>
        {review.recommend && <div>I recommend this product ✔️</div>}
        {review.response && (
          <div>
            <span>Response from seller: </span>
            <HighlightText style={{ fontStyle: 'italic' }} text={review.response} highlight={search} />
          </div>
        )}
        <div className="helpful-report-readmore">
          <div>
            <span>Was this review helpful? </span>
            {whichButton('helpful')}
            <span>{` ( ${review.helpfulness} ) `}</span>
          </div>
          {!readMore && whichButton('report')}
          {readMore && <button type="button" className="reviews-readmore underline-button grey-button larger-text" onClick={handleReadMoreClick}>Read more</button>}
        </div>
      </div>
      {showModal.show && (
        <div className="modal-bg" onClick={handlePhotoClick}>
          <div className="modal-image">
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
