import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// import Thumbnail from './thumbnails';
import { useGlobalContext } from '../../../context/GlobalStore';

// Click a style
const onStyleClick = () => {
  console.log('hello i need functionality! :D')
};

export default function StyleSelector() {
  const { productId } = useGlobalContext();
  const [productInfo, setProductInfo] = useState([]);

  // Grab item data from server----------------------
  useEffect(() => {
    // console.log('useEffect working?');
    axios.get(`/products/${productId}`)
      .then((result) => {
        console.log('item styles!!', result.data[1].results);
        console.log('data:', result.data);
        setProductInfo(result.data[1].results);
      })
      .catch((err) => { console.log('getproduct in addtocart didnt work', err); });
  }, [productId]);

  return (
    <Wrapper>
      <h1>
        style selector?
        {' '}
        {productId}
      </h1>
      <ProductStyle>Style: {productInfo[0] ? productInfo[0].name : 'howdy, this is a style?'}</ProductStyle>
      <AllThumbnails>
        {productInfo.map((item) => (
          <Thumbnails src={item.photos[0].thumbnail_url ? item.photos[0].thumbnail_url : 'https://img.icons8.com/stickers/344/gambit.png'} onClick={() => onStyleClick()} />
        ))}
      </AllThumbnails>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 4em;
  align-items: flex-end;
`;

const AllThumbnails = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
`;

const ProductStyle = styled.h2`
  color: pink;
  text-transform: uppercase;
`;
// const AllThumbnails = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-around;
//   align-content: space-around;
// `
// grid-template-columns: 25% 25% 25% 25%;

const Thumbnails = styled.img`
  display: flex;
  clip-path: circle();
  width: 25%;
  height: 40px;
  margin: 10px 0 10px;
  box-sizing: border-box;
  `;
