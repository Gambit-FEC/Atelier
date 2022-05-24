import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalStore';
import configData from '../../../config.js';
import AddToCart from './add_to_cart/addToCart';
import ImageGallery from './image_gallery/imageGallery';
import ProductInfo from './product_information/productInfo';
import StyleSelector from './style_selector/styleSelector';

// //styled-components ex
// Create a Title component that'll render an <h1> tag with some styles
const ProductDetailContainer = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

export default function ProductDetail() {
  // test------
  const { productId } = useGlobalContext();
  // const updateProduct = updateId();

  return (
    <div id="productDetail">
      <h1 id="pretty-header">
        prodDetail
        {' '}
        {productId}
      </h1>
      {/* <Wrapper>
        <ProductDetailContainer>
          <div>
            <div>productDetail</h2>
            <div>wow</div>
            <p>hello</p>
          </div>
          </ProductDetailContainer>
        </Wrapper> */}

      <ProductInfo />
      {/* <StyleSelector />
      <AddToCart />
      <ImageGallery /> */}
    </div>
  );
}
