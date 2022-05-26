import React, { useState } from 'react';
import axios from 'axios';
import { useRAndRContext } from '../../../context/RAndRContext';
import { useGlobalContext } from '../../../context/GlobalStore';

export default function WriteReview() {
  const { productId } = useGlobalContext();
  const { setShowWriteReview, reviewsMeta } = useRAndRContext();
  const [formData, setFormData] = useState(() => {
    const data = {
      rating: '0',
      summary: '', // optional
      body: '',
      recommend: undefined,
      name: '',
      email: '',
      photos: [], // optional
      characteristics: {},
    };
    Object.keys(reviewsMeta.characteristics).forEach((item) => {
      data.characteristics[item] = {};
      data.characteristics[item].id = reviewsMeta.characteristics[item].id;
      data.characteristics[item].value = '0';
    });
    return data;
  });
  const characteristicsMeaning = {
    Size: ['A size too small', '½ a size too small', 'Perfect', '½ a size too big', 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  };

  function handleExitView() {
    document.body.style.overflow = 'auto';
    setShowWriteReview(false);
  }

  function handleSubmitReview(e) {
    e.preventDefault();
    if (formData.rating === '0') {
      const popup = document.createElement('div');
      popup.className = 'popup-prompt';
      popup.innerText = '⚠️ Please fill out this field.';
      document.getElementById('star-buttons').append(popup);
      setTimeout(() => { popup.parentNode.removeChild(popup); }, 5000);
      return;
    }
    postForm()
      .then(() => {
        window.alert('Review submitted');
        handleExitView();
      })
      .catch((err) => {
        console.log('Error submitting review:', err);
        window.alert('There was an issue submitting your review.');
      });
  }

  function postForm() {
    const formSubmission = {
      ...formData,
      rating: parseInt(formData.rating, 10),
      characteristics: {},
      product_id: productId,
    };
    const char = formData.characteristics;
    for (const key in char) {
      formSubmission.characteristics[char[key].id] = parseInt(char[key].value, 10);
    }
    formSubmission.photos = formSubmission.photos.map(() => `https://placedog.net/${Math.floor(Math.random() * 999) + 1}`);
    return axios.post('/reviews', formSubmission);
  }

  function updateFormData(e) {
    const newData = { ...formData };
    newData[e.target.id] = e.target.value;
    setFormData(newData);
  }

  function handleStarClick(e) {
    if (formData.rating === e.target.id) {
      setFormData({ ...formData, rating: '0' });
    } else {
      setFormData({ ...formData, rating: e.target.id });
    }
  }

  function handleRecommended(e) {
    if (e.target.value === 'yes') {
      setFormData({ ...formData, recommend: true });
    } else if (e.target.value === 'no') {
      setFormData({ ...formData, recommend: false });
    }
  }

  function handleCharacteristics(e) {
    const newData = { ...formData };
    newData.characteristics[e.target.name].value = e.target.value;
    setFormData(newData);
  }

  function handlePhotos(e) {
    if (e.target.files.length > 5) {
      window.alert('5 photos max!');
      document.getElementById('photos').value = null;
      return;
    }
    const newPhotos = [];
    for (let i = 0; i < e.target.files.length; i++) {
      newPhotos.push(e.target.files[i]);
    }
    setFormData({ ...formData, photos: newPhotos });
  }

  function starRender() {
    const spans = [];
    for (let i = 0; i < 5; i++) {
      if (i < formData.rating) {
        spans.push(<input type="button" key={i} id={i + 1} value="★" style={{ fontSize: 'x-large', cursor: 'pointer', padding: '0px', border: 'none', backgroundColor: 'transparent' }} onClick={handleStarClick} required />);
      } else {
        spans.push(<input type="button" key={i} id={i + 1} value="☆" style={{ fontSize: 'x-large', cursor: 'pointer', padding: '0px', border: 'none', backgroundColor: 'transparent' }} onClick={handleStarClick} required />);
      }
    }
    return (
      <div id="star-buttons">
        {spans}
      </div>
    );
  }

  function characteristicsRender() {
    const allRadios = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const key in reviewsMeta.characteristics) {
      const radios = [];
      for (let i = 0; i < 5; i++) {
        radios.push(
          <>
            <label key={`${key}-${i}-label`}>{`${i + 1}: `}</label>
            <input key={`${key}-${i}-radio`} type="radio" id={`${key}-${i + 1}`} name={key} value={i + 1} style={i < 4 ? { marginRight: '10px' } : {}} required />
          </>,
        );
      }
      allRadios.push(
        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <label>{`${key}:`}</label>
          {formData.characteristics[key].value - 1 >= 0
            && (
              <label>
                {characteristicsMeaning[key][formData.characteristics[key].value - 1]}
              </label>
            )}
          <div>
            {radios}
          </div>
        </div>,
      );
    }
    return allRadios;
  }

  return (
    <div className="write-review modal-bg">
      <form className="modal-form" onSubmit={handleSubmitReview}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <span className="required-guide" style={{ minWidth: 'fit-content' }}>= required</span>
          <h3 style={{ textAlign: 'center', width: '100%', marginRight: '80px' }}>Write A Review</h3>
          <div className="modal-exit-button close" onClick={handleExitView}>×</div>
        </div>
        <label id="overall-rating-prompt" className="required">Overall Rating</label>
        {starRender()}
        <label className="required">Do you recommend this product?</label>
        <div onChange={handleRecommended}>
          <label>yes</label>
          <input type="radio" id="yes" name="recommend" value="yes" required />
          <label>no</label>
          <input type="radio" id="no" name="recommend" value="no" required />
        </div>
        <label className="required">Characteristics</label>
        <div onChange={handleCharacteristics}>
          {characteristicsRender()}
        </div>
        <label>Summary</label>
        <textarea id="summary" placeholder="Example: Best purchase ever!" maxLength="60" onChange={updateFormData} />
        <label className="required">Body</label>
        <textarea id="body" placeholder="Why did you like the product or not?" minLength="50" onChange={updateFormData} required />
        <label>Photos (5 max)</label>
        <input id="photos" type="file" accept="image/*" onChange={handlePhotos} multiple />
        <label className="required">Name</label>
        <input type="text" id="name" onChange={updateFormData} required />
        <label className="required">Email</label>
        <input type="email" id="email" onChange={updateFormData} required />
        <input type="submit" value="Submit Review" />
      </form>
    </div>
  );
}
