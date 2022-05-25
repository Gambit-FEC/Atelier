import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Thumbnail from './thumbnails';
import { useGlobalContext } from '../../../context/GlobalStore';


export default function StyleSelector() {
  const { productId } = useGlobalContext();
  const [productInfo, setProductInfo] = useState([]);

  // Grab item data from server----------------------
  useEffect(() => {
    console.log('useEffect working?');
    axios.get(`/products/${productId}`)
      .then((result) => {
        console.log('item styles!!', result.data[1].results);
        console.log('data:', result.data);
        setProductInfo(result.data[1].results);
      })
      .catch((err) => { console.log('getproduct in addtocart didnt work', err); });
  }, [productId]);




  return (
    <>
      <h1>
        style selector?
        {' '}
        {productId}
      </h1>
      <h4>style name</h4>
      <Thumbnails
        src={productInfo.map((item, index) => {
          return item.photos[index].thumbnail_url;
        })}
      >
      </Thumbnails>
      <div>wow style selectors</div>
      <p>hello styleselector</p>
    </>
  );
}

const Thumbnails = styled.img`
  clip-path: circle();
  width: 25px;
  height: 25px;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
`