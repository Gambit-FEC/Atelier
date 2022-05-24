import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/GlobalStore';

// Share on social media------------------------------
const onFacebookClick = () => {
  window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fparse.com', 'Facebook');
};

const onTwitterClick = () => {
  window.open('https://twitter.com/intent/tweet', 'Twitter');
};

const onPinterestClick = () => {
  window.open('https://www.pinterest.com/pin-builder/', 'Pinterest');
};

export default function ProductInfo() {
  const { productId } = useGlobalContext();
  const [productInfo, setProductInfo] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [avgReviews, setAvgReviews] = useState([]);


  const totalStars = 5;
  // const totalFilled = avgRating;
  // console.log('cant call the fxn totalFilled', totalFilled);
  const reviewAmount = avgReviews;
  console.log('review amount??', reviewAmount / 5 * 100);

  // Reviews and stars---------------------------------
  useEffect(() => {
    // const reviewsLine = event.currentTarget;
    console.log('reviews click works?');
    // need to send client to the reviews section
    axios.get(`/reviews/meta/${productId}`)
    // axios.get(`/reviews/averageRating/${productId}`)
      .then((results) => {
        console.log('results??', results.data.totalRatings);
        setAllReviews(results.data.totalRatings);
        setAvgReviews(results.data.averageRating);
      })
      .catch((err) => { console.log('onclickreviews error', err); });
  }, [productId]);

  // Grabs item data from server-------------------------
  useEffect(() => {
    console.log('useEffect working?');
    // getProduct();
    axios.get(`/products/${productId}`)
      .then((result) => {
        console.log('does getProduct work???', result.data);
        // console.log('productinfo?', productInfo);
        setProductInfo(result.data);
      })
      .catch((err) => { console.log('getproduct didnt work', err); });
  }, [productId]);

  return (
    <>
      <h1>
        product info?
        {' '}
        {productId}
      </h1>
      <div>
        <Stars average={Math.floor(reviewAmount * 2) / 2}>☆☆☆☆☆</Stars>
        {/* <Stars average={Math.floor(reviewAmount * 2) / 2}>★★★★★</Stars> */}
        <a href="#ratings-and-reviews" id="see-reviews">
          Read all
          {' '}
          {allReviews || 'no ratings'}
          {' '}
          reviews
        </a>
        <div id="product-category">{productInfo[0] ? productInfo[0].category : null}</div>
        <p id="product-name">{productInfo[0] ? productInfo[0].name : null}</p>
        <p id="price">{productInfo[1] ? productInfo[1].results[0].original_price : null}</p>
        <p id="price">{productInfo[1] ? productInfo[1].results[0].sale_price : null}</p>

        <div id="social-media">
          <p>Share this item!</p>
          <button src="/logoPhotos/facebook.png" onClick={() => onFacebookClick()}>FB</button>
          <button src="/logoPhotos/twitter.png" onClick={() => onTwitterClick()}>Twitter</button>
          <button src="/logoPhotos/pinterest.png" onClick={() => onPinterestClick()}>Pin</button>
        </div>
      </div>

    </>
  );
}

// CSS styled-components ----------------------
const Stars = styled.div`
    background: linear-gradient(90deg, #FDCC0D 0 ${(totalStars) => totalStars.average / 5 * 100}%, grey ${(reviewAmount) => reviewAmount.average / 5 * 100}% 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  `;
