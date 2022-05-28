import React, { useState } from 'react';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { StyledRatingStars } from '../../../../styled-lib';
import { useRAndRContext } from '../../../../context/RAndRContext';

function HighlightText({ text, highlight, summary = false }) {
  if (highlight === '' || highlight === null) {
    return (
      <span style={summary ? {fontWeight: 'bold'} : {}}>{text}</span>
    );
  }
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  console.log('parts:', parts);
  return (
    <span style={summary ? {fontWeight: 'bold'} : {}}>
      {parts.filter((part) => part).map((part, index) => {
        console.log('part:', part, 'highlight:', highlight);
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
    axios.put(`/reviews/${review.review_id}/helpful`)
      .then(() => {
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
    // PUT /reviews/:review_id/report
    axios.put(`/reviews/${review.review_id}/report`)
      .then(() => {
        setReviewFeedback({
          helpful: reviewFeedback.helpful,
          reported: [...reviewFeedback.reported, review.review_id],
        });
      })
      .catch((err) => {
        console.log('Error trying to report review:', err);
      });
  }

  function whichButton(name) {
    if (name === 'helpful') {
      return reviewFeedback.helpful.includes(review.review_id)
        ? <button className="feedback-helpful" type="button"> 👍 </button>
        : <button className="link-button" type="button" onClick={handleHelpfulClick}> Yes </button>;
    }
    if (name === 'report') {
      return reviewFeedback.reported.includes(review.review_id)
        ? <button className="feedback-report" type="button">Thank you for your feedback</button>
        : <button className="link-button" type="button" onClick={handleReportClick}>Report</button>;
    }
    return <div />;
  }

  return (
    <>
      <div className="review-tile" hidden={hidden}>
        <StyledRatingStars className="review-tile-rating" rating={review.rating}>★★★★★</StyledRatingStars>
        <div>{format(parseISO(review.date), 'MMM dd, yyyy')}</div>
        <HighlightText summary text={review.summary} highlight={search} />
        {readMore && (
          <div>
            <HighlightText text={review.body.slice(0, 247)} highlight={search} />
            <span>...</span>
          </div>
        )}
        {!readMore && <HighlightText text={review.body} highlight={search} />}
        <div>
          {showPhotos()}
        </div>
        {review.recommend && <div>I recommend this product ✔️</div>}
        <HighlightText text={review.reviewer_name} highlight={search} />
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
          {readMore && <button type="button" className="reviews-readmore" onClick={handleReadMoreClick}>Read more</button>}
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


