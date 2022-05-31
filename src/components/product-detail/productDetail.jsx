import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/GlobalStore';
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
  align-items: center;
`;

export default function ProductDetail() {
  // test------
  const { productId } = useGlobalContext();
  const [productInfo, setProductInfo] = useState([]);
  const [currentStyle, setCurrentStyle] = useState(0);

  // Grab item data from server----------------------
  useEffect(() => {
    axios.get(`/products/${productId}`)
      .then((result) => {
        console.log('results', result.data);
        setProductInfo(result.data);
      })
      .catch((err) => { console.log('getproduct didnt work', err); });
  }, [productId]);

  return (
    <div id="productDetail">
      {productInfo.length && (
        <ProductDetailContainer className="Product-Detail">
          <Images className="prodDetail-imaages">
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

