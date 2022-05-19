import React from 'react';
import { useId } from '../../context/GlobalStore';
import AddToCart from './add_to_cart/addToCart';
// import ImageGallery from './product_information/imageGallery';
// import ProductInfo from './product_information/productInfo';
// import StyleSelector from './style_selecor/styleSelector';
// import axios from 'axios';
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
  const [productId, setProductId] = useId();

  return (
    <>
      <h1>prodDetail {productId}</h1>
      <h2>productDetail</h2>
      <div>wow productsss</div>
      <p>hello productsss</p>
      <AddToCart />
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
