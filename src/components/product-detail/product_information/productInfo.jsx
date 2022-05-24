import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useGlobalContext } from '../../../context/GlobalStore';
import OverAllRating from '../../ratings-reviews/ratings/OverallRating';

// Stars and Reviews
// const Stars = () => {
//   const totalStars = 5;
//   const activeStars = 3;
//   const filledStars = '&#9733';
//   const unfilledStars = '&#9734';
//   [...new Array(totalStars)].map((arr, index) => {
//     return index < activeStars ? <filledStars /> : <unfilledStars />;
//   })
// }

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

const totalReviews = (event) => {
  axios.get(`/reviews/averageRating/${40344}`)
  // axios.get(`/reviews/averageRating/${productId}`)
    .then((results) => {
      console.log('total reviews results??', results.data.totalReviews);
      return results.data.totalReviews;
    })
    .catch((err) => { console.log('onclickreviews error', err); });
};

export default function ProductInfo() {
  const { productId } = useGlobalContext();
  const [productInfo, setProductInfo] = useState([]);
  const [allReviews, setAllReviews] = useState([]);

  const totalStars = 5;
  // const totalFilled = avgRating;
  // console.log('cant call the fxn totalFilled', totalFilled);
  const reviewAmount = 10;

  // Reviews and stars---------------------------------
  // const reviewsLine = event.currentTarget;
  //   console.log('reviews click works?', reviewsLine);
  //   // need to send client to the reviews section
  //   axios.get(`/reviews/averageRating/${productId}`)
  //   // axios.get(`/reviews/averageRating/${productId}`)
  //     .then((results) => {
  //       console.log('results??', results.data);
  //       setAllReviews(results.data);
  //     })
  //     .catch((err) => { console.log('onclickreviews error', err); });

  const onClickReviews = (event) => {

  };

  // Grabs item data from server-------------------------
  useEffect(() => {
    console.log('useEffect working?');
    // getProduct();
    axios.get(`/products/${productId}`)
      .then((result) => {
        console.log('does getProduct work???', result.data);
        setProductInfo(result.data);
        // console.log('productinfo?', productInfo);
        // if (productInfo[2][2].original_price)
      })
      .catch((err) => { console.log('getproduct didnt work', err); });
  }, [productId]);
  // console.log('outside prodInfo', productInfo);
  // const [overview, styles] = productInfo;
  // console.log('overview', overview);
  // console.log('styles', styles);



  return (
    <>
      <h1>
        product info?
        {' '}
        {productId}
      </h1>
      <div id="star-rating">
        {/* {[...Array(totalStars).keys()].map((key) => (
          <span key={key} isFilled={key < totalFilled} />
        ))} */}
        {[...Array(totalStars)].map((star) => (
          <span id="star">&#9733;</span>
        ))}
      </div>
      <a href="#ratings-and-reviews" id="see-reviews">
        Read all
        {' '}
        {reviewAmount}
        {' '}
        reviews
      </a>
      <div id="product-category">{productInfo[0] ? productInfo[0].category : null}</div>
      <p id="product-name">{productInfo[0] ? productInfo[0].name : null}</p>
      {/* <p id="price">{productInfo[1] ? productInfo[1].results[0].sale_price : productInfo[1].results[0].original_price}</p> */}
      <p id="product-description">{productInfo[0] ? productInfo[0].description : null}</p>
      <div id="social-media">
        <p>Share this item!</p>
        <button src="/logoPhotos/facebook.png" onClick={() => onFacebookClick()}>FB</button>
        <button src="/logoPhotos/twitter.png" onClick={() => onTwitterClick()}>Twitter</button>
        <button src="/logoPhotos/pinterest.png" onClick={() => onPinterestClick()}>Pin</button>
      </div>

    </>
  );
}
