import React, { useState, useEffect } from 'react';
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
const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90vw;
  margin: 0 auto;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const NotImages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-width: 800px;
  min-width: 500px;
`;

const Images = styled.div`
  display: flex;
  width: 70%;
`

export default function ProductDetail() {
  // test------
  const { productId } = useGlobalContext();
  const [productInfo, setProductInfo] = useState([]);
  const [currentStyle, setCurrentStyle] = useState(0);



  // Grab item data from server----------------------
  useEffect(() => {
    // console.log('useEffect working?');
    axios.get(`/products/${productId}`)
      .then((result) => {
        console.log('results', result.data)
        setProductInfo(result.data);
      })
      .catch((err) => { console.log('getproduct didnt work', err); });
  }, [productId]);

  return (
    <div id="productDetail">
      {productInfo.length && (
        <ProductDetailContainer>
          <Images>
            <ImageGallery productInfo={productInfo[1].results} currentStyle={currentStyle} />
          </Images>
          <NotImages>
            <ProductInfo productInfo={productInfo} />
            <StyleSelector
              productInfo={productInfo[1].results}
              currentStyle={currentStyle}
              setCurrentStyle={setCurrentStyle}
            />
            {/* <AddToCart /> */}
          </NotImages>
        </ProductDetailContainer>
      )}
    </div>
  );
}

