import React from 'react';
import axios from 'axios';
import { useId, updateId } from '../../context/GlobalStore';
import AddToCart from './add_to_cart/addToCart';
import ImageGallery from './image_gallery/imageGallery';
import ProductInfo from './product_information/productInfo';
import StyleSelector from './style_selector/styleSelector';
// import styled from 'styled-components';

// //styled-components ex
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

export default function ProductDetail() {
  // test------
  const productId = useId();
  const updateProduct = updateId();

  return (
    <>
      <h1>
        prodDetail
        {productId}
      </h1>
      <h2>productDetail</h2>
      <div>wow productsss</div>
      <p>hello productsss</p>
      <AddToCart />
      <ImageGallery />
      <ProductInfo />
      <StyleSelector />
    </>

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
