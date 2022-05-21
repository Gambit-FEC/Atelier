import React from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalStore';
import configData from '../../../config.js';
import AddToCart from './add_to_cart/addToCart';
import ImageGallery from './image_gallery/imageGallery';
import ProductInfo from './product_information/productInfo';
import StyleSelector from './style_selector/styleSelector';

// //styled-components ex
// import styled from 'styled-components';
// // Create a Title component that'll render an <h1> tag with some styles
// const ProductDetailContainer = styled.h1`
//   font-size: 1.5em;
//   text-align: center;
//   color: palevioletred;
// `;
// // Create a Wrapper component that'll render a <section> tag with some styles
// const Wrapper = styled.section`
//   padding: 4em;
//   background: papayawhip;
// `;
// axios.get(`${API_URL}reviews/`, { params: { product_id }, headers: { Authorization: API_KEY } })

export default function ProductDetail() {
  // test------
  const { productId } = useGlobalContext();
  // const updateProduct = updateId();

  return (
    <div className="productDetail">
      <h1 className="pretty-header">
        prodDetail
        {' '}
        {productId}
      </h1>
      <h2>productDetail</h2>
      <div>wow productsss</div>
      <p>hello productsss</p>
      <AddToCart />
      <ImageGallery />
      <ProductInfo />
      <StyleSelector />
    </div>

  // <Wrapper>
  //   <ProductDetailContainer>

  // <div>
  // <h2>productDetail</h2>
  // <div>wow</div>
  // <p>hello</p>
  // </div>

  //   </ProductDetailContainer>
  // </Wrapper>
  );
}
