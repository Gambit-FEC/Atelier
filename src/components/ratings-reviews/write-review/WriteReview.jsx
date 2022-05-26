import React, { useState } from 'react';
import { useRAndRContext } from '../../../context/RAndRContext';

export default function WriteReview() {
  const { setShowWriteReview, reviewsMeta } = useRAndRContext();
  const [formData, setFormData] = useState(() => {
    const data = {
      overallRating: 0,
      recommend: undefined,
      characteristics: {},
      summary: '', // optional
      body: '',
      photos: [], // optional
      username: '',
      email: '',
    };
    Object.keys(reviewsMeta.characteristics).forEach((item) => {
      data.characteristics[item] = {};
      data.characteristics[item].id = reviewsMeta.characteristics[item].id;
      data.characteristics[item].value = '0';
    });
    console.log('formData', data);
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
  function handleSubmitReview() {
    console.log(formData);
  }
  function updateFormData(e) {
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
  function handleRecommended(e) {
    console.log(e.target.value);
    if (e.target.value === 'yes') {
      setFormData({ ...formData, recommend: true });
    } else if (e.target.value === 'no') {
      setFormData({ ...formData, recommend: false });
    }
  }
  function handleCharacteristics(e) {
    console.log(e.target.name, e.target.value);
    const newData = { ...formData };
    newData.characteristics[e.target.name].value = e.target.value;
    setFormData(newData);
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
  function characteristicsRender() {
    const allRadios = [];
    console.log(reviewsMeta);
    // eslint-disable-next-line no-restricted-syntax
    for (const key in reviewsMeta.characteristics) {
      console.log(key);
      const radios = [];
      for (let i = 0; i < 5; i++) {
        radios.push(
          <>
            <label key={`${key}-${i}-label`}>{`${i + 1}: `}</label>
            <input key={`${key}-${i}-radio`} type="radio" id={`${key}-${i + 1}`} name={key} value={i + 1} style={i < 4 ? { marginRight: '10px' } : {}} />
          </>,
        );
      }
      allRadios.push(
        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <label>{`${key}:`}</label>
          {formData.characteristics[key].value - 1 >= 0
          && <label>{characteristicsMeaning[key][formData.characteristics[key].value - 1]}</label>}
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
          <h3 style={{ textAlign: 'center', width: '100%' }}>Write A Review</h3>
          <div className="modal-exit-button" onClick={handleExitView}>[X]</div>
        </div>
        <label>Overall Rating:</label>
        {starRender()}
        <label>Do you recommend this product?</label>
        <div onChange={handleRecommended}>
          <label>yes</label>
          <input type="radio" id="yes" name="recommend" value="yes" />
          <label>no</label>
          <input type="radio" id="no" name="recommend" value="no" />
        </div>
        <label>Characteristics:</label>
        <div onChange={handleCharacteristics}>
          {characteristicsRender()}
        </div>
        <label>Summary:</label>
        <textarea id="summary" placeholder="optional" onChange={updateFormData} />
        <label>Body:</label>
        <textarea id="body" onChange={updateFormData} />
        <label>Photos:</label>
        <textarea id="photos" />
        <label>Username:</label>
        <input type="text" id="username" onChange={updateFormData} />
        <label>Email:</label>
        <input type="email" id="email" onChange={updateFormData} />
        <input type="submit" value="Submit Review" />
      </form>
    </div>
  );
}
