import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalStore';
import AddToCart from './add_to_cart/addToCart';
import ImageGallery from './image_gallery/imageGallery';
import ProductInfo from './product_information/productInfo';
import StyleSelector from './style_selector/styleSelector';

// Create a Title component that'll render an <h1> tag with some styles
const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 80vw;
  margin: 0 auto;
  user-select: none;
  max-width: fit-content;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const NotImages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 800px;
  min-width: 500px;
`;

const Images = styled.div`
  display: flex;
  width: 70%;
  padding: 20px 130px 20px;
  align-items: center;
  justify-content: center;
`;

export default function ProductDetail() {
  const { productId } = useGlobalContext();
  const [productInfo, setProductInfo] = useState([]);
  const [currentStyle, setCurrentStyle] = useState(0);

  // Grab item data from server----------------------
  useEffect(() => {
    axios.get(`/products/${productId}`)
      .then((result) => { setProductInfo(result.data); })
      .catch((err) => { console.log('getproduct didnt work', err); });
  }, [productId]);

  return (
    <div id="product-detail">
      {productInfo.length && (
        <ProductDetailContainer className="Product-Detail">
          <Images className="prodDetail-images">
            <ImageGallery productInfo={productInfo[1].results} currentStyle={currentStyle} />
          </Images>
          <NotImages className="prodDetail-notImages">
            <ProductInfo productInfo={productInfo} currentStyle={currentStyle} />
            <StyleSelector
              productInfo={productInfo[1].results}
              currentStyle={currentStyle}
              setCurrentStyle={setCurrentStyle}
            />
            <AddToCart className="prodDetail-addToCart" productInfo={productInfo[1].results} currentStyle={currentStyle} />
          </NotImages>
        </ProductDetailContainer>
      )}
    </div>
  );
}
