import React, { useState } from 'react';
import { useRAndRContext } from '../../../context/RAndRContext';

export default function WriteReview() {
  const { setShowWriteReview } = useRAndRContext();
  const [formData, setFormData] = useState({
    overallRating: 0,
    recommend: false,
    characteristics: {},
    summary: '', // optional
    body: '',
    photos: [], // optional
    username: '',
    email: '',
  });
  function handleExitView() {
    document.body.style.overflow = 'auto';
    setShowWriteReview(false);
  }
  function handleSubmitReview() {
    console.log(formData);
  }
  function updateFormData(e) {
    console.log(e.target.value);
    const newData = { ...formData };
    newData[e.target.id] = e.target.value;
    setFormData(newData);
  }
  function handleStarClick(e) {
    if (formData.overallRating === e.target.id) {
      setFormData({ ...formData, overallRating: 0 });
    } else {
      setFormData({ ...formData, overallRating: e.target.id });
    }
  }
  function handleCheckBox() {
    setFormData({ ...formData, recommend: !formData.recommend });
  }
  function starRender() {
    const spans = [];
    for (let i = 0; i < 5; i++) {
      if (i < formData.overallRating) {
        spans.push(<span key={i} id={i + 1} style={{ cursor: 'pointer' }} onClick={handleStarClick}>★</span>);
      } else {
        spans.push(<span key={i} id={i + 1} style={{ cursor: 'pointer' }} onClick={handleStarClick}>☆</span>);
      }
    }
    return (
      <div>
        {spans}
      </div>
    );
  }

  return (
    <div className="write-review modal-bg">
      <form className="modal-form" onSubmit={handleSubmitReview}>
        <div className="modal-exit-button" onClick={handleExitView}>[X]</div>
        <h3 style={{ textAlign: 'center' }}>Write A Review</h3>
        <label>Overall Rating:</label>
        {starRender()}
        <label>Do you recommend this product?</label>
        <input id="recommend" type="checkbox" defaultChecked={formData.recommend} onChange={handleCheckBox} />
        <label>Characteristics:</label>
        <textarea id="characteristics" />
        <label>Summary:</label>
        <textarea id="summary" />
        <label>Body:</label>
        <textarea id="body" />
        <label>Photos:</label>
        <textarea id="photos" />
        <label>Username:</label>
        <textarea id="username" />
        <label>Email:</label>
        <textarea id="email" />
        <input type="submit" value="Submit Review" />
      </form>
    </div>
  );
}
