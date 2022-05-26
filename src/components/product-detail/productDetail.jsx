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
const ProductDetailContainer = styled.section`
  display: flex;
  text-align: center;
  color: palevioletred;
`;
// Create a Wrapper component that'll render a <section> tag with some styles
const NotImages = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 40%;
`;

const Images = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 60%;
`

export default function ProductDetail() {
  // test------
  const { productId } = useGlobalContext();
  // const updateProduct = updateId();
  console.log('productDetail [rendered]');

  return (
    <div id="productDetail">
      {/* <h1 id="pretty-header">
        prodDetail
        {' '}
        {productId}
      </h1> */}

      <ProductDetailContainer>
        <Images>
          <ImageGallery />
        </Images>
        <NotImages>
          <ProductInfo />
          <StyleSelector />
          {/* <AddToCart /> */}
        </NotImages>
      </ProductDetailContainer>
    </div>
  );
}

