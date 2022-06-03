import React from 'react';
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

  return (
    <Wrapper>
      <div>
        <Reviews>
          <StyledRatingStars size="medium" rating={avgRating}>
            ★★★★★
          </StyledRatingStars>
          <a className="underline-button" href="#ratings-and-reviews" id="see-reviews">
            {totalReviews ? `Read all ${totalReviews} reviews` : 'No Rewiews'}
          </a>
        </Reviews>
        <Category>
          {productInfo[0] ? productInfo[0].category : null}
        </Category>
        <ProductName>
          {productInfo[0] ? productInfo[0].name : null}
        </ProductName>
        {productInfo[1].results[currentStyle].sale_price
          ? (
            <PriceStreak>
              {`$${Math.trunc(productInfo[1].results[currentStyle].original_price)}`}
            </PriceStreak>
          )
          : (
            <Price>
              {`$${Math.trunc(productInfo[1].results[currentStyle].original_price)}`}
            </Price>
          )}
        {productInfo[1].results[currentStyle].sale_price
          ? (
            <SalePrice>
              On Sale: {`$${Math.trunc(productInfo[1].results[currentStyle].sale_price)}`}
            </SalePrice>
          )
          : null }
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
  padding: 1em;
  align-items: flex-end;
`;

const Reviews = styled.div`
  justify-content: center;

`;

const Category = styled.div`
  font-weight: lighter;
  text-transform: uppercase;
  margin: 10px 0 10px;
  color: rgba(102, 91, 165, 1);
`;

const ProductName = styled.h2`
  font-weight: bold;
  text-transform: uppercase;
`;

const Price = styled.h3`
`;

const SalePrice = styled.h3`
  color: red;
`;

const PriceStreak = styled.h3`
  color: grey;
  text-decoration: line-through;
`;

const ProductOverview = styled.h4`
  width: 70%;
`;

const Share = styled.h3`
  font-weight: bold;
  justify-content: center;
`;

const Facebook = styled.img`
  width: 25px;
  height: 25px;
  padding-right: 10px;
  cursor: pointer;
`;

const Twitter = styled.img`
  width: 25px;
  height: 25px;
  padding-right: 10px;
  cursor: pointer;
`;
const Pin = styled.img`
  width: 25px;
  height: 25px;
  padding-right: 10px;
  cursor: pointer;
`;
