import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../../context/GlobalStore';
import { StyledRatingStars } from '../../../styled-lib';

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

const fb = 'https://img.icons8.com/fluency/344/facebook-new.png';
const tw = 'https://img.icons8.com/color/344/twitter--v1.png';
const pn = 'https://img.icons8.com/color/344/pinterest--v1.png';

export default function ProductInfo({ productInfo, currentStyle }) {
  const { avgRating, totalReviews } = useGlobalContext();

  console.log("NOT ANDY", productInfo)

  return (
    <Wrapper>
      <div>
        <Reviews>
          <StyledRatingStars size="medium" rating={avgRating}>
            ★★★★★
          </StyledRatingStars>
          <a href="#ratings-and-reviews" id="see-reviews">
            {totalReviews ? `Read all ${totalReviews} reviews` : 'No Rewiews'}
          </a>
        </Reviews>
        <Category>
          {productInfo[0] ? productInfo[0].category : null}
        </Category>
        <ProductName>
          {productInfo[0] ? productInfo[0].name : null}
        </ProductName>
        <Price>
          {productInfo[1] ? productInfo[1].results[currentStyle].original_price : null}
        </Price>
        <SalePrice>
          {productInfo[1] ? productInfo[1].results[currentStyle].sale_price : null}
        </SalePrice>
        <ProductOverview>
          {productInfo[0] ? productInfo[0].description : null}
        </ProductOverview>

        <Share id="social-media">
          <p>Share this item!</p>
          <Facebook src={fb} onClick={() => onFacebookClick()} />
          <Twitter src={tw} onClick={() => onTwitterClick()} />
          <Pin src={pn} onClick={() => onPinterestClick()} />
        </Share>
      </div>
    </Wrapper>
  );
}

// CSS styled-components ----------------------
const Wrapper = styled.div`
  padding: 4em;
  align-items: flex-end;
`;

const Reviews = styled.div`
  justify-content: center;

`

const Category = styled.div`
  font-weight: lighter;
  color: rgba(102, 91, 165, 1);
  text-transform: uppercase;
  margin: 10px 0 10px;
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

const ProductOverview = styled.h4`
color: purple;
`;

const Share = styled.h3`
  font-weight: bold;
  justify-content: center;
`

const Facebook = styled.img`
    width: 25px;
    height: 25px;
    padding-right: 10px;
  `;

const Twitter = styled.img`
    width: 25px;
    height: 25px;
    padding-right: 10px;
  `;
const Pin = styled.img`
    width: 25px;
    height: 25px;
    padding-right: 10px;
  `;
