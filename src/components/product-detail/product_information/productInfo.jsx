import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/GlobalStore';
import StyledRatingStars from '../../../styled-lib';

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
  const { productId, avgRating } = useGlobalContext();
  const [productInfo, setProductInfo] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [avgReviews, setAvgReviews] = useState([]);

  // const reviewAmount = avgReviews;
  // console.log('review amount??', reviewAmount / 5 * 100);

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
    <Wrapper>
      <h1>
        product info?
        {' '}
        {productId}
      </h1>
      <div>
        <StyledRatingStars size="medium" rating={avgRating}>★★★★★</StyledRatingStars>
        <a href="#ratings-and-reviews" id="see-reviews">
          Read all
          {' '}
          {allReviews || 'no ratings'}
          {' '}
          reviews
        </a>
        <Category>{productInfo[0] ? productInfo[0].category : null}</Category>
        <ProductName>{productInfo[0] ? productInfo[0].name : null}</ProductName>
        <Price>{productInfo[1] ? productInfo[1].results[0].original_price : null}</Price>
        <SalePrice>{productInfo[1] ? productInfo[1].results[0].sale_price : null}</SalePrice>

        <div id="social-media">
          <p>Share this item!</p>
          <button id="fb" src="/logoPhotos/facebook.png" onClick={() => onFacebookClick()}>FB</button>
          <button id="twitter" src="/logoPhotos/twitter.png" onClick={() => onTwitterClick()}>Twitter</button>
          {/* <TwitterShare src="./logoPhotos/twitter.png" onClick={() => onTwitterClick()} /> */}
          <button id="pin" src="/logoPhotos/pinterest.png" onClick={() => onPinterestClick()}>Pin</button>
        </div>
      </div>

    </Wrapper>
  );
}

// CSS styled-components ----------------------
const Wrapper = styled.div`
  padding: 4em;
  align-items: flex-end;
`;

// const Reviews = styled.div`
//   justify-content: center;

// `

const Category = styled.div`
  font-weight: lighter;
  color: purple;
  text-transform: uppercase;
`;

const ProductName = styled.h2`
  color: purple;
  font-weight: bold;
  text-transform: uppercase;
`;

const Price = styled.h4`
`;

const SalePrice = styled.h4`
  color: red;
`
// const TwitterShare = styled.img`
//     width: 25px;
//     height: 25px;
//     padding-right: 5px;
//   `;