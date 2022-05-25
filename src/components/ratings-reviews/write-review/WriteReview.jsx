import React, { useState } from 'react';
import { useRAndRContext } from '../../../context/RAndRContext';

export default function WriteReview() {
  const { setShowWriteReview } = useRAndRContext();
  const [formData, setFormData] = useState({
    overallRating: '',
    recommend: '',
    characteristics: {},
    summary: '', // optional
    body: '',
    photos: [], // optional
    username: '',
    email: '',
  });
  function handleExitView() {
    setShowWriteReview(false);
  }
  function handleSubmitReview(e) {
    for (let i = 0; i < e.target.length - 1; i++) {
      console.log(e.target[i].value);
    }
  }
  function updateFormData(e) {
    const newData = { ...formData };
    newData[e.target.id] = e.target.value;
    setFormData(newData);
  }
  return (
    <div className="write-review modal-bg">
      <form className="modal-form" onSubmit={handleSubmitReview}>
        <div className="modal-exit-button" onClick={handleExitView}>[X]</div>
        <h3 style={{ textAlign: 'center' }}>Write A Review</h3>
        <label>Overall Rating:</label>
        <textarea id="overallRating" onChange={updateFormData} />
        <label>Do you recommend this product?</label>
        <textarea id="recommend" />
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
