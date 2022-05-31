import React, { useState } from 'react';
import axios from 'axios';
import { useRAndRContext } from '../../../context/RAndRContext';
import { useGlobalContext } from '../../../context/GlobalStore';

export default function WriteReview() {
  const { productId } = useGlobalContext();
  const { setShowWriteReview, reviewsMeta, characteristicsMeaning } = useRAndRContext();
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

  function handleExitView() {
    document.body.style.overflow = 'auto';
    setShowWriteReview(false);
  }

  function cloudPhotoUpload(file) {
    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append('api_key', '939183845857327');
    imageData.append('upload_preset', 'ml_default');
    return axios.post('https://api.cloudinary.com/v1_1/gilcohen67/image/upload', imageData);
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
    const photoPromiseArray = [];
    for (let i = 0; i < formSubmission.photos.length; i++) {
      photoPromiseArray.push(cloudPhotoUpload(formSubmission.photos[i]));
    }
    return Promise.all(photoPromiseArray)
      .then((result) => {
        formSubmission.photos = [];
        result.forEach((item, index) => {
          formSubmission.photos[index] = item.data.url;
        });
        return axios.post('/reviews', formSubmission);
      })
      .catch((err) => {
        console.log('promise all error:', err);
      });
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
        window.alert('There was an issue submitting your review.', err);
      });
  }

  function updateFormData(e) {
    const newData = { ...formData };
    newData[e.target.id] = e.target.value;
    setFormData(newData);
  }

  function handleRecommended(e) {
    if (e.target.value === 'yes') {
      setFormData({ ...formData, recommend: true });
    } else if (e.target.value === 'no') {
      setFormData({ ...formData, recommend: false });
    }
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

  function handleStarMouseEnter(e) {
    if (e.target.id === 'star-buttons') {
      return;
    }
    for (let i = 0; i < parseInt(e.target.id, 10); i++) {
      e.target.parentNode.children[i].value = '★';
    }
  }

  function handleStarMouseLeave(e) {
    if (e.target.id === 'star-buttons') {
      return;
    }
    for (let i = 0; i < parseInt(e.target.id, 10); i++) {
      e.target.parentNode.children[i].value = '☆';
    }
  }

  function handleStarClick(e) {
    if (formData.rating === e.target.id) {
      setFormData({ ...formData, rating: '0' });
    } else {
      setFormData({ ...formData, rating: e.target.id });
    }
  }

  function starRender() {
    const spans = [];
    if (formData.rating === '0') {
      for (let i = 0; i < 5; i++) {
        spans.push(<input type="button" key={i} id={i + 1} value="☆" style={{ fontSize: 'x-large', cursor: 'pointer', padding: '0px', border: 'none', backgroundColor: 'transparent' }} onClick={handleStarClick} onMouseEnter={handleStarMouseEnter} onMouseLeave={handleStarMouseLeave} required />);
      }
      return (
        <div id="star-buttons">
          {spans}
        </div>
      );
    }
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

  function handleCharactericsMouseEnter(e) {
    if (formData.characteristics[e.target.name].value !== '0') {
      return;
    }
    const popup = document.createElement('div');
    popup.innerText = characteristicsMeaning[e.target.name][e.target.value - 1];
    popup.setAttribute('style', 'margin-right: auto;');
    e.target.parentNode.parentNode.insertBefore(popup, e.target.parentNode);
  }

  function handleCharactericsMouseLeave(e) {
    if (e.target.parentNode.children.length === 2) {
      return;
    }
    if (formData.characteristics[e.target.name].value !== '0') {
      return;
    }
    const popup = e.target.parentNode.parentNode.children[1];
    e.target.parentNode.parentNode.removeChild(popup);
  }

  function handleCharacteristics(e) {
    const newData = { ...formData };
    newData.characteristics[e.target.name].value = e.target.value;
    setFormData(newData);
  }

  function removeHoverChar(e) {
    if (formData.characteristics[e.target.name].value !== '0') {
      return;
    }
    const popup = e.target.parentNode.parentNode.children[1];
    e.target.parentNode.parentNode.removeChild(popup);
  }

  function characteristicsRender() {
    const allRadios = [];
    for (const key in reviewsMeta.characteristics) {
      const radios = [];
      for (let i = 0; i < 5; i++) {
        radios.push(
          <>
            <label key={`${key}-${i}-label`}>{`${i + 1}: `}</label>
            <input key={`${key}-${i}-radio`} type="radio" id={`${key}-${i + 1}`} className="bigger-radio" name={key} value={i + 1} style={i < 4 ? { marginRight: '10px' } : {}} onMouseEnter={handleCharactericsMouseEnter} onMouseLeave={handleCharactericsMouseLeave} required />
          </>,
        );
      }
      allRadios.push(
        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }} onChange={removeHoverChar}>
          <label style={{ width: '85px' }}>{`${key}:`}</label>
          {formData.characteristics[key].value - 1 >= 0
            && (
              <label style={{ marginRight: 'auto' }}>
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
          <span className="required-guide form-italic" style={{ minWidth: 'fit-content' }}>= required</span>
          <h3 style={{ textAlign: 'center', width: '100%', marginRight: '80px' }}>Write A Review</h3>
          <div className="form-exit-button close" onClick={handleExitView}>×</div>
        </div>
        <label id="overall-rating-prompt" className="required">Overall Rating</label>
        {starRender()}
        <label className="required">Do you recommend this product?</label>
        <div onChange={handleRecommended}>
          <label>yes</label>
          <input type="radio" id="yes" className="bigger-radio" name="recommend" value="yes" required />
          <label style={{ marginLeft: '20px' }}>no</label>
          <input type="radio" id="no" className="bigger-radio" name="recommend" value="no" required />
        </div>
        <label className="required">Characteristics</label>
        <div onChange={handleCharacteristics}>
          {characteristicsRender()}
        </div>
        <label>Summary</label>
        <textarea id="summary" placeholder="Example: Best purchase ever!" maxLength="60" onChange={updateFormData} />
        <label className="required">Body</label>
        <textarea id="body" placeholder="Why did you like the product or not?" minLength="50" maxLength="1000" onChange={updateFormData} required />
        <label>Photos (5 max)</label>
        <input id="photos" type="file" accept="image/*" onChange={handlePhotos} multiple />
        <label className="required">Name</label>
        <input type="text" id="name" placeholder="Example: jackson11!" maxLength="60" onChange={updateFormData} required />
        <label className="form-italic">For privacy reasons, do not use your full name or email address</label>
        <label className="required">Email</label>
        <input type="email" id="email" placeholder="Example: jackson11@email.com" maxLength="60" onChange={updateFormData} required />
        <label className="form-italic">For authentication reasons, you will not be emailed</label>
        <input type="submit" className="underline-button larger-text" value="Submit Review" />
      </form>
    </div>
  );
}
